import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExchangeItem from './ExchangeItem';

const propsTypes = {
  list: PropTypes.object.isRequired,
  baseCurrency: PropTypes.object.isRequired,
  favoritesAction: PropTypes.func.isRequired,
};

class RatesList extends Component {
  render() {
    const { list, favoritesAction, baseCurrency } = this.props;

    return (
      <section className="RatesList">
        <ul className="RatesList__list">
          {list.map(item => (
            <li className="RatesList__list-item" key={item.ticker}>
              <ExchangeItem data={item} baseCurrency={baseCurrency} favoritesAction={favoritesAction} />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

RatesList.propTypes = propsTypes;

export default RatesList;
