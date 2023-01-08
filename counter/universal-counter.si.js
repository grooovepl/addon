(() => {
  const INSTALLER_VERSION = '2.9';
  const ADDON_VERSION = getAddonVersion();
  const CACHE_BUSTER = getCacheBuster();

  const CDN = 'https://cdn.jsdelivr.net/gh/grooovepl/addon';
  const CDN_WITH_TAG = `${CDN}@uc-${ADDON_VERSION}`;

  const SCRIPT_URL = ADDON_VERSION
    ? `${CDN_WITH_TAG}/counter-universal/prod.js`
    : `${CDN}/counter-universal/prod.js?v=${CACHE_BUSTER}`;

  const CSS_URL = ADDON_VERSION
    ? `${CDN_WITH_TAG}/counter-universal/style.css`
    : `${CDN}/counter-universal/style.css?v=${CACHE_BUSTER}`;


  function reportAddonError(error) {
    console.error('universal-counter: ' + error);

    fetch('https://counter-service.grooove.pl/api/reports', {
      method: 'post',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'access-control-request-headers': 'content-type',
        'content-type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        error: `Installer error: ${error}`,
        margonemInterface: 'SI',
        addonVersion: ADDON_VERSION || INSTALLER_VERSION
      }),
    });
  }

  function getCacheBuster() {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  }

  function isGameReady() {
    return (
      typeof window.g !== 'undefined'
      && window.g.init === 5
    );
  }

  function getAddonVersion() {
    try {
      const key = 'ga-universal-counter-version';
      const entryJson = localStorage.getItem(key);
      const data = JSON.parse(entryJson);

      if (data.version) {
        return data.version;
      }
    } catch (error) { }

    return null;
  }

  function loadCss() {
    const styleLink = document.createElement('link');
    styleLink.setAttribute('rel', 'stylesheet');
    styleLink.setAttribute('type', 'text/css');
    styleLink.setAttribute('href', CSS_URL);
    styleLink.addEventListener('error', () => reportAddonError(`CSS has not been loaded (v${INSTALLER_VERSION} SI): ${CSS_URL}`));

    document.body.appendChild(styleLink);
  }

  function loadScript() {
    const script = document.createElement('script');
    script.setAttribute('src', SCRIPT_URL);
    script.addEventListener('error', () => reportAddonError(`Addon has not been loaded (v${INSTALLER_VERSION} SI): ${SCRIPT_URL}`));
    document.body.appendChild(script);
  }

  function loadScriptWrapper() {
    if (isGameReady()) {
      return loadScript();
    }
    setTimeout(loadScriptWrapper, 100);
  }


  try {
    loadCss();
    loadScriptWrapper();
  } catch (error) {
    reportAddonError(error);
  }
})();
