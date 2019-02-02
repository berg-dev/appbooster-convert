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

    if (!flag) return null;

    return <span className="CurrencyPicker__name-flag">{flag}</span>;
  }

  computedFilterList(list) {
    const { filter } = this.state;
    if (!filter || !filter.length) return list;

    const filterPhrase = filter.toLowerCase();
    return list.filter(item => item.name.toLowerCase().indexOf(filterPhrase) >= 0);
  }

  handlerOuterClick(e) {
    if (!e.target.closest('.CurrencyPicker')) {
      this.toggleSelectIsOpen(false);
    }
  }

  handlerChooseBaseCurrency(ticker) {
    this.props.baseCurrencyUpdater(ticker);
    this.toggleSelectIsOpen(false);
  }

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
          <div className="CurrencyPicker__search">
            <input
              type="text"
              placeholder="search here"
              className="CurrencyPicker__search-input"
              onChange={this.updateFilter}
            />
          </div>
          <div className="CurrencyPicker__box-current">
            <BaseCurrencyContext.Consumer>
              {value =>
                value.name && (
                  <Fragment>
                    <span className="CurrencyPicker__box-current-label">Current: </span>
                    <div className="CurrencyPicker__name CurrencyPicker__name_in-box" title={value.name}>
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
        <div className="CurrencyPicker__box-list">
          <AvailableCurrencyContext.Consumer>
            {list =>
              list && list.length > 0 ? (
                <ul className="CurrencyPicker__list">
                  {this.computedFilterList(list).map(item => (
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
              ) : (
                <div className="CurrencyPicker__list-loading">Loading...</div>
              )
            }
          </AvailableCurrencyContext.Consumer>
        </div>
      </div>
    );
  }
}

CurrencyPicker.propTypes = propTypes;
CurrencyPicker.defaultProps = defaultProps;

export default CurrencyPicker;
