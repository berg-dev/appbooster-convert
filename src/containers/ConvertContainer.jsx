import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePageTitle, updateHeaderLink } from '../store/session/actions';
import { getConverterPair, getConverterRate } from '../store/converter/selectors';
import { fetchRates, changeItemInPair } from '../store/converter/actions';
import { getCurrenciesList } from '../store/currencies/selectors';
import ConvertScreen from '../components/ConvertScreen';

const propTypes = {
  updatePageTitle: PropTypes.func.isRequired,
  updateHeaderLink: PropTypes.func.isRequired,
};

const ConvertContainer = props => <ConvertScreen {...props} />;

function mapStateToProps(state) {
  return {
    pairToConvert: getConverterPair(state),
    convertRate: getConverterRate(state),
    currenciesList: getCurrenciesList(state),
  };
}

ConvertContainer.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    updatePageTitle,
    updateHeaderLink,
    fetchRates,
    changeItemInPair,
  }
)(ConvertContainer);
