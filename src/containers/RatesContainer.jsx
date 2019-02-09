import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePageTitle, updateHeaderLink } from '../actions/SessionActions';
import { getCurrenciesList, getBaseCurrency } from '../selectors/CommonSelectors';
import Rates from '../components/Rates';

const propTypes = {
  currenciesList: PropTypes.object.isRequired,
  baseCurrency: PropTypes.object.isRequired,
  updatePageTitle: PropTypes.func.isRequired,
  updateHeaderLink: PropTypes.func.isRequired,
};

const RatesContainer = props => <Rates {...props} />;

function mapStateToProps(state) {
  return {
    baseCurrency: getBaseCurrency(state),
    currenciesList: getCurrenciesList(state),
  };
}

RatesContainer.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    updatePageTitle,
    updateHeaderLink,
  }
)(RatesContainer);
