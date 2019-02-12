import flagsList from '../assets/static/flags';
const API_ENDPOINT = 'http://www.floatrates.com/daily';

class ExchangeRatesApiService {
  getDefaultRates(base, cb = {}) {
    const defaultReturn = () => false;
    const { success = defaultReturn, error = defaultReturn } = cb;

    fetch(`${API_ENDPOINT}/${base.toLowerCase()}.json`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Unexpected error');
      })
      .then(data => {
        try {
          const list = Object.keys(data).reduce((acc, ticker, i) => {
            const tickerUp = ticker.toUpperCase();
            const { code, rate, inverseRate, name } = data[ticker];
            const flag = !flagsList[tickerUp] ? '' : flagsList[tickerUp];

            return [...acc, { ticker: code, rate, inverseRate, name, flag, isFavorite: false }];
          }, []);

          success(list);
        } catch (err) {
          throw new Error('Data error');
        }
      })
      .catch(ex => error({ message: ex.message }));
  }
}

export default new ExchangeRatesApiService();
