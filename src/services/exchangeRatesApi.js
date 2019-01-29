const API_ENDPOINT = 'http://data.fixer.io/api';
const KEY = '5bea9e2871876f3d801747f2ac5f11c0';

class ExchangeRatesApiService {
  getDefaultRates(cb = {}) {
    const defaultReturn = () => false;
    const { success = defaultReturn, error = defaultReturn } = cb;

    fetch(`${API_ENDPOINT}/latest?access_key=${KEY}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        throw new Error('Unexpected error');
      })
      .then(data => {
        if (!data.rates) throw new Error('Data error');
        let list = [];

        for (let label in data.rates) {
          if (data.rates.hasOwnProperty(label)) {
            list.push({
              label,
              rate: data.rates[label],
            });
          }
        }

        setTimeout(() => {
          success(list);
        }, 5000);
      })
      .catch(ex => error({ message: ex.message }));
  }
}

export default new ExchangeRatesApiService();
