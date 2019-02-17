import flagsList from '../assets/static/flags';
const API_ENDPOINT = 'http://www.floatrates.com/daily';

class ExchangeRatesApiService {
  getDefaultRates(base) {
    return new Promise((resolve, reject) => {
      fetch(`${API_ENDPOINT}/${base.ticker.toLowerCase()}.json`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }

          throw new Error('Fetch error');
        })
        .then(data => {
          try {
            const baseCurrency = ExchangeRatesApiService.createBaseCurrency(base);

            const list = Object.keys(data).map(item => {
              const ticker = item.toUpperCase();
              const { rate, inverseRate, name } = data[item];
              const flag = flagsList[ticker] ? flagsList[ticker] : '';

              return {
                ticker,
                name,
                flag,
                rate,
                inverseRate,
                isFavorite: false,
              };
            });

            resolve([baseCurrency, ...list]);
          } catch (err) {
            throw new Error('Data error');
          }
        })
        .catch(err => reject(err));
    });
  }

  static createBaseCurrency(base) {
    const tickerUp = base.ticker.toUpperCase();
    return {
      ...base,
      flag: !flagsList[tickerUp] ? '' : flagsList[tickerUp],
      rate: 1,
      inverseRate: 1,
      isFavorite: false,
    };
  }
}

export default new ExchangeRatesApiService();
