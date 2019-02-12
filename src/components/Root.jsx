import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import HeaderContainer from '../containers/HeaderContainer';
import ConvertContainer from '../containers/ConvertContainer';
import RatesContainer from '../containers/RatesContainer';

const propTypes = {
  initBaseCurrency: PropTypes.func.isRequired,
  initConverter: PropTypes.func.isRequired,
  fetchCurrenciesList: PropTypes.func.isRequired,
  initFavoritesList: PropTypes.func.isRequired,
  baseCurrency: PropTypes.object.isRequired,
  history: PropTypes.shape({}).isRequired,
  routes: PropTypes.shape({}).isRequired,
};

class Root extends Component {
  componentDidMount() {
    const { initBaseCurrency, fetchCurrenciesList, initFavoritesList, initConverter } = this.props;

    initBaseCurrency();
    initFavoritesList();
    fetchCurrenciesList();
    initConverter();
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
    const { history } = this.props;

    return (
      <ConnectedRouter history={history}>
        <Fragment>
          <HeaderContainer />
          <Switch>
            <Route path="/" exact render={() => <Redirect to="/convert" />} />
            <Route path="/convert" component={ConvertContainer} />
            <Route path="/rates" component={RatesContainer} />
          </Switch>
        </Fragment>
      </ConnectedRouter>
    );
  }
}

Root.propTypes = propTypes;

export default Root;
