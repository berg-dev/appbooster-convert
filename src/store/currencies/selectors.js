import { createSelector } from 'reselect';

export const getFavoritesList = state => state.currencies.get('favoritesCurrencies');

export const getCurrencyDataByTicker = (state, ticker) =>
  state.currencies.get('currenciesList').find(v => v.ticker === ticker);

export const getCurrenciesList = state => state.currencies.get('currenciesList').toArray();

export const listSortedByFavorites = createSelector(
  getCurrenciesList,
  list =>
    list.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (b.isFavorite && !a.isFavorite) return 1;

      return 0;
    })
);
