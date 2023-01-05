(() => {
  const CDN = 'https://cdn.jsdelivr.net/gh/grooovepl/addon';

  const getCacheBuster = () => {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  };

  const cdnWithTag = (version) => `${CDN}@uc-${version}`;

  const getAddonVersion = () => {
    try {
      const key = 'ga-universal-counter-version';
      const entryJson = localStorage.getItem(key);
      const data = JSON.parse(entryJson);

      if (data.version) {
        return data.version;
      }
    } catch (error) { }

    return null;
  };

  const addonVersion = getAddonVersion();

  const reportAddonError = (error) => {
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
        error,
        margonemInterface: 'si',
        addonVersion: addonVersion || '2.8'
      }),
    });
  };

  const loadStyles = (version) => {
    const href = version
      ? `${cdnWithTag(version)}/counter-universal/style.css`
      : `${CDN}/counter-universal/style.css?v=${getCacheBuster()}`;

    const styleLink = document.createElement('link');
    styleLink.setAttribute('rel', 'stylesheet');
    styleLink.setAttribute('type', 'text/css');
    styleLink.setAttribute('href', href);
    styleLink.addEventListener('error', () => reportAddonError(`CSS has not been loaded: ${href}`));

    document.body.appendChild(styleLink);
  };

  const getScript = (url) => {
    const script = document.createElement('script');
    script.setAttribute('src', url);
    script.addEventListener('error', () => reportAddonError(`Addon has not been loaded: ${url}`));
    document.body.appendChild(script);
  };

  const getScriptWrapper = (url) => {
    if (window.g.init === 5) {
      return getScript(url);
    }

    setTimeout(getScriptWrapper, 100, url);
  };

  const addonUrl = addonVersion
    ? `${cdnWithTag(addonVersion)}/counter-universal/prod.js`
    : `${CDN}/counter-universal/prod.js?v=${getCacheBuster()}`;

  loadStyles(addonVersion);
  getScriptWrapper(addonUrl);
})();
