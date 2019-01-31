import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseCurrencyContext } from '../../containers/App/App';
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
        <BaseCurrencyContext.Consumer>
          {value =>
            value.name && (
              <div className="CurrencyPicker__name">
                <span className="CurrencyPicker__name-text">{value.name}</span>
                {value.flag && <span className="CurrencyPicker__name-flag">{value.flag}</span>}
              </div>
            )
          }
        </BaseCurrencyContext.Consumer>
      </div>
    );
  }
}

CurrencyPicker.propTypes = propTypes;
CurrencyPicker.defaultProps = defaultProps;

export default CurrencyPicker;
