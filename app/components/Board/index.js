import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import Title from 'components/Title';
import Icon from 'components/Icon';
import TrialsBoard from 'components/TrialsBoard';
import RankingBoard from 'components/RankingBoard';
import ExperimentsBoard from 'components/ExperimentsBoard';
import StyledBoard from './style';

function Board(props) {
  let name = '';
  const showExperimentBoardIf = props.experiments.loaded;
  const showRankBoardIf =
    props.experiments.loaded &&
    props.stage[0].exp !== '' &&
    props.experiments.list[props.stage[0].exp].algos.loaded &&
    props.experiments.list[props.stage[0].exp].trials.loaded;
  const showTrialsBoardIf =
    props.experiments.loaded &&
    props.stage[0].exp !== '' &&
    props.stage[0].algo !== '' &&
    props.experiments.list[props.stage[0].exp].algos.loaded &&
    props.experiments.list[props.stage[0].exp].trials.loaded;
  let displayedBoard = <div />;
  if (props.stage[0].layer === 0 && showExperimentBoardIf) {
    name = 'Experiments Board';
    displayedBoard = (
      <ExperimentsBoard
        stageUpdate={props.onStageUpdate}
        openExperimentModal={() => props.toggleModal('experimentCreate')}
        experiments={props.experiments.list}
        onRemoveExperiment={id => props.onRemoveExperiment(props.jwt, id)}
        theme={props.theme}
      />
    );
  } else if (props.stage[0].layer === 1 && showRankBoardIf) {
    name = 'Algorithms Ranking Board';
    displayedBoard = (
      <RankingBoard
        stageUpdate={props.onStageUpdate}
        experiment={props.experiments.list[props.stage[0].exp]}
        onRemoveAlgo={id =>
          props.onRemoveAlgo(props.jwt, id, props.stage[0].exp)
        }
        onRankByChange={props.onRankByChange}
        openCreateAlgoModal={() => props.toggleModal('algoCreate')}
        openUpdateAlgoModal={meta => props.toggleModal('algoUpdate', meta)}
        onOpenHpModal={meta => props.toggleModal('hp', meta)}
        theme={props.theme}
      />
    );
  } else if (props.stage[0].layer >= 2 && showTrialsBoardIf) {
    name = `${
      props.experiments.list[props.stage[0].exp].algos.list[props.stage[0].algo]
        .name
    } Trials Board`;
    displayedBoard = (
      <TrialsBoard
        onFilterChange={props.onFilterChange}
        onSelectedHyperParameterChange={props.onSelectedHyperParameterChange}
        experiment={props.experiments.list[props.stage[0].exp]}
        algo={
          props.experiments.list[props.stage[0].exp].algos.list[
            props.stage[0].algo
          ]
        }
        filters={props.filters}
        stage={props.stage[0]}
        chartSelectedPoint={props.chartSelectedPoint}
        onChartPointSelect={props.onChartPointSelect}
        onChangeSelectedMetrics={props.onChangeSelectedMetrics}
        theme={props.theme}
      />
    );
  }
  return (
    <StyledBoard className="board" {...props}>
      <div className={`board-title ${name !== '' ? 'loaded' : ''}`}>
        <Title content={name} theme={props.theme} />
        <Icon
          name="cached"
          onClick={props.loadFreshContent}
          className={`material-icons ${name !== '' ? 'inactive' : 'active'}`}
          theme={props.theme}
        />
      </div>
      {displayedBoard}
    </StyledBoard>
  );
}

Board.propTypes = {
  theme: PropTypes.object,
  loadFreshContent: PropTypes.func,
  jwt: PropTypes.string.isRequired,
  stage: PropTypes.array.isRequired,
  filters: PropTypes.object.isRequired,
  chartSelectedPoint: PropTypes.object,
  experiments: PropTypes.object.isRequired,
  onStageUpdate: PropTypes.func.isRequired,
  onRankByChange: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onRemoveExperiment: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSelectedHyperParameterChange: PropTypes.func.isRequired,
  onChartPointSelect: PropTypes.func.isRequired,
  onChangeSelectedMetrics: PropTypes.func.isRequired,
  onRemoveAlgo: PropTypes.func.isRequired,
};

Board.defaultProps = {
  theme,
};

export default Board;
