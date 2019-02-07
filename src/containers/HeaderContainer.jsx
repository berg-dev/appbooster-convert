import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getBaseCurrency, getPageTitle, getHeaderLink, getCurrenciesList } from '../selectors/CommonSelectors';
import { updateBaseCurrency } from '../actions/SessionActions';

const HeaderContainer = props => <Header {...props} />;

const mapStateToProps = state => {
  return {
    baseCurrency: getBaseCurrency(state),
    title: getPageTitle(state),
    headerLink: getHeaderLink(state),
    currenciesList: getCurrenciesList(state),
  };
};

export default connect(
  mapStateToProps,
  {
    updateBaseCurrency,
  }
)(HeaderContainer);
