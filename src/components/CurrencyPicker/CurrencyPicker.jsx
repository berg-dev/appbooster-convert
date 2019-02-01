import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { BaseCurrencyContext, AvailableCurrencyContext } from '../../containers/App/App';
import flagsList from '../../static/flags';
import './CurrencyPicker.css';

const propTypes = {
  className: PropTypes.string,
  baseCurrencyUpdater: PropTypes.func,
};
const defaultProps = {
  className: '',
  baseCurrencyUpdater: () => {},
};

class CurrencyPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectIsOpen: false,
    };

    this.toggleSelectIsOpen = this.toggleSelectIsOpen.bind(this);
    this.handlerOuterClick = this.handlerOuterClick.bind(this);
    this.handlerChooseBaseCurrency = this.handlerChooseBaseCurrency.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.selectIsOpen !== this.state.selectIsOpen) {
      if (this.state.selectIsOpen) {
        document.body.addEventListener('click', this.handlerOuterClick);
      } else {
        document.body.removeEventListener('click', this.handlerOuterClick);
      }
    }
  }

  computedCountryFlag(ticker) {
    if (!ticker) return null;

    const flag = flagsList[ticker] || '🏴';

    return <span className="CurrencyPicker__name-flag">{flag}</span>;
  }

  handlerOuterClick(e) {
    if (!e.target.closest('.CurrencyPicker')) {
      this.toggleSelectIsOpen(false);
    }
  }

  handlerChooseBaseCurrency(id) {
    this.props.baseCurrencyUpdater(id);
    this.toggleSelectIsOpen(false);
  }

  toggleSelectIsOpen(value) {
    this.setState(state => ({ selectIsOpen: typeof value === 'boolean' ? value : !state.selectIsOpen }));
  }

  render() {
    const { className } = this.props;
    const { selectIsOpen } = this.state;

    return (
      <div
        className={cx({
          CurrencyPicker: true,
          [className]: className.length,
        })}>
        {selectIsOpen ? this.renderTypeList() : this.renderTypeButton()}
      </div>
    );
  }

  renderTypeButton() {
    return (
      <button className="CurrencyPicker__button" type="button" onClick={this.toggleSelectIsOpen}>
        <div className="CurrencyPicker__label">Base currency</div>
        <BaseCurrencyContext.Consumer>
          {value =>
            value.name && (
              <div className="CurrencyPicker__name">
                <span className="CurrencyPicker__name-text">{value.name}</span>
                {this.computedCountryFlag(value.ticker)}
              </div>
            )
          }
        </BaseCurrencyContext.Consumer>
      </button>
    );
  }

  renderTypeList() {
    return (
      <div className="CurrencyPicker__box">
        <div className="CurrencyPicker__box-head">
          <div className="CurrencyPicker__box-current">
            <BaseCurrencyContext.Consumer>
              {value =>
                value.name && (
                  <Fragment>
                    <span className="CurrencyPicker__box-current-label">Current: </span>
                    <div className="CurrencyPicker__name CurrencyPicker__name_in-box">
                      <span className="CurrencyPicker__name-text">{value.name}</span>
                      {this.computedCountryFlag(value.ticker)}
                    </div>
                  </Fragment>
                )
              }
            </BaseCurrencyContext.Consumer>
          </div>
          <div className="CurrencyPicker__label CurrencyPicker__label_in-box">Choose base currency</div>
        </div>
        <ul className="CurrencyPicker__list">
          <AvailableCurrencyContext.Consumer>
            {value =>
              value && value.length > 0
                ? value.map(item => (
                    <li className="CurrencyPicker__list-item" key={item.id}>
                      <button
                        className="CurrencyPicker__list-name"
                        type="button"
                        onClick={() => this.handlerChooseBaseCurrency(item.id)}>
                        {item.name}
                      </button>
                      {item.flag && <span className="CurrencyPicker__list-flag">{item.flag}</span>}
                    </li>
                  ))
                : null
            }
          </AvailableCurrencyContext.Consumer>
        </ul>
      </div>
    );
  }
}

CurrencyPicker.propTypes = propTypes;
CurrencyPicker.defaultProps = defaultProps;

export default CurrencyPicker;
