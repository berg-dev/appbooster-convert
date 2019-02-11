import React from 'react';
import { connect } from 'react-redux';

import { initBaseCurrency } from '../actions/SessionActions';
import { initConverter } from '../actions/ConverterActions';
import { fetchCurrenciesList, initFavoritesList } from '../actions/CurrenciesActions';
import { getBaseCurrency } from '../selectors/CommonSelectors';
import Root from '../components/Root';
import ConvertContainer from './ConvertContainer';
import RatesContainer from './RatesContainer';
import { CONVERT_PATH, RATES_PATH } from '../constants/RouterConstants';

const RootContainer = props => <Root {...props} />;

const mapStateToProps = state => {
  return {
    baseCurrency: getBaseCurrency(state),
    routes: {
      [CONVERT_PATH]: ConvertContainer,
      [RATES_PATH]: RatesContainer,
    },
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
