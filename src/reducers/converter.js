import * as types from '../constants/ActionTypes';
import { Map, List } from 'immutable';

const initialState = Map({
  base: Map(),
  second: Map(),
});

const converter = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.CONVERTER_BASE_UPDATE: {
      return state.set('base', Map(action.payload));
    }

    case types.CONVERTER_SECOND_UPDATE: {
      return state.set('second', Map(action.payload));
    }

    default:
      return state;
  }
};

export default converter;
