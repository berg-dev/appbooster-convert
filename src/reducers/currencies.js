import * as types from '../constants/ActionTypes';
import { Map, List } from 'immutable';

const initialState = Map({
  currenciesList: List(),
});

const currencies = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.CURRENCIES_LIST_FETCHED: {
      return state.update('currenciesList', list => list.clear().merge(action.payload));
    }

    default:
      return state;
  }
};

export default currencies;
