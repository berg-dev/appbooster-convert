import * as types from './constants';
import exchangeRatesApi from '../../services/exchangeRatesApi';
import flagsList from '../../assets/static/flags';
import { getBaseCurrency } from '../session/selectors';
import { getCurrenciesList } from '../currencies/selectors';
import { getConverterPair } from './selectors';

const dollar = { ticker: 'USD', name: 'U.S. Dollar', flag: flagsList['USD'] };

export const initConverter = () => (dispatch, getState) => {
  const store = getState();
  const list = getCurrenciesList(store);
  const base = getBaseCurrency(store);
  const currentPair = getConverterPair(store);
  base.flag = flagsList[base.ticker];
  const initialPair = [base, dollar];

  const computedPair = initialPair.map((item, i) => {
    if (!currentPair[i]) return item;

    if (currentPair[i].ticker && !currentPair[i].name) {
      const ind = list.findIndex(n => n.ticker === currentPair[i].ticker);
      currentPair[i].name = list[ind].name;
      currentPair[i].flag = list[ind].flag;
    }

    return currentPair[i];
  });

  dispatch({ type: types.PAIR_UPDATE, payload: computedPair });

  if (computedPair[0].ticker === initialPair[0].ticker && computedPair[1].ticker === initialPair[1].ticker) {
    const dIndex = list.findIndex(item => item.ticker === dollar.ticker);
    const { rate, inverseRate } = list[dIndex];

    dispatch({ type: types.RATE_UPDATE, payload: { base: rate, inverse: inverseRate } });
  } else {
    fetchRates();
  }
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

export const updateConvertPair = data => dispatch => {
  dispatch({ type: types.PAIR_UPDATE, payload: data });
};
