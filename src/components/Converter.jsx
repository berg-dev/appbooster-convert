import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ConverterView from './ConverterView';

const propTypes = {
  baseValue: PropTypes.object.isRequired,
  secondValue: PropTypes.object.isRequired,
  currenciesList: PropTypes.object.isRequired,
};

class Converter extends Component {
  render() {
    const { baseValue, secondValue, currenciesList } = this.props;

    return (
      <div className="Converter">
        <ConverterView data={baseValue} currenciesList={currenciesList} />
        <hr className="Converter__separator" />
        <ConverterView data={secondValue} currenciesList={currenciesList} />
      </div>
    );
  }
}

Converter.propTypes = propTypes;

export default Converter;
