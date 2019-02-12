import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePageTitle, updateHeaderLink } from '../store/session/actions';
import { getConverterValue } from '../store/converter/selectors';
import ConvertScreen from '../components/ConvertScreen';

const propTypes = {
  updatePageTitle: PropTypes.func.isRequired,
  updateHeaderLink: PropTypes.func.isRequired,
};

const ConvertContainer = props => <ConvertScreen {...props} />;

function mapStateToProps(state) {
  return {
    base: getConverterValue(state, 'base'),
    second: getConverterValue(state, 'second'),
  };
}

ConvertContainer.propTypes = propTypes;

export default connect(
  mapStateToProps,
  {
    updatePageTitle,
    updateHeaderLink,
  }
)(ConvertContainer);
