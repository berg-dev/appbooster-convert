export const getBaseCurrency = state => ({
  ticker: state.session.getIn(['baseCurrency', 'ticker']),
  name: state.session.getIn(['baseCurrency', 'name']),
});

export const getPageTitle = state => state.session.get('pageTitle');

export const getHeaderLink = state => ({
  path: state.session.getIn(['headerLink', 'path']),
  text: state.session.getIn(['headerLink', 'text']),
});

export const getCurrenciesList = state => state.currencies.get('currenciesList');

export const getCurrencyDataByTicker = (state, ticker) =>
  state.currencies.get('currenciesList').find(v => v.ticker === ticker);

export const getFavoritesList = state => state.currencies.get('favoritesCurrencies');

export const getConverterValue = (state, type) => state.converter.get(type);
