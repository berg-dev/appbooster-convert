import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as currenciesActions from '../../store/currencies/actions';
import * as currenciesSelectors from '../../store/currencies/reducer';
import Header from '../../components/Header/Header';
import './RatesScreen.css';

class RatesScreen extends Component {
  componentDidMount() {}

  handlerBaseCurrencyUpdate = ticker => {
    this.props.dispatch(currenciesActions.updateBaseCurrency(ticker));
  };

  render() {
    return (
      <Fragment>
        <Header
          link={{ url: '/convert', text: '/to Convert' }}
          title="Exchange rates"
          baseCurrencyUpdater={this.handlerBaseCurrencyUpdate}
        />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: currenciesSelectors.getList(state),
  };
}

export default connect(mapStateToProps)(RatesScreen);
