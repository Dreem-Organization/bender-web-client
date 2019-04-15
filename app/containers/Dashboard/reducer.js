import { fromJS } from 'immutable';
import LocalStorageManager from 'utils/localStorageManager';
import {
  LOAD_FRESH_CONTENT,
  TOGGLE_MENU,
  STAGE_UPDATE,
  FEED_EXPERIMENTS,
  DELETE_EXPERIMENT,
  CREATE_EXPERIMENT,
  CHANGE_SELECTED_EXPERIMENT,
  FEED_ALGOS,
  DELETE_ALGO,
  CREATE_ALGO,
  UPDATE_ALGO,
  FEED_TRIALS,
  CHANGE_FILTERS,
  CHANGE_SELECTED_HYPER_PARAMETER,
  TOGGLE_MODAL,
  CHANGE_RANK_BY,
  CHART_POINT_SELECT,
  ADD_SELECTED_METRIC,
  REMOVE_SELECTED_METRIC,
  FETCH_ERROR,
  SET_IS_FETCHING,
  CONTACT_SENT,
} from './constants';
// FIXME: action from other container had to be imported,
// the structure should probably be reviewed
import { LOGOUT } from '../App/constants';

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
  stage: [{ layer: 0, exp: '', algo: '' }],
  chartSelectedPoint: null,
  error: null,
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT:
      return initialState;
    case LOAD_FRESH_CONTENT:
      return state.setIn(['experiments', 'loaded'], false);
    case TOGGLE_MENU:
      return state.update('menuState', val => !val);
    case CHANGE_RANK_BY:
      return state.setIn(
        ['experiments', 'list', action.meta, 'rankBy'],
        action.payload,
      );
    case STAGE_UPDATE:
      LocalStorageManager.setStage(action.payload);
      return state.updateIn(['stage'], arr => arr.unshift(action.payload));
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
            rankBy: action.payload.metrics[0],
            selectedMetrics: [action.payload.metrics[0]],
            dataset_parameters: {},
            selectedHyperParameter: 'time',
            trials: {
              loaded: false,
              list: [],
            },
          }),
        )
        .set(
          'modals',
          fromJS({
            open: false,
            name: '',
            meta: null,
          }),
        )
        .updateIn(['fetching'], arr => arr.pop());
    case CHANGE_SELECTED_EXPERIMENT:
      return state.mergeDeep({ experiments: { selected: action.payload } });
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
        .set(
          'modals',
          fromJS({
            open: false,
            name: '',
            meta: null,
          }),
        )
        .updateIn(['fetching'], arr => arr.pop());
    case UPDATE_ALGO:
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
        .set(
          'modals',
          fromJS({
            open: false,
            name: '',
            meta: null,
          }),
        )
        .updateIn(['fetching'], arr => arr.pop());
    case FEED_TRIALS:
      return state
        .setIn(['experiments', 'list', action.meta, 'trials'], action.payload)
        .setIn(
          ['experiments', 'list', action.meta, 'hyperParametersAvailables'],
          action.hyperParameters,
        )
        .updateIn(['fetching'], arr => arr.pop());
    case CHANGE_FILTERS:
      return state
        .set('chartSelectedPoint', null)
        .updateIn(
          ['experiments', 'list', action.payload.exp, 'filters'],
          () => action.payload.data,
        );
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
          .some(m => action.payload.metric_name === m.toJS().metric_name)
      ) {
        return state.updateIn(
          ['experiments', 'list', action.meta, 'selectedMetrics'],
          arr => arr.push(fromJS(action.payload)),
        );
      }
      return state;
    case CONTACT_SENT:
      return state.set(
        'modals',
        fromJS({
          open: false,
          name: '',
          meta: null,
        }),
      );
    case REMOVE_SELECTED_METRIC:
      if (
        state
          .getIn(['experiments', 'list', action.meta, 'selectedMetrics'])
          .some(m => action.payload.metric_name === m.toJS().metric_name)
      ) {
        return state.updateIn(
          ['experiments', 'list', action.meta, 'selectedMetrics'],
          arr =>
            arr.splice(
              arr.findIndex(
                m => action.payload.metric_name === m.toJS().metric_name,
              ),
              1,
            ),
        );
      }
      return state;
    default:
      return state;
  }
}

export default dashboardReducer;
