import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePageTitle, updateHeaderLink } from '../store/session/actions';
import { favoritesAction } from '../store/currencies/actions';
import { getBaseCurrency } from '../store/session/selectors';
import { listSortedByFavorites } from '../store/currencies/selectors';
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
