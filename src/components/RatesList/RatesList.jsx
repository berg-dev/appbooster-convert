import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExchangeItem from '../../components/ExchangeItem/ExchangeItem';
import './RatesList.css';

const propsTypes = {
  list: PropTypes.array.isRequired,
  favoritesAction: PropTypes.func.isRequired,
};
const defaultProps = {};

class RatesList extends Component {
  render() {
    const { list, favoritesAction } = this.props;

    return (
      <section className="RatesList">
        <ul className="RatesList__list">
          {list.map(item => (
            <li className="RatesList__list-item" key={item.ticker}>
              <ExchangeItem data={item} favoritesAction={favoritesAction} />
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

RatesList.propTypes = propsTypes;
RatesList.defaultProps = defaultProps;

export default RatesList;
