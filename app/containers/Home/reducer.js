import { fromJS } from 'immutable';
import { TOGGLE_FORM } from './constants';

export const initialState = fromJS({
  form: true,
  error: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_FORM:
      return state.set('form', !state.get('form'));
    default:
      return state;
  }
}

export default appReducer;
