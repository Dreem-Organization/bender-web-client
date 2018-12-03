import { fromJS } from 'immutable';
import { TOGGLE_FORM } from './constants';

export const initialState = fromJS({
  form: 'login',
  error: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FORM:
      return state.set('form', action.payload);
    default:
      return state;
  }
}

export default appReducer;
