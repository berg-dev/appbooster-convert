import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getBaseCurrency, getPageTitle, getHeaderLink } from '../store/session/selectors';
import { getCurrenciesList } from '../store/currencies/selectors';
import { updateBaseCurrency } from '../store/session/actions';

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
