import * as types from './constants';
import exchangeRatesApi from '../../services/exchangeRatesApi';
import flagList from '../../assets/static/flags';
import { getFavoritesList } from './selectors';
import { getBaseCurrency } from '../session/selectors';

export const fetchCurrenciesList = () => (dispatch, getStore) => {
  const store = getStore();
  const base = getBaseCurrency(store);
  const favoritesList = getFavoritesList(store);

  exchangeRatesApi.getDefaultRates(base.ticker, {
    success: result => {
      favoritesList.forEach(fav => {
        const index = result.findIndex(item => item.ticker === fav);
        if (result[index]) {
          result[index].isFavorite = true;
        }
      });

      const baseCurrencyData = {
        ...base,
        rate: 1.0,
        inverseRate: 1.0,
        isFavorite: favoritesList.findIndex(fav => fav === base.ticker) >= 0,
        flag: flagList[base.ticker],
      };

      dispatch({ type: types.CURRENCIES_LIST_FETCHED, payload: [baseCurrencyData, ...result] });
    },

    error: error => {
      console.error(error.message);
    },
  });
};

export const favoritesAction = (ticker, method) => dispatch => {
  const type = method === 'add' ? types.ADD_TO_FAVORITES : types.REMOVE_FROM_FAVORITES;
  const storageList = JSON.parse(localStorage.getItem('favoritesCurrency'));

  if (method === 'add') {
    storageList.push(ticker);
  } else {
    const ind = storageList.indexOf(ticker);
    storageList.splice(ind, 1);
  }

  localStorage.setItem('favoritesCurrency', JSON.stringify(storageList));
  dispatch({ type, payload: ticker });
};

export const initFavoritesList = () => dispatch => {
  let list = JSON.parse(localStorage.getItem('favoritesCurrency'));

  if (!Array.isArray(list)) {
    list = [];
    localStorage.setItem('favoritesCurrency', JSON.stringify(list));
  }

  dispatch({ type: types.INIT_FAVORITES_LIST, payload: list });
};
