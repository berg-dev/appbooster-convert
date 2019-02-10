import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  updatePageTitle: PropTypes.func.isRequired,
  updateHeaderLink: PropTypes.func.isRequired,
};

class Convert extends Component {
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
    return (
      <section className="ConvertScreen">
        <div className="container">Convert Screen</div>
      </section>
    );
  }
}

Convert.propTypes = propTypes;

export default Convert;
