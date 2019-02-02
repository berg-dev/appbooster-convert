import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExchangeItem from '../../components/ExchangeItem/ExchangeItem';
import './RatesList.css';

const propsTypes = {
  list: PropTypes.array.isRequired,
};
const defaultProps = {};

class RatesList extends Component {
  render() {
    const { list } = this.props;

    return (
      <section className="RatesList">
        <ul className="RatesList__list">
          {list.map(item => (
            <ExchangeItem data={item} key={item.ticker} />
          ))}
        </ul>
      </section>
    );
  }
}

RatesList.propTypes = propsTypes;
RatesList.defaultProps = defaultProps;

export default RatesList;
