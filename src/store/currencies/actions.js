import * as types from './constants';
import exchangeRatesApi from '../../services/exchangeRatesApi';
import { getFavoritesList } from './selectors';
import { getBaseCurrency } from '../session/selectors';

export const fetchCurrenciesList = callback => (dispatch, getStore) => {
  const store = getStore();
  const base = getBaseCurrency(store);
  const favoritesList = getFavoritesList(store);

  exchangeRatesApi
    .getDefaultRates(base)
    .then(result => {
      favoritesList.forEach(fav => {
        const index = result.findIndex(item => item.ticker === fav);
        if (result[index]) {
          result[index].isFavorite = true;
        }
      });

      dispatch({ type: types.CURRENCIES_LIST_FETCHED, payload: result });
      callback();
    })
    .catch(err => console.error(err.message));
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
