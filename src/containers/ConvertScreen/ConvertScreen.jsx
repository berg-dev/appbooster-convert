import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as currenciesActions from '../../store/currencies/actions';
import Header from '../../components/Header/Header';

class RatesScreen extends Component {
  componentDidMount() {}

  handlerBaseCurrencyUpdate = ticker => {
    this.props.dispatch(currenciesActions.updateBaseCurrency(ticker));
  };

  render() {
    return (
      <Fragment>
        <Header
          link={{ url: '/rates', text: '/to Exchange rate' }}
          title="Convert"
          baseCurrencyUpdater={this.handlerBaseCurrencyUpdate}
        />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(RatesScreen);
