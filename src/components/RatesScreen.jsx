import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RatesList from './RatesList';

const propTypes = {
  currenciesList: PropTypes.array.isRequired,
  baseCurrency: PropTypes.object.isRequired,
  updatePageTitle: PropTypes.func.isRequired,
  updateHeaderLink: PropTypes.func.isRequired,
  favoritesAction: PropTypes.func.isRequired,
};

class RatesScreen extends Component {
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
    const { favoritesAction } = this.props;

    favoritesAction(ticker, method);
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

RatesScreen.propTypes = propTypes;

export default RatesScreen;
