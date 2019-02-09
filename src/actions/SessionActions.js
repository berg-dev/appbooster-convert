import * as types from '../constants/ActionTypes';
import { getCurrencyDataByTicker } from '../selectors/CommonSelectors';

const actionUpdateBaseCurrency = (ticker, name) => ({
  type: types.BASE_CURRENCY_UPDATE,
  payload: { ticker, name },
});

export const initBaseCurrency = () => dispatch => {
  const baseCurrency = localStorage.getItem('baseCurrency');

  if (baseCurrency) {
    const { ticker, name } = JSON.parse(baseCurrency);

    dispatch(actionUpdateBaseCurrency(ticker, name));
  } else {
    dispatch(actionUpdateBaseCurrency('USD', 'U.S. Dollar'));
  }
};

export const updateBaseCurrency = ticker => (dispatch, getState) => {
  const state = getState();
  const item = getCurrencyDataByTicker(state, ticker);
  const { name } = item;

  dispatch(actionUpdateBaseCurrency(ticker, name));
  localStorage.setItem('baseCurrency', JSON.stringify({ ticker, name }));
};

export const updatePageTitle = title => dispatch => {
  dispatch({ type: types.UPDATE_PAGE_TITLE, payload: title });
};

export const updateHeaderLink = (path, text) => dispatch => {
  dispatch({ type: types.UPDATE_HEADER_LINK, payload: { path, text } });
};
