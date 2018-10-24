import React from 'react';
import { PropTypes } from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import WaitingWrapper from 'components/WaitingWrapper';
import Menu from 'components/Menu';
import Algos from 'components/Algos';
import Modals from 'components/Modals';
import ExperimentsHeader from 'components/ExperimentsHeader';
import TrialsBoard from 'components/TrialsBoard';
import ExperimentsBoard from 'components/ExperimentsBoard';
import {
  makeSelectStatus,
  makeSelectJwt,
  makeSelectUserInfos,
} from 'containers/App/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import LocalStorageManager from 'utils/localStorageManager';
import theme from 'themeConfig';
import { verifyUser } from 'containers/App/actions';
import {
  logout,
  toggleMenu,
  fetchExperiments,
  createExperiment,
  deleteExperiment,
  fetchAlgos,
  createAlgo,
  updateAlgo,
  deleteAlgo,
  fetchTrials,
  changeSelectedExperiment,
  changeSelectedMetrics,
  filterChange,
  selectedHyperParameterChange,
  toggleModal,
  chartPointSelect,
} from './actions';
import {
  makeSelectMenuState,
  makeSelectExperiments,
  makeSelectFilters,
  makeSelectModalStates,
  makeSelectChartSelectedPoint,
  makeSelectFetching,
} from './selectors';
import saga from './saga';
import reducer from './reducer';

