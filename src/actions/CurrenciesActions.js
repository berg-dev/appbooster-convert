import * as types from '../constants/ActionTypes';
import exchangeRatesApi from '../services/exchangeRatesApi';
import { getBaseCurrency } from '../selectors/CommonSelectors';

export const fetchCurrenciesList = () => (dispatch, getStore) => {
  const favoritesList = JSON.parse(localStorage.getItem('favoritesCurrency'));
  const store = getStore();
  const base = getBaseCurrency(store);

  exchangeRatesApi.getDefaultRates(base.ticker, {
    success: result => {
      favoritesList.forEach(fav => {
        const index = result.findIndex(item => item.ticker === fav);
        if (result[index] >= 0) {
          result[index].isFavorite = true;
        }
      });

      dispatch({ type: types.CURRENCIES_LIST_FETCHED, payload: result });
    },

    error: error => {
      console.error(error.message);
    },
  });
};
