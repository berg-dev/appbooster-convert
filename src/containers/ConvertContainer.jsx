import React from 'react';
import { connect } from 'react-redux';
import { updatePageTitle, updateHeaderLink } from '../store/session/actions';
import { getConverterPair, getConverterRate } from '../store/converter/selectors';
import { fetchRates, changeItemInPair, updateConvertPair } from '../store/converter/actions';
import { getCurrenciesList } from '../store/currencies/selectors';
import ConvertScreen from '../components/ConvertScreen';

const ConvertContainer = props => <ConvertScreen {...props} />;

function mapStateToProps(state) {
  return {
    pairToConvert: getConverterPair(state),
    convertRate: getConverterRate(state),
    currenciesList: getCurrenciesList(state),
  };
}

export default connect(
  mapStateToProps,
  {
    updatePageTitle,
    updateHeaderLink,
    fetchRates,
    changeItemInPair,
    updateConvertPair,
  }
)(ConvertContainer);
