import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePageTitle, updateHeaderLink } from '../actions/SessionActions';
import Convert from '../components/Convert';

const propTypes = {
  updatePageTitle: PropTypes.func.isRequired,
  updateHeaderLink: PropTypes.func.isRequired,
};

const ConvertContainer = props => <Convert {...props} />;

function mapStateToProps(state) {
  return {};
}

ConvertContainer.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    updatePageTitle,
    updateHeaderLink,
  }
)(ConvertContainer);
