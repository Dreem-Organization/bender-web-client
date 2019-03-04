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
  VALID_COOKIES_USAGE,
  LOAD_COOKIES_PERMISSIONS,
} from './constants';

export const initialState = fromJS({
  status: 'waiting',
  jwt: '',
  firstViewLoaded: false,
  user: {
    email: '',
    username: '',
    id: '',
  },
  theme: light,
  animator: {
    pageLoader: '',
  },
  cookiesUsage: null,
  error: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COOKIES_PERMISSIONS:
      return state.set('cookiesUsage', LocalStorageManager.getCookieUsage());
    case LOGIN:
      LocalStorageManager.setUser(action.payload.token, {
        email: action.payload.user.email,
        username: action.payload.user.username,
        pk: action.payload.user.pk,
      });
      return state
        .set('status', 'in')
        .set('jwt', action.payload.token)
        .set('theme', fromJS(LocalStorageManager.getTheme()))
        .mergeDeep({
          user: {
            email: action.payload.user.email,
            username: action.payload.user.username,
            pk: action.payload.user.pk,
          },
        });
    case LOGOUT:
      LocalStorageManager.removeUser();
      return initialState
        .set('status', 'out')
        .set('cookiesUsage', state.get('cookiesUsage'));
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
    case VALID_COOKIES_USAGE:
      LocalStorageManager.setCookieUsage();
      return state.set('cookiesUsage', true);
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
