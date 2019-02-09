import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RatesList from './RatesList';

const propTypes = {
  currenciesList: PropTypes.object.isRequired,
  baseCurrency: PropTypes.object.isRequired,
  updatePageTitle: PropTypes.func.isRequired,
  updateHeaderLink: PropTypes.func.isRequired,
};

class Rates extends Component {
  componentDidMount() {
    const { updatePageTitle, updateHeaderLink } = this.props;

    updatePageTitle('Exchange rates');
    updateHeaderLink('/convert', '/to Convert');
  }

  componentWillUnmount() {
    const { updatePageTitle, updateHeaderLink } = this.props;

    updatePageTitle('');
    updateHeaderLink('', '');
  }

  handlerFavoritesAction = (ticker, method) => {
    // this.props.dispatch(currenciesActions.favoritesAction(ticker, method));
  };

  render() {
    const { currenciesList, baseCurrency } = this.props;

    return (
      <section className="RatesScreen">
        <div className="container">
          <main>
            <RatesList
              list={currenciesList}
              baseCurrency={baseCurrency}
              favoritesAction={this.handlerFavoritesAction}
            />
          </main>
        </div>
      </section>
    );
  }
}

Rates.propTypes = propTypes;

export default Rates;
