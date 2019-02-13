import * as types from './constants';
import { Map, List } from 'immutable';

const initialState = Map({
  pair: List([]),
  rate: Map({
    base: 0,
    inverse: 0,
  }),
});

const converter = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.PAIR_UPDATE: {
      return state.set('pair', List(action.payload));
    }

    case types.RATE_UPDATE: {
      return state.set('rate', Map({ ...action.payload }));
    }

    default:
      return state;
  }
};

export default converter;
