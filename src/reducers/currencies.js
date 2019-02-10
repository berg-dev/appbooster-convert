import * as types from '../constants/ActionTypes';
import { Map, List } from 'immutable';

const initialState = Map({
  currenciesList: List(),
  favoritesCurrencies: List(),
});

const currencies = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.CURRENCIES_LIST_FETCHED: {
      return state.set('currenciesList', List(action.payload));
    }

    case types.INIT_FAVORITES_LIST: {
      return state.set('favoritesCurrencies', List(action.payload));
    }

    case types.ADD_TO_FAVORITES: {
      const ticker = action.payload;

      return state.map((list, key) => {
        if (key === 'favoritesCurrencies') return list.push(ticker);
        if (key === 'currenciesList') {
          const ind = list.findKey(v => v.ticker === ticker);
          return list.setIn([ind, 'isFavorite'], true);
        }

        return list;
      });
    }

    case types.REMOVE_FROM_FAVORITES: {
      const ticker = action.payload;

      return state.map((list, key) => {
        const ind = list.findKey(v => v.ticker === ticker);

        if (key === 'favoritesCurrencies') return list.delete(ind);
        if (key === 'currenciesList') {
          return list.setIn([ind, 'isFavorite'], false);
        }

        return list;
      });
    }

    default:
      return state;
  }
};

export default currencies;
