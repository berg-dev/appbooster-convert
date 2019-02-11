import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import session from './session';
import currencies from './currencies';
import converter from './converter';

export default history =>
  combineReducers({
    router: connectRouter(history),
    session,
    currencies,
    converter,
  });
