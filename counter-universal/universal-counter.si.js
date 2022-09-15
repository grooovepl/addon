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

  const loadStyles = (version) => {
    const href = version
      ? `${cdnWithTag(version)}/counter-universal/style.css`
      : `${CDN}/counter-universal/style.css?v=${getCacheBuster()}`;

    const styleLink = document.createElement('link');
    styleLink.setAttribute('rel', 'stylesheet');
    styleLink.setAttribute('type', 'text/css');
    styleLink.setAttribute('href', href);

    document.body.appendChild(styleLink);
  };

  const getScript = (url) => {
    const script = document.createElement('script');
    script.setAttribute('src', url);
    document.body.appendChild(script);
  };

  const getScriptWrapper = (url) => {
    if (window.Engine || window.g) {
      return getScript(url);
    }

    setTimeout(getScriptWrapper, 100, url);
  };

  const addonVersion = getAddonVersion();
  const addonUrl = addonVersion
    ? `${cdnWithTag(addonVersion)}/counter-universal/prod.js`
    : `${CDN}/counter-universal/prod.js?v=${getCacheBuster()}`;

  loadStyles(addonVersion);
  getScriptWrapper(addonUrl);
})();