const DashboardView = styled.div`
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
    .board {
      min-height: 500px;
      background-color: white;
      margin: 20px;
      display: flex;
      flex-direction: row;
      flex-grow: 1;
      box-shadow: ${theme.secondaryShadow};
      position: relative;
      .trials-board {
        flex-grow: 1;
      }
    }
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    const token = LocalStorageManager.getUser();
    setTimeout(() => {
      this.props.verifyUser(token);
    }, 2000);
  }

  componentDidUpdate(prevProps) {
    if (this.props.status === 'in' && !this.props.experiments.loaded) {
      this.props.fetchExperiments(this.props.jwt, this.props.user.username);
    }
    if (
      this.props.experiments.selected !== '' &&
      prevProps.experiments.selected !== this.props.experiments.selected &&
      !this.props.experiments.list[this.props.experiments.selected].algos.loaded
    ) {
      this.props.fetchAlgos(this.props.jwt, this.props.experiments.selected);
      this.props.fetchTrials(
        this.props.jwt,
        this.props.experiments.selected,
        this.props.filters,
      );
    }
    if (
      JSON.stringify(prevProps.filters) !== JSON.stringify(this.props.filters)
    ) {
      this.props.fetchTrials(
        this.props.jwt,
        this.props.experiments.selected,
        this.props.filters,
      );
    }
  }

  render() {
    if (this.props.status === 'out') {
      return <Redirect to="/" />;
    }
    const condition =
      this.props.experiments.selected !== '' &&
      this.props.experiments.list[this.props.experiments.selected].algos.loaded;
    return (
      <WaitingWrapper
        timeout={1000}
        show={this.props.status === 'waiting' || !this.props.experiments.loaded}
      >
        <DashboardView>
          <Menu
            onLogout={this.props.onLogout}
            visible={this.props.menuState}
            toggle={this.props.onToggleMenu}
            fetching={this.props.fetching}
          />
          <div className="dashboard-container">
            <ExperimentsHeader
              experiments={this.props.experiments}
              resetSelected={() => this.props.onExperimentChangeSelected('')}
            />
            {condition ? (
              <div className="board">
                <TrialsBoard
                  onFilterChange={this.props.onFilterChange}
                  onSelectedHyperParameterChange={
                    this.props.onSelectedHyperParameterChange
                  }
                  experiment={
                    this.props.experiments.list[this.props.experiments.selected]
                  }
                  filters={this.props.filters}
                  chartSelectedPoint={this.props.chartSelectedPoint}
                  onChartPointSelect={this.props.onChartPointSelect}
                  onChangeSelectedMetrics={this.props.onChangeSelectedMetrics}
                />
                <Algos
                  algos={
                    this.props.experiments.list[this.props.experiments.selected]
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
                      this.props.experiments.selected,
                    )
                  }
                />
              </div>
            ) : (
              <div className="board">
                <ExperimentsBoard
                  changeActiveExperiment={this.props.onExperimentChangeSelected}
                  openExperimentModal={() =>
                    this.props.toggleModal('experimentCreate')
                  }
                  experiments={this.props.experiments.list}
                  onRemoveExperiment={id =>
                    this.props.onRemoveExperiment(this.props.jwt, id)
                  }
                />
              </div>
            )}
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
                this.props.experiments.selected,
                this.props.user.username,
              )
            }
            onUpdateAlgo={data => {
              this.props.onUpdateAlgo(
                this.props.jwt,
                data,
                this.props.experiments.selected,
                this.props.user.username,
              );
            }}
          />
        </DashboardView>
      </WaitingWrapper>
    );
  }
}

Dashboard.displayName = 'Dashboard';
Dashboard.propTypes = {
  status: PropTypes.string,
  jwt: PropTypes.string,
  experiments: PropTypes.object,
  verifyUser: PropTypes.func,
  onLogout: PropTypes.func,
  onToggleMenu: PropTypes.func,
  toggleModal: PropTypes.func,
  fetchExperiments: PropTypes.func,
  onCreateExperiment: PropTypes.func,
  fetchAlgos: PropTypes.func,
  onCreateAlgo: PropTypes.func,
  onUpdateAlgo: PropTypes.func,
  fetchTrials: PropTypes.func,
  onExperimentChangeSelected: PropTypes.func,
  onRemoveExperiment: PropTypes.func,
  onRemoveAlgo: PropTypes.func,
  onFilterChange: PropTypes.func,
  menuState: PropTypes.bool,
  user: PropTypes.object,
  filters: PropTypes.object,
  modalStates: PropTypes.object,
  chartSelectedPoint: PropTypes.number,
  onChartPointSelect: PropTypes.func,
  onSelectedHyperParameterChange: PropTypes.func,
  onChangeSelectedMetrics: PropTypes.func,
  fetching: PropTypes.array,
};

export function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logout()),
    onToggleMenu: () => dispatch(toggleMenu()),
    verifyUser: token => dispatch(verifyUser(token)),
    fetchExperiments: (jwt, user) => dispatch(fetchExperiments(jwt, user)),
    onCreateExperiment: (jwt, data, owner) =>
      dispatch(createExperiment(jwt, data, owner)),
    fetchAlgos: (jwt, experiment) => dispatch(fetchAlgos(jwt, experiment)),
    onCreateAlgo: (jwt, data, experiment, user) =>
      dispatch(createAlgo(jwt, data, experiment, user)),
    onUpdateAlgo: (jwt, data, experiment, user) =>
      dispatch(updateAlgo(jwt, data, experiment, user)),
    fetchTrials: (jwt, experiment, filters) =>
      dispatch(fetchTrials(jwt, experiment, filters)),
    onExperimentChangeSelected: val => dispatch(changeSelectedExperiment(val)),
    onRemoveExperiment: (jwt, id) => dispatch(deleteExperiment(jwt, id)),
    onRemoveAlgo: (jwt, id, experiment) =>
      dispatch(deleteAlgo(jwt, id, experiment)),
    onFilterChange: data => dispatch(filterChange(data)),
    onSelectedHyperParameterChange: (experiment, metric) =>
      dispatch(selectedHyperParameterChange(experiment, metric)),
    toggleModal: (modal, meta) => dispatch(toggleModal(modal, meta)),
    onChartPointSelect: point => dispatch(chartPointSelect(point)),
    onChangeSelectedMetrics: data => dispatch(changeSelectedMetrics(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  status: makeSelectStatus(),
  jwt: makeSelectJwt(),
  fetching: makeSelectFetching(),
  menuState: makeSelectMenuState(),
  experiments: makeSelectExperiments(),
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

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
