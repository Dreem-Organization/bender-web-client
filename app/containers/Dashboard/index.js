import React from 'react';
import { PropTypes } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { CSSTransitionGroup } from 'react-transition-group';
import WaitingWrapper from 'components/WaitingWrapper';
import Menu from 'components/Menu';
import Board from 'components/Board';
import Modals from 'components/Modals';
import ExperimentsHeader from 'components/ExperimentsHeader';
import {
  makeSelectStatus,
  makeSelectJwt,
  makeSelectUserInfos,
  makeSelectTheme,
} from 'containers/App/selectors';
import reducerApp from 'containers/App/reducer';
import sagaApp from 'containers/App/saga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import LocalStorageManager from 'utils/localStorageManager';
import ReactGA from 'react-ga';
import { verifyUser, toggleTheme } from 'containers/App/actions';
import {
  loadFreshContent,
  logout,
  toggleMenu,
  stageUpdate,
  fetchExperiments,
  createExperiment,
  deleteExperiment,
  fetchAlgos,
  createAlgo,
  updateAlgo,
  deleteAlgo,
  fetchTrials,
  changeSelectedMetrics,
  filterChange,
  selectedHyperParameterChange,
  changeRankBy,
  toggleModal,
  chartPointSelect,
  contact,
  confirmChoice,
} from './actions';
import {
  makeSelectMenuState,
  makeSelectStage,
  makeSelectExperiments,
  makeSelectFilters,
  makeSelectModalStates,
  makeSelectChartSelectedPoint,
  makeSelectFetching,
} from './selectors';
import saga from './saga';
import reducer from './reducer';

const DashboardView = styled.div`
  background-color: ${props => props.theme.pageBackground};
  transition: 0.3s;
  display: flex;
  .dashboard-container,
  .sub-container {
    display: flex;
    flex-direction: column;
  }
  .dashboard-container {
    height: 100vh;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    .boards {
      position: relative;
      flex-grow: 1;
      display: flex;
      flex-direction: row;
    }
  }
`;

const BoardWrapper = styled.div`
  position: relative;
  margin: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
`;

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    const token = LocalStorageManager.getUser();
    const stageData = LocalStorageManager.getStage();
    if (stageData) {
      this.props.onStageUpdate(stageData.stage);
    }
    this.props.verifyUser(token);
    ReactGA.initialize('UA-130808639-1');
    ReactGA.pageview('dashboard');
  }

  componentDidUpdate() {
    if (this.props.status === 'in' && !this.props.experiments.loaded) {
      this.props.fetchExperiments(this.props.jwt, this.props.user.username);
    }
    if (
      this.props.experiments.loaded &&
      this.props.stage[0].exp !== '' &&
      !this.props.experiments.list[this.props.stage[0].exp].algos.loaded
    ) {
      this.props.fetchAlgos(this.props.jwt, this.props.stage[0].exp);
      this.props.fetchTrials(
        this.props.jwt,
        this.props.stage[0].exp,
        this.props.filters,
      );
    }
  }

  render() {
    if (this.props.status === 'out') {
      return <Redirect to="/" />;
    }
    const currentStageState = this.props.stage[0].layer;
    const prevStageState = this.props.stage[1] ? this.props.stage[1].layer : -1;
    return (
      <WaitingWrapper
        timeout={1000}
        show={this.props.status === 'waiting'}
        theme={this.props.theme}
      >
        <DashboardView theme={this.props.theme}>
          <Menu
            onLogout={this.props.onLogout}
            visible={this.props.menuState}
            toggle={this.props.onToggleMenu}
            fetching={this.props.fetching}
            onOpenProfile={() => this.props.toggleModal('profile')}
            onOpenContact={() => this.props.toggleModal('contact')}
            theme={this.props.theme}
          />
          <div className="dashboard-container">
            <ExperimentsHeader
              stage={this.props.stage[0]}
              experiments={this.props.experiments}
              stageUpdate={data => this.props.onStageUpdate(data)}
              theme={this.props.theme}
            />
            {/* <Algos
              algos={
                this.props.experiments.list[this.props.stage[0].exp]
                  .algos
              }
              openAlgoModal={() => this.props.toggleModal('algoCreate')}
              openUpdateAlgoModal={meta =>
                this.props.toggleModal('algoUpdate', meta)
              }
              onRemoveAlgo={id =>
                this.props.onRemoveAlgo(
                  this.props.jwt,
                  id,
                  this.props.stage[0].exp,
                )
              }
            /> */}
            <div className="boards">
              <CSSTransitionGroup
                transitionName={
                  currentStageState > prevStageState
                    ? 'slide-prev'
                    : 'slide-next'
                }
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
                component={BoardWrapper}
              >
                <Board key={this.props.stage[0].layer} {...this.props} />
              </CSSTransitionGroup>
            </div>
          </div>
          <Modals
            onClose={() => this.props.toggleModal('')}
            modalStates={this.props.modalStates}
            onCreateExperiment={data =>
              this.props.onCreateExperiment(
                this.props.jwt,
                data,
                this.props.user.username,
              )
            }
            onCreateAlgo={data =>
              this.props.onCreateAlgo(
                this.props.jwt,
                data,
                this.props.stage[0].exp,
                this.props.user.username,
              )
            }
            onUpdateAlgo={data => {
              this.props.onUpdateAlgo(
                this.props.jwt,
                data,
                this.props.stage[0].exp,
                this.props.user.username,
              );
            }}
            onContact={data => this.props.onContact(this.props.jwt, data)}
            onToggleTheme={this.props.toggleTheme}
            onConfirmChoice={this.props.onConfirmChoice}
            user={this.props.user}
            theme={this.props.theme}
          />
        </DashboardView>
      </WaitingWrapper>
    );
  }
}

