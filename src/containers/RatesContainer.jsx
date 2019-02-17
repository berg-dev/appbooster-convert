import React from 'react';
import { connect } from 'react-redux';
import { updatePageTitle, updateHeaderLink } from '../store/session/actions';
import { favoritesAction } from '../store/currencies/actions';
import { getBaseCurrency } from '../store/session/selectors';
import { listSortedByFavorites } from '../store/currencies/selectors';
import RatesScreen from '../components/RatesScreen';

const RatesContainer = props => <RatesScreen {...props} />;

function mapStateToProps(state) {
  return {
    baseCurrency: getBaseCurrency(state),
    currenciesList: listSortedByFavorites(state),
  };
}

export default connect(
  mapStateToProps,
  {
    updatePageTitle,
    updateHeaderLink,
    favoritesAction,
  }
)(RatesContainer);
