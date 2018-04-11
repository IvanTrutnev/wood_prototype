export const renderFunctions = {
  formatNumber: (value, accuracy) => {
    if(typeof value === 'number') {
      let maximumAccuracy = accuracy || 3;
      return value.toLocaleString('ru-RU',{ maximumFractionDigits: maximumAccuracy });
    }
  },
  alignForNumber: (value) => {
    if (typeof value === 'number') {
      return {textAlign: 'right'};
    } else {
      return null;
    }
  },
  translateHeaders: (key, defaultValue) => {
    let gridKey = 'grid.' + key;
    let value = $t('translate')(gridKey);
    return value === gridKey ? defaultValue : value;
  }
};