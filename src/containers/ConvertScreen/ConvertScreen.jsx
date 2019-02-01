import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as currenciesActions from '../../store/currencies/actions';
import * as currenciesSelectors from '../../store/currencies/reducer';
import Header from '../../components/Header/Header';

class RatesScreen extends Component {
  componentDidMount() {}

  handlerBaseCurrencyUpdate = id => {
    this.props.dispatch(currenciesActions.updateBaseCurrency(id));
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
