import * as types from './actionTypes';
import exchangeRatesApi from '../../services/exchangeRatesApi';
import flagsList from '../../static/flags';

export function fetchCurrencies(base) {
  return (dispatch, getState) => {
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
    navigator.geolocation.getCurrentPosition(
      position => {
        // TODO Реализовать определение валюты по координатам
        console.log(position.coords.latitude, position.coords.longitude);
      },
      error => {
        dispatch({
          type: types.BASE_CURRENCY_UPDATE,
          payload: { ticket: 'USD', name: 'U.S. Dollar', flag: flagsList['USD'] },
        });
      }
    );
  };
}
