import { createSelector } from 'reselect';
import { getCurrenciesList } from './CommonSelectors';

export const listSortedByFavorites = createSelector(
  getCurrenciesList,
  list =>
    list.sort((a, b) => {
      if (a.isFavorite && !b.isFavorite) return -1;
      if (b.isFavorite && !a.isFavorite) return 1;

      return 0;
    })
);
