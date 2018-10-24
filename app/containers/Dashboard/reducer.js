import { fromJS } from 'immutable';
// import LocalStorageManager from 'utils/localStorageManager';
import {
  TOGGLE_MENU,
  FEED_EXPERIMENTS,
  DELETE_EXPERIMENT,
  CREATE_EXPERIMENT,
  CHANGE_SELECTED_EXPERIMENT,
  FEED_ALGOS,
  DELETE_ALGO,
  CREATE_ALGO,
  FEED_TRIALS,
  CHANGE_FILTERS,
  CHANGE_SELECTED_HYPER_PARAMETER,
  TOGGLE_MODAL,
  CHART_POINT_SELECT,
  ADD_SELECTED_METRIC,
  REMOVE_SELECTED_METRIC,
  FETCH_ERROR,
  SET_IS_FETCHING,
} from './constants';

export const initialState = fromJS({
  experiments: {
    loaded: false,
    selected: '',
    list: {},
  },
  filters: {
    algo: 'all',
    order: 'date',
    sort: 'asc',
    limit: '10',
  },
  modals: {
    open: false,
    name: '',
    meta: null,
  },
  fetching: [],
  menuState: true,
  chartSelectedPoint: -1,
  error: null,
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MENU:
      return state.update('menuState', val => !val);
    case SET_IS_FETCHING:
      return state.updateIn(['fetching'], arr => arr.push(action.payload));
    case FETCH_ERROR:
      return state
        .update('error', () => action.payload.message)
        .updateIn(['fetching'], arr => arr.pop());
    case TOGGLE_MODAL:
      return state.set(
        'modals',
        fromJS({
          open: !state.getIn(['modals', 'open']),
          name: action.payload,
          meta: action.meta,
        }),
      );
    case FEED_EXPERIMENTS:
      return state
        .mergeDeep({
          experiments: {
            loaded: true,
            selected:
              Object.keys(action.payload).length > 0
                ? Object.keys(action.payload)[0]
                : null,
            list: action.payload,
          },
        })
        .updateIn(['fetching'], arr => arr.pop());
    case DELETE_EXPERIMENT:
      return state
        .removeIn(['experiments', 'list', action.payload])
        .updateIn(['fetching'], arr => arr.pop());
    case CREATE_EXPERIMENT:
      return state
        .setIn(
          ['experiments', 'list', action.payload.id],
          fromJS({
            ...action.payload,
            shared_with: [],
            algos: {
              loaded: false,
              list: {},
            },
            hyperParametersAvailables: [],
            owner: action.meta,
            participants: [[action.meta]],
            algo_count: 0,
            trial_count: 0,
            selectedMetrics: [action.payload.metrics[0]],
            dataset_parameters: {},
            selectedHyperParameter: 'time',
            trials: {
              loaded: false,
              list: [],
            },
          }),
        )
        .updateIn(['fetching'], arr => arr.pop());
    case CHANGE_SELECTED_EXPERIMENT:
      return state
        .set('chartSelectedPoint', -1)
        .mergeDeep({ experiments: { selected: action.payload } })
        .updateIn(['fetching'], arr => arr.pop());
    case FEED_ALGOS:
      return state
        .mergeDeep({ experiments: { list: action.payload } })
        .updateIn(['fetching'], arr => arr.pop());
    case DELETE_ALGO:
      return state
        .removeIn([
          'experiments',
          'list',
          action.meta,
          'algos',
          'list',
          action.payload,
        ])
        .updateIn(['fetching'], arr => arr.pop());
    case CREATE_ALGO:
      return state
        .setIn(
          [
            'experiments',
            'list',
            action.payload.experiment,
            'algos',
            'list',
            action.payload.id,
          ],
          {
            trial_count: 0,
            owner: action.meta,
            ...action.payload,
          },
        )
        .updateIn(['fetching'], arr => arr.pop());
    case FEED_TRIALS:
      return state
        .setIn(
          ['experiments', 'list', action.meta, 'trials', 'list'],
          action.payload,
        )
        .setIn(
          ['experiments', 'list', action.meta, 'hyperParametersAvailables'],
          action.hyperParameters,
        )
        .updateIn(['fetching'], arr => arr.pop());
    case CHANGE_FILTERS:
      return state
        .set('chartSelectedPoint', -1)
        .mergeDeep({ filters: action.payload });
    case CHANGE_SELECTED_HYPER_PARAMETER:
      return state.setIn(
        [
          'experiments',
          'list',
          action.payload.experiment,
          'selectedHyperParameter',
        ],
        action.payload.metric,
      );
    case CHART_POINT_SELECT:
      return state.set('chartSelectedPoint', action.payload);
    case ADD_SELECTED_METRIC:
      if (
        !state
          .getIn(['experiments', 'list', action.meta, 'selectedMetrics'])
          .includes(action.payload)
      ) {
        return state.updateIn(
          ['experiments', 'list', action.meta, 'selectedMetrics'],
          arr => arr.push(action.payload),
        );
      }
      return state;
    case REMOVE_SELECTED_METRIC:
      if (
        state
          .getIn(['experiments', 'list', action.meta, 'selectedMetrics'])
          .includes(action.payload)
      ) {
        return state.updateIn(
          ['experiments', 'list', action.meta, 'selectedMetrics'],
          arr => arr.splice(arr.indexOf(action.payload), 1),
        );
      }
      return state;
    default:
      return state;
  }
}

export default dashboardReducer;
