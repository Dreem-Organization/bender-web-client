import { createSelector } from 'reselect';

const selectDashboard = state => state.get('dashboard');

const makeSelectDashboardErrors = () =>
  createSelector(selectDashboard, dashboardState =>
    dashboardState.get('error'),
  );

const makeSelectFetching = () =>
  createSelector(selectDashboard, dashboardState =>
    dashboardState.get('fetching').toJS(),
  );

const makeSelectMenuState = () =>
  createSelector(selectDashboard, dashboardState =>
    dashboardState.get('menuState'),
  );

const makeSelectStage = () =>
  createSelector(selectDashboard, dashboardState =>
    dashboardState.get('stage').toJS(),
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
  makeSelectStage,
  makeSelectFetching,
  makeSelectDashboardErrors,
  makeSelectMenuState,
  makeSelectExperiments,
  makeSelectFilters,
  makeSelectModalStates,
  makeSelectChartSelectedPoint,
};
