import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import CurrencyPicker from './CurrencyPicker';

const propTypes = {
  baseCurrency: PropTypes.shape({}).isRequired,
  title: PropTypes.string.isRequired,
  headerLink: PropTypes.shape({
    path: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  currenciesList: PropTypes.array.isRequired,
  updateBaseCurrency: PropTypes.func.isRequired,
};

const Header = ({ baseCurrency, title, headerLink, currenciesList, updateBaseCurrency }) => (
  <header className="Header">
    {headerLink.path && headerLink.text && (
      <nav className="Header__nav">
        <NavLink to={headerLink.path} className="Header__link">
          {headerLink.text}
        </NavLink>
      </nav>
    )}
    {title && <h1 className="Header__title">{title}</h1>}
    <CurrencyPicker
      className="Header__CurrencyPicker"
      baseCurrency={baseCurrency}
      baseCurrencyUpdater={updateBaseCurrency}
      currenciesList={currenciesList}
    />
  </header>
);

Header.propTypes = propTypes;

export default Header;
