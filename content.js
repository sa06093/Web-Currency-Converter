let KRW;

const getCurrency = async () => {
  const baseUrl = 'https://api.freecurrencyapi.com/v1/latest';
    const config = {
        apikey: `fca_live_1e8GuwNPzHJzexW1aq1qHFZzz7uCFaUmHh2QcXuy`
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
  try {
    const response = await fetch(finalUrl);
    const data = await response.json();
    return data.data.KRW;
  } catch (error) {
    console.error('Error fetching currency:', error);
    return null;
  }
};

const replaceCurrency = (exchangeRate) => {
  const elementsWithCurrency = document.querySelectorAll('*:not(script):not(style)');

  elementsWithCurrency.forEach((element) => {
    if (element.childNodes.length === 1 && element.childNodes[0].nodeType === 3) {
      const text = element.childNodes[0].nodeValue;
      element.childNodes[0].nodeValue = text.replace(/\$(\d+)/g, (match, capturedGroup) => {
        const USDKRW = Math.floor(capturedGroup * exchangeRate).toLocaleString();
        return `₩${USDKRW}`;
      });
    }
  });
};

chrome.storage.sync.get('extensionEnabled', async (data) => {
  const extensionEnabled = data.extensionEnabled !== false;

  if (extensionEnabled) {
    try {
      KRW = await getCurrency();
      if (KRW !== null) {
        replaceCurrency(KRW);
      }
    } catch (error) {
      console.error('Error processing currency:', error);
    }
  }
});
