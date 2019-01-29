import * as types from './actionTypes';
import { Map } from 'immutable';

const initialState = Map({
  baseCurrency: 'RUB',
  favoriteCurrencies: [],
  currenciesList: [],
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.CURRENCY_FETCHED: {
      return state.update('currenciesList', () => action.payload);
    }

    default:
      return state;
  }
}

export function getList(state) {
  return state.currencies.get('currenciesList');
}

// const test = {
//   currencies: {
//     base: 'RUB',
//     favorites: ['RUB', 'USD', 'EUR'],
//     list: [
//       {
//         label: 'CAD',
//         rates: 1.565,
//       },
//       {
//         label: 'CHF',
//         rates: 1.1798,
//       },
//       {
//         label: 'GBP',
//         rates: 0.87295,
//       },
//       {
//         label: 'SEK',
//         rates: 10.2983,
//       },
//       {
//         label: 'EUR',
//         rates: 1.092,
//       },
//       {
//         label: 'USD',
//         rates: 1.2234,
//       },
//     ],
//   },
// };
