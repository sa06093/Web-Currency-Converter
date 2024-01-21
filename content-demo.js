let KRW;

const getCurrency = async () => {
  const apiUrl = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_1e8GuwNPzHJzexW1aq1qHFZzz7uCFaUmHh2QcXuy';

  const response = await fetch(apiUrl);

  const data1 = await response.json();
  return data1.data.KRW;
};

chrome.storage.sync.get('extensionEnabled', (data) => {
  const extensionEnabled = data.extensionEnabled !== false;

  if (extensionEnabled) {
    (async () => {
      KRW = await getCurrency();
      document.body.innerHTML = document.body.innerHTML.replace(/\$(\d+)/g, function (match, capturedGroup) {
        USDKRW = Math.floor(capturedGroup * KRW).toLocaleString();
        return `₩${USDKRW}`;
      });
    })();
  }
});
