import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cx from 'classnames';

const propsTypes = {
  data: PropTypes.shape({
    flag: PropTypes.string,
    name: PropTypes.string,
    inverseRate: PropTypes.number,
    ticker: PropTypes.string,
    isFavorite: PropTypes.bool,
  }).isRequired,
  baseCurrency: PropTypes.object.isRequired,
  favoritesAction: PropTypes.func.isRequired,
};

class ExchangeItem extends Component {
  computedValue = rate => {
    const stringRate = rate.toString();
    const indexDot = stringRate.indexOf('.');

    if (indexDot <= 0) {
      return stringRate;
    }

    const first = stringRate.substr(0, indexDot);
    const last = stringRate.substr(indexDot + 1, 4);

    return `${first}.${last}`;
  };

  handleOnClick = () => {
    const { data, favoritesAction } = this.props;
    const method = data.isFavorite ? 'remove' : 'add';
    favoritesAction(data.ticker, method);
  };

  render() {
    const { data, baseCurrency } = this.props;

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
            <div className="ExchangeItem__rate-label">
              <button
                className={cx({
                  'ExchangeItem__favorite-btn': true,
                  'ExchangeItem__favorite-btn_is-active': data.isFavorite,
                })}
                type="button"
                onClick={this.handleOnClick}
              />
              <span>
                {data.ticker}/{baseCurrency.ticker}
              </span>
            </div>
            <div className="ExchangeItem__rate-value">{this.computedValue(data.inverseRate)}</div>
          </div>
          <NavLink to={`/convert?${baseCurrency.ticker}+${data.ticker}`} className="ExchangeItem__link" />
        </div>
      </article>
    );
  }
}

ExchangeItem.propTypes = propsTypes;

export default ExchangeItem;
