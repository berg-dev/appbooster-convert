import * as types from './actionTypes';
import exchangeRatesApi from '../../services/exchangeRatesApi';
import * as currenciesSelectors from './reducer';

export function fetchCurrencies(base) {
  const favoritesList = JSON.parse(localStorage.getItem('favoritesCurrency'));

  return dispatch => {
    exchangeRatesApi.getDefaultRates(base, {
      success: result => {
        favoritesList.forEach(fav => {
          const index = result.findIndex(item => item.ticker === fav);
          result[index].isFavorite = true;
        });

        dispatch({ type: types.CURRENCY_FETCHED, payload: result });
      },

      error: error => {
        console.error(error.message);
      },
    });
  };
}

export function getBaseCurrency() {
  return dispatch => {
    const storageItem = localStorage.getItem('baseCurrency');

    if (!storageItem || !storageItem.length) {
      dispatch(actionUpdateBaseCurrency('USD', 'U.S. Dollar'));
    } else {
      const { ticker, name } = JSON.parse(storageItem);
      dispatch(actionUpdateBaseCurrency(ticker, name));
    }
  };
}

export function updateBaseCurrency(ticker) {
  return (dispatch, getState) => {
    const state = getState();
    const { name } = currenciesSelectors.getCurrencyDataByTicker(state, ticker);

    dispatch(actionUpdateBaseCurrency(ticker, name));
    localStorage.setItem('baseCurrency', JSON.stringify({ ticker, name }));
  };
}

export function favoritesAction(ticker, method) {
  return dispatch => {
    const type = method === 'add' ? types.ADD_TO_FAVORITES : types.REMOVE_FROM_FAVORITES;
    dispatch({ type, payload: ticker });
  };
}

export function setFavoritesFromStorage() {
  const list = JSON.parse(localStorage.getItem('favoritesCurrency'));

  return dispatch => {
    dispatch({ type: types.SET_FAVORITES_LIST, payload: list });
  };
}

function actionUpdateBaseCurrency(ticker, name) {
  return { type: types.BASE_CURRENCY_UPDATE, payload: { ticker, name } };
}
