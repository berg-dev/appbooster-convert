import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as currenciesActions from '../../store/currencies/actions';
import * as currenciesSelectors from '../../store/currencies/reducer';
import './RatesScreen.css';

class RatesScreen extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <h2>Rates Screen</h2>
        <NavLink to="/convert">to Convert</NavLink>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: currenciesSelectors.getList(state),
  };
}

export default connect(mapStateToProps)(RatesScreen);
