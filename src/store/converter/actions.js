import * as types from './constants';
import exchangeRatesApi from '../../services/exchangeRatesApi';
import flagsList from '../../assets/static/flags';
import { getBaseCurrency } from '../session/selectors';
import { getCurrenciesList } from '../currencies/selectors';
import { getConverterPair } from './selectors';

export const initConverter = () => (dispatch, getState) => {
  const dollar = { ticker: 'USD', name: 'U.S. Dollar', flag: flagsList['USD'] };
  const store = getState();
  const base = getBaseCurrency(store);
  const list = getCurrenciesList(store);

  const dIndex = list.findIndex(item => item.ticker === dollar.ticker);
  const { rate, inverseRate } = list[dIndex];

  base.flag = flagsList[base.ticker];

  dispatch({ type: types.PAIR_UPDATE, payload: [base, dollar] });
  dispatch({ type: types.RATE_UPDATE, payload: { base: rate, inverse: inverseRate } });
};

export const fetchRates = () => (dispatch, getState) => {
  const store = getState();
  const [base, target] = getConverterPair(store);

  exchangeRatesApi
    .getDefaultRates(base)
    .then(result => {
      const index = result.findIndex(item => item.ticker === target.ticker);
      const { rate, inverseRate } = result[index];

      dispatch({ type: types.RATE_UPDATE, payload: { base: rate, inverse: inverseRate } });
    })
    .catch(err => console.error(err.message));
};

export const changeItemInPair = (data, ind) => (dispatch, getState) => {
  const store = getState();
  const pair = getConverterPair(store);

  pair[ind] = data;

  dispatch({ type: types.PAIR_UPDATE, payload: pair });
};
