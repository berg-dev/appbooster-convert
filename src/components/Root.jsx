import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { INDEX_PATH } from '../constants/RouterConstants';

import HeaderContainer from '../containers/HeaderContainer';

const propTypes = {
  initBaseCurrency: PropTypes.func.isRequired,
  fetchCurrenciesList: PropTypes.func.isRequired,
  initFavoritesList: PropTypes.func.isRequired,
  baseCurrency: PropTypes.object.isRequired,
  history: PropTypes.shape({}).isRequired,
  routes: PropTypes.shape({}).isRequired,
};

class Root extends Component {
  componentDidMount() {
    const { initBaseCurrency, fetchCurrenciesList, initFavoritesList } = this.props;

    initBaseCurrency();
    initFavoritesList();
    fetchCurrenciesList();
  }

  componentDidUpdate(prevProps) {
    const { fetchCurrenciesList } = this.props;

    if (
      prevProps.baseCurrency.ticker !== this.props.baseCurrency.ticker &&
      typeof prevProps.baseCurrency.ticker === 'string'
    ) {
      fetchCurrenciesList();
    }
  }

  render() {
    const { history, routes } = this.props;

    return (
      <ConnectedRouter history={history}>
        <Fragment>
          <HeaderContainer />
          <Switch>
            <Route path={INDEX_PATH} exact render={() => <Redirect to="/convert" />} />
            {Object.keys(routes).map(route => (
              <Route path={route} component={routes[route]} key={route} />
            ))}
          </Switch>
        </Fragment>
      </ConnectedRouter>
    );
  }
}

Root.propTypes = propTypes;

export default Root;
