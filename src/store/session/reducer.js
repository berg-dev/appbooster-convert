import * as types from './constants';
import { Map } from 'immutable';

const initialState = Map({
  baseCurrency: Map(),
  pageTitle: '',
  headerLink: Map({
    path: '',
    text: '',
  }),
});

const session = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.BASE_CURRENCY_UPDATE: {
      const { ticker, name } = action.payload;
      return state.set('baseCurrency', Map({ ticker, name }));
    }

    case types.UPDATE_PAGE_TITLE: {
      return state.set('pageTitle', action.payload);
    }

    case types.UPDATE_HEADER_LINK: {
      const { path, text } = action.payload;

      if (typeof path !== 'string' || typeof text !== 'string') return state;

      return state.set('headerLink', Map({ path, text }));
    }

    default:
      return state;
  }
};

export default session;
