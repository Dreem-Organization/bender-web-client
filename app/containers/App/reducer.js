import { fromJS } from 'immutable';
import LocalStorageManager from 'utils/localStorageManager';
import {
  ANIMATOR_UPDATE,
  LOGOUT,
  FETCH_ERROR,
  LOGIN,
  SOCIAL_LOGIN,
  FIRST_VIEW_LOADED,
  JOIN,
} from './constants';

export const initialState = fromJS({
  status: 'waiting',
  jwt: '',
  firstViewLoaded: false,
  user: {
    email: '',
    firstName: '',
    lastName: '',
    username: '',
  },
  animator: {
    pageLoader: '',
  },
  error: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      LocalStorageManager.setUser(action.payload.token, {
        email: action.payload.user.email,
        firstName: action.payload.user.first_name,
        lastName: action.payload.user.last_name,
        username: action.payload.user.username,
      });
      return state
        .set('status', 'in')
        .set('jwt', action.payload.token)
        .mergeDeep({
          user: {
            email: action.payload.user.email,
            firstName: action.payload.user.first_name,
            lastName: action.payload.user.last_name,
            username: action.payload.user.username,
          },
        });
    case LOGOUT:
      LocalStorageManager.removeUser();
      return state.set('status', 'out');
    case JOIN:
      return state;
    case FETCH_ERROR:
      return state.update('error', () => action.payload.message);
    case SOCIAL_LOGIN:
      return state;
    case FIRST_VIEW_LOADED:
      return state.set('firstViewLoaded', true);
    case ANIMATOR_UPDATE:
      return state.mergeDeep({
        animator: action.payload,
      });
    default:
      return state;
  }
}

export default appReducer;
