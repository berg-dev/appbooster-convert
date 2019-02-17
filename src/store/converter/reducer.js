import * as types from './constants';
import { Map, List } from 'immutable';

const initialState = Map({
  pair: List([]),
  rate: Map({
    base: 1,
    inverse: 1,
  }),
});

const converter = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.PAIR_UPDATE: {
      return state.update('pair', () => List(action.payload));
    }

    case types.RATE_UPDATE: {
      const { base, inverse } = action.payload;

      if (!base || !inverse) return state;

      return state.update('rate', () => Map({ base, inverse }));
    }

    default:
      return state;
  }
};

export default converter;
