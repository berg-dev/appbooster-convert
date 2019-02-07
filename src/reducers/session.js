import * as types from '../constants/ActionTypes';
import { Map } from 'immutable';

const initialState = Map({
  baseCurrency: Map(),
  pageTitle: '',
  headerLink: Map({
    path: '', // => /convert
    text: '', // => /to Convert
  }),
});

const session = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.BASE_CURRENCY_UPDATE: {
      const { ticker, name } = action.payload;
      return state.set('baseCurrency', Map({ ticker, name }));
    }

    default:
      return state;
  }
};

export default session;
