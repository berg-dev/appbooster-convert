import * as types from './constants';
import exchangeRatesApi from '../../services/exchangeRatesApi';
import flagsList from '../../assets/static/flags';
import { getBaseCurrency } from '../session/selectors';
import { getConverterPair } from './selectors';

export const initConverter = () => (dispatch, getState) => {
  const dollar = { ticker: 'USD', name: 'U.S. Dollar', flag: flagsList['USD'] };
  const store = getState();
  const base = getBaseCurrency(store);
  base.flag = flagsList[base.ticker];

  dispatch({ type: types.PAIR_UPDATE, payload: [base, dollar] });
};

export const fetchRates = () => (dispatch, getState) => {
  const store = getState();
  const pair = getConverterPair(store);
  const basis = pair[0];
  const target = pair[1];

  exchangeRatesApi.getDefaultRates(basis.ticker, {
    success: result => {
      const res = [
        {
          ...basis,
          rate: 1.0,
          inverseRate: 1.0,
          flag: flagsList[basis.ticker],
        },
        ...result,
      ];

      const targetIndex = res.findIndex(item => item.ticker === target.ticker);
      const { rate: base, inverseRate: inverse } = res[targetIndex];

      dispatch({ type: types.RATE_UPDATE, payload: { base, inverse } });
    },
    error: error => {
      console.error(error.message);
    },
  });
};

export const changeItemInPair = (data, ind) => (dispatch, getState) => {
  const store = getState();
  const pair = getConverterPair(store);

  pair[ind] = data;

  dispatch({ type: types.PAIR_UPDATE, payload: pair });
};
