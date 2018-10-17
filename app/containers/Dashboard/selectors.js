import { createSelector } from 'reselect';

const selectDashboard = state => state.get('dashboard');

const makeSelectMenuState = () =>
  createSelector(selectDashboard, dashboardState =>
    dashboardState.get('menuState'),
  );

const makeSelectExperiments = () =>
  createSelector(selectDashboard, dashboardState =>
    dashboardState.get('experiments').toJS(),
  );

const makeSelectFilters = () =>
  createSelector(selectDashboard, dashboardState =>
    dashboardState.get('filters').toJS(),
  );

const makeSelectModalStates = () =>
  createSelector(selectDashboard, dashboardState =>
    dashboardState.get('modals').toJS(),
  );

const makeSelectChartSelectedPoint = () =>
  createSelector(selectDashboard, dashboardState =>
    dashboardState.get('chartSelectedPoint'),
  );

export {
  makeSelectMenuState,
  makeSelectExperiments,
  makeSelectFilters,
  makeSelectModalStates,
  makeSelectChartSelectedPoint,
};
