import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/configureStore';
import App from './containers/App/App';
import RootContainer from './containers/RootContainer';
import './assets/css/base.css';

const store = configureStore();

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component history={history} />
    </Provider>,
    document.getElementById('root')
  );
};

render(RootContainer);
