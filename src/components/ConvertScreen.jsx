import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Converter from './Converter';

const propTypes = {
  location: PropTypes.object.isRequired,
  pairToConvert: PropTypes.array.isRequired,
  convertRate: PropTypes.object.isRequired,
  currenciesList: PropTypes.object.isRequired,
  updateHeaderLink: PropTypes.func.isRequired,
  updatePageTitle: PropTypes.func.isRequired,
  changeItemInPair: PropTypes.func.isRequired,
  fetchRates: PropTypes.func,
};

class ConvertScreen extends PureComponent {
  componentDidMount() {
    const { updatePageTitle, updateHeaderLink } = this.props;

    updatePageTitle('Convert');
    updateHeaderLink('/rates', '/to Exchange rates');
  }

  componentDidUpdate(prevProps) {
    const { fetchRates } = this.props;

    if (
      prevProps.pairToConvert[0] !== this.props.pairToConvert[0] ||
      prevProps.pairToConvert[1] !== this.props.pairToConvert[1]
    ) {
      fetchRates();
    }
  }

  componentWillUnmount() {
    const { updatePageTitle, updateHeaderLink } = this.props;

    updatePageTitle('');
    updateHeaderLink('', '');
  }

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
