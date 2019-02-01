import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import CurrencyPicker from '../CurrencyPicker/CurrencyPicker';
import './Header.css';

const propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  baseCurrencyUpdater: PropTypes.func,
};
const defaultProps = {
  baseCurrencyUpdater: () => {},
};

class Header extends Component {
  render() {
    const { link, title, baseCurrencyUpdater } = this.props;

    return (
      <header className="Header">
        {link.url && link.text && (
          <nav className="Header__nav">
            <NavLink to={link.url} className="Header__link">
              {link.text}
            </NavLink>
          </nav>
        )}
        {title && <h1 className="Header__title">{title}</h1>}
        <CurrencyPicker className="Header__CurrencyPicker" baseCurrencyUpdater={baseCurrencyUpdater} />
      </header>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
