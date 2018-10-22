import { fromJS } from 'immutable';
import { PUT_TOAST, GRILL_TOAST, TOAST_READY } from './constants';

export const initialState = fromJS({
  toasts: {},
  count: 0,
  error: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case PUT_TOAST:
      return state
        .setIn(
          ['toasts', state.get('count')],
          fromJS({ ...action.payload, id: state.get('count') }),
        )
        .set('count', state.get('count') + 1);
    case GRILL_TOAST:
      if (state.getIn(['toasts', action.payload])) {
        return state.updateIn(
          ['toasts', action.payload, 'life'],
          val => val - 1,
        );
      }
      return state;
    case TOAST_READY:
      return state.removeIn(['toasts', action.payload]);
    default:
      return state;
  }
}

export default appReducer;
