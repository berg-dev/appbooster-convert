import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import session from './session/reducer';
import currencies from './currencies/reducer';
import converter from './converter/reducer';

export default history =>
  combineReducers({
    router: connectRouter(history),
    session,
    currencies,
    converter,
  });
