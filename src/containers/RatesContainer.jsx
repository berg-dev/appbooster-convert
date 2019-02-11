import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePageTitle, updateHeaderLink } from '../actions/SessionActions';
import { favoritesAction } from '../actions/CurrenciesActions';
import { getBaseCurrency } from '../selectors/CommonSelectors';
import { listSortedByFavorites } from '../selectors/CurrenciesSelectors';
import RatesScreen from '../components/RatesScreen';

const propTypes = {
  currenciesList: PropTypes.object.isRequired,
  baseCurrency: PropTypes.object.isRequired,
  updatePageTitle: PropTypes.func.isRequired,
  updateHeaderLink: PropTypes.func.isRequired,
  favoritesAction: PropTypes.func.isRequired,
};

const RatesContainer = props => <RatesScreen {...props} />;

function mapStateToProps(state) {
  return {
    baseCurrency: getBaseCurrency(state),
    currenciesList: listSortedByFavorites(state),
  };
}

RatesContainer.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    updatePageTitle,
    updateHeaderLink,
    favoritesAction,
  }
)(RatesContainer);
