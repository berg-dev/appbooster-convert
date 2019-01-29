import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

export default function configureStore() {
  const composeEnhancers = compose;
  let store = null;

  if (process.env.NODE_ENV === 'development') {
    store = composeEnhancers(applyMiddleware(thunk), composeWithDevTools())(createStore)(reducers);
  } else {
    store = composeEnhancers(applyMiddleware(thunk))(createStore)(reducers);
  }

  return store;
}