Dashboard.displayName = 'Dashboard';
Dashboard.propTypes = {
  theme: PropTypes.object,
  loadFreshContent: PropTypes.func,
  status: PropTypes.string,
  jwt: PropTypes.string,
  experiments: PropTypes.object,
  verifyUser: PropTypes.func,
  onLogout: PropTypes.func,
  onToggleMenu: PropTypes.func,
  onStageUpdate: PropTypes.func,
  toggleModal: PropTypes.func,
  fetchExperiments: PropTypes.func,
  onCreateExperiment: PropTypes.func,
  fetchAlgos: PropTypes.func,
  onCreateAlgo: PropTypes.func,
  onUpdateAlgo: PropTypes.func,
  onContact: PropTypes.func,
  fetchTrials: PropTypes.func,
  onRemoveExperiment: PropTypes.func,
  onRemoveAlgo: PropTypes.func,
  onFilterChange: PropTypes.func,
  onRankByChange: PropTypes.func,
  menuState: PropTypes.bool,
  stage: PropTypes.array,
  user: PropTypes.object,
  filters: PropTypes.object,
  modalStates: PropTypes.object,
  chartSelectedPoint: PropTypes.number,
  onChartPointSelect: PropTypes.func,
  onSelectedHyperParameterChange: PropTypes.func,
  onChangeSelectedMetrics: PropTypes.func,
  fetching: PropTypes.array,
  onConfirmChoice: PropTypes.func,
  toggleTheme: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    loadFreshContent: () => dispatch(loadFreshContent()),
    onLogout: () => dispatch(logout()),
    onToggleMenu: () => dispatch(toggleMenu()),
    onStageUpdate: stage => dispatch(stageUpdate(stage)),
    verifyUser: token => dispatch(verifyUser(token)),
    fetchExperiments: (jwt, user) => dispatch(fetchExperiments(jwt, user)),
    onCreateExperiment: (jwt, data, owner) =>
      dispatch(createExperiment(jwt, data, owner)),
    fetchAlgos: (jwt, experiment) => dispatch(fetchAlgos(jwt, experiment)),
    onCreateAlgo: (jwt, data, experiment, user) =>
      dispatch(createAlgo(jwt, data, experiment, user)),
    onUpdateAlgo: (jwt, data, experiment, user) =>
      dispatch(updateAlgo(jwt, data, experiment, user)),
    onContact: (jwt, data) => dispatch(contact(jwt, data)),
    fetchTrials: (jwt, experiment, filters) =>
      dispatch(fetchTrials(jwt, experiment, filters)),
    onRemoveExperiment: (jwt, id) => dispatch(deleteExperiment(jwt, id)),
    onRemoveAlgo: (jwt, id, experiment) =>
      dispatch(deleteAlgo(jwt, id, experiment)),
    onFilterChange: data => dispatch(filterChange(data)),
    onSelectedHyperParameterChange: (experiment, metric) =>
      dispatch(selectedHyperParameterChange(experiment, metric)),
    onRankByChange: (metric, exp) => dispatch(changeRankBy(metric, exp)),
    toggleModal: (modal, meta) => dispatch(toggleModal(modal, meta)),
    onChartPointSelect: point => dispatch(chartPointSelect(point)),
    onChangeSelectedMetrics: data => dispatch(changeSelectedMetrics(data)),
    onConfirmChoice: status => dispatch(confirmChoice(status)),
    toggleTheme: theme => dispatch(toggleTheme(theme)),
  };
}

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
  jwt: makeSelectJwt(),
  fetching: makeSelectFetching(),
  stage: makeSelectStage(),
  menuState: makeSelectMenuState(),
  experiments: makeSelectExperiments(),
  theme: makeSelectTheme(),
  user: makeSelectUserInfos(),
  filters: makeSelectFilters(),
  modalStates: makeSelectModalStates(),
  chartSelectedPoint: makeSelectChartSelectedPoint(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });
const withReducerApp = injectReducer({ key: 'global', reducer: reducerApp });
const withSagaApp = injectSaga({ key: 'global', saga: sagaApp });

export default compose(
  withReducer,
  withReducerApp,
  withSagaApp,
  withSaga,
  withConnect,
)(Dashboard);
