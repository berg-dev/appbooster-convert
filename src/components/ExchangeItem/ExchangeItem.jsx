import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BaseCurrencyContext } from '../../containers/App/App';
import './ExchangeItem.css';

const propsTypes = {
  data: PropTypes.shape({
    flag: PropTypes.string,
    name: PropTypes.string,
    ticker: PropTypes.number,
  }).isRequired,
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

  render() {
    const { data } = this.props;

    return (
      <article className="ExchangeItem">
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
                  {data.ticker}/{base.ticker}
                </div>
              )}
            </BaseCurrencyContext.Consumer>
            <div className="ExchangeItem__rate-value">{this.computedValue(data.inverseRate)}</div>
          </div>
        </div>
      </article>
    );
  }
}

ExchangeItem.propTypes = propsTypes;
ExchangeItem.defaultProps = defaultProps;

export default ExchangeItem;
