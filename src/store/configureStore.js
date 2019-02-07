import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/index';

export const history = createBrowserHistory();

export default function configureStore(initialState) {
  const composeEnhancers = compose;
  let store = null;

  if (process.env.NODE_ENV === 'development') {
    store = composeEnhancers(applyMiddleware(routerMiddleware(history), thunk), composeWithDevTools())(createStore)(
      rootReducer(history),
      initialState
    );
  } else {
    store = composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))(createStore)(
      rootReducer(history),
      initialState
    );
  }

  return store;
}
