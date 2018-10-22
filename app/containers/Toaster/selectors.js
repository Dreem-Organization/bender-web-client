import { createSelector } from 'reselect';

const selectToaster = state => state.get('toaster');

const makeSelectToasts = () =>
  createSelector(selectToaster, toasterState =>
    toasterState.get('toasts').toJS(),
  );

export { makeSelectToasts };
