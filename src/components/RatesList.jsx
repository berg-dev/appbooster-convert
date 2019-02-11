import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExchangeItem from './ExchangeItem';

const propsTypes = {
  list: PropTypes.object.isRequired,
  baseCurrency: PropTypes.object.isRequired,
  favoritesAction: PropTypes.func.isRequired,
};

class RatesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };
  }

  handlerOnUpdateFilter = e => {
    this.setState({ filter: e.target.value });
  };

  filtredList = list => {
    const { filter } = this.state;

    if (!filter.length) return list;

    return list.filter(item => item.name.indexOf(filter) >= 0);
  };

  render() {
    const { list, favoritesAction, baseCurrency } = this.props;

    return (
      <section className="RatesList">
        <div className="RatesList__search">
          <input
            type="text"
            className="RatesList__search-field"
            placeholder="Search..."
            onChange={this.handlerOnUpdateFilter}
          />
        </div>
        <ul className="RatesList__list">
          {this.filtredList(list).map(item => (
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
