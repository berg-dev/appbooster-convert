import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './CurrencyPicker.css';

const propTypes = {
  className: PropTypes.string,
};
const defaultProps = {
  className: '',
};

class CurrencyPicker extends Component {
  render() {
    const { className } = this.props;

    return (
      <div
        className={cx({
          CurrencyPicker: true,
          [className]: className.length,
        })}>
        <div className="CurrencyPicker__label">Base currency</div>
      </div>
    );
  }
}

CurrencyPicker.propTypes = propTypes;
CurrencyPicker.defaultProps = defaultProps;

export default CurrencyPicker;
