import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');
const selectRoute = state => state.get('route');
const selectForm = state => state.get('form');

const selectCredentials = state => state.get('form').loginform.values;
// const selectTest = state => state.get('global').status;

const makeSelectGlobalErrors = () =>
  createSelector(selectGlobal, globalState => globalState.get('error'));

const makeSelectStatus = () =>
  createSelector(selectGlobal, globalState => globalState.get('status'));

const makeSelectJwt = () =>
  createSelector(selectGlobal, globalState => globalState.get('jwt'));

const makeSelectTheme = () =>
  createSelector(selectGlobal, globalState => globalState.get('theme').toJS());

const makeSelectUserInfos = () =>
  createSelector(selectGlobal, globalState => globalState.get('user').toJS());

const makeSelectCookiesUsage = () =>
  createSelector(selectGlobal, globalState => globalState.get('cookiesUsage'));

const makeSelectAnimator = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('animator').toJS(),
  );

const makeSelectFirstViewLoaded = () =>
  createSelector(selectGlobal, globalState =>
    globalState.get('firstViewLoaded'),
  );

const makeSelectForm = () =>
  createSelector(selectForm, formState => formState.get('loginform'));

const makeSelectLocation = () =>
  createSelector(selectRoute, routeState => routeState.get('location').toJS());

export {
  makeSelectGlobalErrors,
  makeSelectAnimator,
  makeSelectJwt,
  makeSelectStatus,
  makeSelectTheme,
  makeSelectUserInfos,
  selectCredentials,
  makeSelectLocation,
  makeSelectForm,
  makeSelectFirstViewLoaded,
  makeSelectCookiesUsage,
};
