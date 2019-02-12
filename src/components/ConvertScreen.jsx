import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Converter from './Converter';

const propTypes = {
  location: PropTypes.object.isRequired,
  updatePageTitle: PropTypes.func.isRequired,
  updateHeaderLink: PropTypes.func.isRequired,
  base: PropTypes.object.isRequired,
  second: PropTypes.object.isRequired,
  currenciesList: PropTypes.object.isRequired,
};

class ConvertScreen extends Component {
  componentDidMount() {
    const { updatePageTitle, updateHeaderLink } = this.props;

    updatePageTitle('Convert');
    updateHeaderLink('/rates', '/to Exchange rates');
  }

  componentWillUnmount() {
    const { updatePageTitle, updateHeaderLink } = this.props;

    updatePageTitle('');
    updateHeaderLink('', '');
  }

  render() {
    const { base, second, currenciesList } = this.props;

    return (
      <section className="ConvertScreen">
        <div className="container">
          <Converter baseValue={base} secondValue={second} currenciesList={currenciesList} />
        </div>
      </section>
    );
  }
}

ConvertScreen.propTypes = propTypes;

export default ConvertScreen;
