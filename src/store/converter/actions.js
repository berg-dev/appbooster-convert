import * as types from './constants';
import flagsList from '../../assets/static/flags';

export const initConverter = () => dispatch => {
  const base = { ticker: 'USD', name: 'U.S. Dollar', flag: flagsList['USD'], multi: 1 };
  const second = { ticker: 'EUR', name: 'Euro', flag: flagsList['EUR'], multi: 1 };

  dispatch({ type: types.CONVERTER_BASE_UPDATE, payload: base });
  dispatch({ type: types.CONVERTER_SECOND_UPDATE, payload: second });
};
