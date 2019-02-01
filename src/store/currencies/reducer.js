import * as types from './actionTypes';
import { Map } from 'immutable';

const initialState = Map({
  baseCurrency: false,
  favoriteCurrencies: [],
  currenciesList: [],
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.CURRENCY_FETCHED: {
      return state.update('currenciesList', () => action.payload);
    }

    case types.BASE_CURRENCY_UPDATE: {
      return state.update('baseCurrency', () => ({ ...action.payload }));
    }

    default:
      return state;
  }
}

export function getList(state) {
  return state.currencies.get('currenciesList');
}

export function getBaseCurrency(state) {
  return state.currencies.get('baseCurrency');
}

export function getAvailableList(state) {
  const list = state.currencies.get('currenciesList');

  return list.map(item => ({
    id: item.id,
    flag: item.flag,
    name: item.name,
    ticker: item.ticker,
  }));
}

export function getCurrencyDataById(state, id) {
  const list = state.currencies.get('currenciesList');
  const index = list.findIndex(item => item.id === id);

  return list[index];
}
