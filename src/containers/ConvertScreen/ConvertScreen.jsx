import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class RatesScreen extends Component {
  render() {
    return (
      <div>
        <h2>Convert Screen</h2>
        <NavLink to="/rates">to Exchange rate</NavLink>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(RatesScreen);
