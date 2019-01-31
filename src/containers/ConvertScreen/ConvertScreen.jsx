import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as currenciesActions from '../../store/currencies/actions';
import * as currenciesSelectors from '../../store/currencies/reducer';
import Header from '../../components/Header/Header';

class RatesScreen extends Component {
  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <Header link={{ url: '/rates', text: '/to Exchange rate' }} title="Convert" />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(RatesScreen);
