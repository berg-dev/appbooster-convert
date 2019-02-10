import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from './store/configureStore';
import RootContainer from './containers/RootContainer';
import './assets/styles/main.css';

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
