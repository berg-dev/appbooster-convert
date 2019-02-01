import * as types from './actionTypes';
import exchangeRatesApi from '../../services/exchangeRatesApi';
import * as currenciesSelectors from './reducer';

export function fetchCurrencies(base) {
  return dispatch => {
    exchangeRatesApi.getDefaultRates(base, {
      success: result => {
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

export function updateBaseCurrency(id) {
  return (dispatch, getState) => {
    const state = getState();
    const item = currenciesSelectors.getCurrencyDataById(state, id);
    const { ticker, name } = item;

    dispatch(actionUpdateBaseCurrency(ticker, name));
    localStorage.setItem('baseCurrency', JSON.stringify({ ticker, name }));
  };
}

function actionUpdateBaseCurrency(ticker, name) {
  return { type: types.BASE_CURRENCY_UPDATE, payload: { ticker, name } };
}
