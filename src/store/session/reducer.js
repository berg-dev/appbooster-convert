import * as types from './actionTypes';
import { Map } from 'immutable';

const initialState = Map({});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}
