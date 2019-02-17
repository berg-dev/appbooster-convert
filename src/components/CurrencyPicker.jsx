import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import flagsList from '../assets/static/flags';

const propTypes = {
  className: PropTypes.string,
  baseCurrency: PropTypes.shape({}).isRequired,
  baseCurrencyUpdater: PropTypes.func.isRequired,
  currenciesList: PropTypes.array.isRequired,
};

const defaultProps = {
  className: '',
};

class CurrencyPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectIsOpen: false,
      filter: '',
    };

    this.toggleSelectIsOpen = this.toggleSelectIsOpen.bind(this);
    this.handlerOuterClick = this.handlerOuterClick.bind(this);
    this.handlerChooseBaseCurrency = this.handlerChooseBaseCurrency.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
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

    const flag = flagsList[ticker];
    return flag ? <span className="CurrencyPicker__name-flag">{flag}</span> : null;
  }

  computedFilterList = list => {
    const { filter } = this.state;
    if (!filter) return list;

    const filterPhrase = filter.toLowerCase();
    return list.filter(item => item.name.toLowerCase().indexOf(filterPhrase) >= 0);
  };

  handlerOuterClick(e) {
    if (!e.target.closest('.CurrencyPicker')) {
      this.toggleSelectIsOpen(false);
    }
  }

  handlerChooseBaseCurrency = ticker => {
    this.props.baseCurrencyUpdater(ticker);
    this.toggleSelectIsOpen(false);
  };

  toggleSelectIsOpen(value) {
    this.setState(
      state => ({ selectIsOpen: typeof value === 'boolean' ? value : !state.selectIsOpen }),
      () => {
        if (!this.state.selectIsOpen) {
          this.setState({ filter: '' });
        }
      }
    );
  }

  updateFilter(e) {
    this.setState({ filter: e.target.value });
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
    const { baseCurrency } = this.props;

    return (
      <button className="CurrencyPicker__button" type="button" onClick={this.toggleSelectIsOpen}>
        <div className="CurrencyPicker__label">Base currency</div>
        {baseCurrency.ticker && baseCurrency.name && (
          <div className="CurrencyPicker__name">
            <span className="CurrencyPicker__name-text">{baseCurrency.name}</span>
            {this.computedCountryFlag(baseCurrency.ticker)}
          </div>
        )}
      </button>
    );
  }

  renderTypeList() {
    const { baseCurrency, currenciesList } = this.props;

    return (
      <div className="CurrencyPicker__box">
        <div className="CurrencyPicker__box-head">
          <div className="CurrencyPicker__search">
            <input
              type="text"
              placeholder="search here"
              className="CurrencyPicker__search-input"
              onChange={this.updateFilter}
              disabled={currenciesList.length <= 0}
            />
          </div>
          <div className="CurrencyPicker__box-current">
            {baseCurrency.ticker && baseCurrency.name && (
              <Fragment>
                <span className="CurrencyPicker__box-current-label">Current: </span>
                <div className="CurrencyPicker__name CurrencyPicker__name_in-box" title={baseCurrency.name}>
                  <span className="CurrencyPicker__name-text">{baseCurrency.name}</span>
                  {this.computedCountryFlag(baseCurrency.ticker)}
                </div>
              </Fragment>
            )}
          </div>
          <div className="CurrencyPicker__label CurrencyPicker__label_in-box">Choose base currency</div>
        </div>
        <div className="CurrencyPicker__box-list">
          {currenciesList.length <= 0 ? (
            <div className="CurrencyPicker__list-loading">Loading...</div>
          ) : (
            <ul className="CurrencyPicker__list">
              {this.computedFilterList(currenciesList).map(item => (
                <li className="CurrencyPicker__list-item" key={item.ticker}>
                  <button
                    className="CurrencyPicker__list-name"
                    type="button"
                    onClick={() => this.handlerChooseBaseCurrency(item.ticker)}
                    title={item.name}>
                    {item.name}
                  </button>
                  {item.flag && <span className="CurrencyPicker__list-flag">{item.flag}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

CurrencyPicker.propTypes = propTypes;
CurrencyPicker.defaultProps = defaultProps;

export default CurrencyPicker;
