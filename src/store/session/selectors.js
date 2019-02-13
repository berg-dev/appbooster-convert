export const getBaseCurrency = state => ({
  ticker: state.session.getIn(['baseCurrency', 'ticker']),
  name: state.session.getIn(['baseCurrency', 'name']),
});

export const getPageTitle = state => state.session.get('pageTitle');

export const getHeaderLink = state => ({
  path: state.session.getIn(['headerLink', 'path']),
  text: state.session.getIn(['headerLink', 'text']),
});
