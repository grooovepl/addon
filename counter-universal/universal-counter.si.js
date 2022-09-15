(() => {
  const getCacheBuster = () => {
    const date = new Date();
    const fallback = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

    try {
      const key = 'ga-universal-counter-version';
      const entryJson = localStorage.getItem(key);
      const data = JSON.parse(entryJson);

      if (data.version) {
        return data.version;
      }
    } catch (error) {
      return fallback;
    }

    return fallback;
  };

  const getScript = (url) => {
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  };

  const getScriptWrapper = (url) => {
    if (window.Engine || window.g) {
      return getScript(url);
    }

    setTimeout(getScriptWrapper, 100, url);
  };

  getScriptWrapper('https://cdn.jsdelivr.net/gh/grooovepl/addon/counter-universal/prod.js?v=' + getCacheBuster());
})();
