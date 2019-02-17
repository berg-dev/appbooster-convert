import React, { PureComponent } from 'react';
import { parse } from 'query-string';
import PropTypes from 'prop-types';
import Converter from './Converter';

const propTypes = {
  location: PropTypes.object.isRequired,
  pairToConvert: PropTypes.array.isRequired,
  convertRate: PropTypes.object.isRequired,
  currenciesList: PropTypes.array.isRequired,
  updateHeaderLink: PropTypes.func.isRequired,
  updatePageTitle: PropTypes.func.isRequired,
  changeItemInPair: PropTypes.func.isRequired,
  fetchRates: PropTypes.func.isRequired,
  updateConvertPair: PropTypes.func.isRequired,
};

class ConvertScreen extends PureComponent {
  componentDidMount() {
    const { updatePageTitle, updateHeaderLink, location } = this.props;

    updatePageTitle('Convert');
    updateHeaderLink('/rates', '/to Exchange rates');
    this.matchCurrencyInUrl(location.search);
  }

  componentDidUpdate(prevProps) {
    const { fetchRates } = this.props;

    if (
      prevProps.pairToConvert[0] !== this.props.pairToConvert[0] ||
      prevProps.pairToConvert[1] !== this.props.pairToConvert[1]
    ) {
      if (typeof prevProps.pairToConvert[0] !== 'undefined' && typeof prevProps.pairToConvert[1] !== 'undefined') {
        fetchRates();
      }
    }
  }

  componentWillUnmount() {
    const { updatePageTitle, updateHeaderLink } = this.props;

    updatePageTitle('');
    updateHeaderLink('', '');
  }

  matchCurrencyInUrl = url => {
    const { pairToConvert, currenciesList, fetchRates, updateConvertPair } = this.props;
    const { base: baseTicker, target: targetTicker } = parse(url);
    if (!baseTicker && !targetTicker) return;

    const newPair = [baseTicker, targetTicker].map((ticker, i) => {
      if (!ticker) return pairToConvert[i];
      if (!currenciesList.length) return { ticker };
      const ind = currenciesList.findIndex(n => n.ticker === ticker);

      return {
        ticker,
        name: currenciesList[ind].name,
        flag: currenciesList[ind].flag,
      };
    });

    updateConvertPair(newPair);
    fetchRates();
  };

  render() {
    const { pairToConvert, currenciesList, convertRate, changeItemInPair } = this.props;

    return (
      <section className="ConvertScreen">
        <div className="container">
          <Converter
            pair={pairToConvert}
            rate={convertRate}
            currenciesList={currenciesList}
            changeItemInPair={changeItemInPair}
          />
        </div>
      </section>
    );
  }
}

ConvertScreen.propTypes = propTypes;

export default ConvertScreen;
