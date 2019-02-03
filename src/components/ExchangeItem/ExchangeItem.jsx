import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';
import { BaseCurrencyContext } from '../../containers/App/App';
import './ExchangeItem.css';

const propsTypes = {
  data: PropTypes.shape({
    flag: PropTypes.string,
    name: PropTypes.string,
    inverseRate: PropTypes.number,
    ticker: PropTypes.string,
    isFavorite: PropTypes.bool,
  }).isRequired,
  favoritesAction: PropTypes.func.isRequired,
};
const defaultProps = {};

class ExchangeItem extends Component {
  computedValue(rate) {
    const stringRate = rate.toString();
    const indexDot = stringRate.indexOf('.');
    const first = stringRate.substr(0, indexDot);
    const last = stringRate.substr(indexDot + 1, 4);

    return `${first}.${last}`;
  }

  handleFavoriteClick = () => {
    const { data, favoritesAction } = this.props;

    const method = data.isFavorite ? 'remove' : 'add';
    favoritesAction(data.ticker, method);
  };

  render() {
    const { data } = this.props;

    return (
      <article
        className={cx({
          ExchangeItem: true,
          'ExchangeItem_is-favorite': data.isFavorite,
        })}>
        <div className="ExchangeItem__inner">
          <div className="ExchangeItem__label">
            {data.flag && <span className="ExchangeItem__flag">{data.flag}</span>}
            <span className="ExchangeItem__name" title={data.name}>
              {data.name}
            </span>
          </div>
          <div className="ExchangeItem__rate">
            <BaseCurrencyContext.Consumer>
              {base => (
                <div className="ExchangeItem__rate-label">
                  <button
                    className={cx({
                      'ExchangeItem__favorite-btn': true,
                      'ExchangeItem__favorite-btn_is-active': data.isFavorite,
                    })}
                    type="button"
                    onClick={this.handleFavoriteClick}
                  />
                  <span>
                    {data.ticker}/{base.ticker}
                  </span>
                </div>
              )}
            </BaseCurrencyContext.Consumer>
            <div className="ExchangeItem__rate-value">{this.computedValue(data.inverseRate)}</div>
          </div>
          <NavLink to="/convert" className="ExchangeItem__link" />
        </div>
      </article>
    );
  }
}

ExchangeItem.propTypes = propsTypes;
ExchangeItem.defaultProps = defaultProps;

export default ExchangeItem;
