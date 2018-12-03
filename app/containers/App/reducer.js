import { fromJS } from 'immutable';
import LocalStorageManager from 'utils/localStorageManager';
import { light, dark } from 'themeConfig';
import {
  ANIMATOR_UPDATE,
  LOGOUT,
  FETCH_ERROR,
  LOGIN,
  SOCIAL_LOGIN,
  FIRST_VIEW_LOADED,
  TOGGLE_THEME,
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
  theme: light,
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
        .set('theme', fromJS(LocalStorageManager.getTheme()))
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
    case TOGGLE_THEME:
      LocalStorageManager.setTheme(
        action.payload.name === 'light' ? dark : light,
      );
      return state.set(
        'theme',
        fromJS(action.payload.name === 'light' ? dark : light),
      );
    default:
      return state;
  }
}

export default appReducer;
