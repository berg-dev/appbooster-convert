import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  baseValue: PropTypes.object.isRequired,
  secondValue: PropTypes.object.isRequired,
};

class Converter extends Component {
  render() {
    const { baseValue, secondValue } = this.props;

    return (
      <div className="Converter">
        <div className="Converter__part Converter__part_base">
          <div className="Converter__flag">{baseValue.get('flag')}</div>
          <div className="Converter__name">
            {baseValue.get('ticker')} - {baseValue.get('name')}
          </div>
          <div className="Converter__rate">
            1 {baseValue.get('ticker')} = 0.776791 {secondValue.get('ticker')}
          </div>
          <div className="Converter__field">
            <input type="text" value={secondValue.get('multi')} className="Converter__field-input" />
            <span className="Converter__field-ticker">{baseValue.get('ticker')}</span>
          </div>
        </div>

        <div className="Converter__part Converter__part_second">
          <div className="Converter__flag">{secondValue.get('flag')}</div>
          <div className="Converter__name">
            {secondValue.get('ticker')} - {secondValue.get('name')}
          </div>
          <div className="Converter__rate">
            1 {secondValue.get('ticker')} = 1.23412 {baseValue.get('ticker')}
          </div>
          <div className="Converter__field">
            <input type="text" value={secondValue.get('multi')} className="Converter__field-input" />
            <span className="Converter__field-ticker">{secondValue.get('ticker')}</span>
          </div>
        </div>
      </div>
    );
  }
}

Converter.propTypes = propTypes;

export default Converter;
