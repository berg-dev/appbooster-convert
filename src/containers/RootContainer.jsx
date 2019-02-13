import React from 'react';
import { connect } from 'react-redux';
import { initBaseCurrency } from '../store/session/actions';
import { initConverter } from '../store/converter/actions';
import { fetchCurrenciesList, initFavoritesList } from '../store/currencies/actions';
import { getBaseCurrency } from '../store/session/selectors';
import Root from '../components/Root';

const RootContainer = props => <Root {...props} />;

const mapStateToProps = state => {
  return {
    baseCurrency: getBaseCurrency(state),
  };
};

export default connect(
  mapStateToProps,
  {
    initBaseCurrency,
    initConverter,
    fetchCurrenciesList,
    initFavoritesList,
  }
)(RootContainer);
