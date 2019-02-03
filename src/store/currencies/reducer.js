import * as types from './actionTypes';
import { Map } from 'immutable';

const initialState = Map({
  baseCurrency: false,
  favoritesCurrencies: [],
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

    case types.ADD_TO_FAVORITES: {
      return state.map((value, key) => {
        const ticker = action.payload;

        if (key === 'favoritesCurrencies') return [...value, ticker];
        if (key === 'currenciesList') {
          const index = value.findIndex(item => item.ticker === ticker);
          value[index].isFavorite = true;
          return value;
        }

        return value;
      });
    }

    case types.REMOVE_FROM_FAVORITES: {
      return state.map((value, key) => {
        const ticker = action.payload;

        if (key === 'favoritesCurrencies') return value.filter(item => item !== ticker);
        if (key === 'currenciesList') {
          const index = value.findIndex(item => item.ticker === ticker);
          value[index].isFavorite = false;
          return value;
        }

        return value;
      });
    }

    case types.SET_FAVORITES_LIST: {
      return state.update('favoritesCurrencies', () => action.payload);
    }

    default:
      return state;
  }
}

export function getSortedByFavoritesList(state) {
  return state.currencies.get('currenciesList').sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (b.isFavorite && !a.isFavorite) return 1;

    return 0;
  });
}

export function getBaseCurrency(state) {
  return state.currencies.get('baseCurrency');
}

export function getAvailableList(state) {
  const list = state.currencies.get('currenciesList');

  return list.map(item => ({
    flag: item.flag,
    name: item.name,
    ticker: item.ticker,
  }));
}

export function getCurrencyDataByTicker(state, ticker) {
  const list = state.currencies.get('currenciesList');
  const index = list.findIndex(item => item.ticker === ticker);

  return list[index];
}

export function getFavoritesList(state) {
  return state.currencies.get('favoritesCurrencies');
}
