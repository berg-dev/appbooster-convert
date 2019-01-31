import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import * as currenciesActions from '../../store/currencies/actions';
import * as currenciesSelectors from '../../store/currencies/reducer';
import RatesScreen from '../RatesScreen/RatesScreen';
import ConvertScreen from '../ConvertScreen/ConvertScreen';
import './App.css';

export const BaseCurrencyContext = React.createContext(false);

const propTypes = {
  baseCurrency: PropTypes.oneOfType([
    PropTypes.shape({
      ticket: PropTypes.string,
    }),
    PropTypes.bool,
  ]).isRequired,
};

const defaultProps = {};

class App extends Component {
  componentDidMount() {
    this.props.dispatch(currenciesActions.getBaseCurrency());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.baseCurrency !== this.props.baseCurrency) {
      this.props.dispatch(currenciesActions.fetchCurrencies(this.props.baseCurrency.ticket));
    }
  }

  render() {
    return (
      <div className="App">
        <BaseCurrencyContext.Provider value={this.props.baseCurrency}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/convert" />} />
              <Route path="/convert" component={ConvertScreen} />
              <Route path="/rates" component={RatesScreen} />
            </Switch>
          </BrowserRouter>
        </BaseCurrencyContext.Provider>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    baseCurrency: currenciesSelectors.getBaseCurrency(state),
  };
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default connect(mapStateToProps)(App);
