import * as types from './actionTypes';
import exchangeRatesApi from '../../services/exchangeRatesApi';

export function fetchCurrencies() {
  return (dispatch, getState) => {
    exchangeRatesApi.getDefaultRates({
      success: result => {
        dispatch({ type: types.CURRENCY_FETCHED, payload: result });
      },

      error: error => {
        console.error(error.message);
      },
    });
  };
}
