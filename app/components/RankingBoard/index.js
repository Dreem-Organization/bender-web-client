import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import AlgoTile from 'components/AlgoTile';
import Title from 'components/Title';
import Button from 'components/Button';
import RankTile from 'components/RankTile';
import Label from 'components/Label';
import StyledRankingBoard from './style';

function RankingBoard(props) {
  const getBestTrial = (trials, algo, metric) => {
    let ret = null;
    let max = -1000;
    trials.forEach(t => {
      if (t.results[metric] > max) {
        ret = t;
        max = t.results[metric];
      }
    });
    return { algo, trial: ret, metric };
  };
  let ranking = [];
  const unranked = [];
  Object.values(props.experiment.algos.list).forEach(a => {
    if (props.experiment.trials.list[a.id]) {
      ranking.push(
        getBestTrial(
          props.experiment.trials.list[a.id],
          a,
          props.experiment.rankBy,
        ),
      );
    } else {
      unranked.push({ algo: a, trial: null, metric: props.experiment.rankBy });
    }
  });
  ranking.sort((a, b) => b.trial.results[b.metric] - a.trial.results[a.metric]);
  ranking = ranking.concat(unranked);
  return (
    <StyledRankingBoard className="ranking-board" {...props}>
      <div className="ranking-board-container">
        <div className="ranking-board-head">
          <Label
            size="tiny"
            className="label ranking-board-rank"
            content="RANK"
          />
          <Label
            size="tiny"
            className="label ranking-board-algo"
            content="ALGO"
          />
          {props.experiment.metrics.map((m, i) => (
            <div className="ranking-board-listing" key={`board-listing-${i}`}>
              <Label
                size="tiny"
                className="label"
                type={
                  m.metric_name === props.experiment.rankBy ? 'important' : ''
                }
                content={m.metric_name.replace(new RegExp('_', 'g'), ' ')}
                key={`head-${i}`}
              />
            </div>
          ))}
        </div>
        <div className="ranking-board-list">
          {ranking.map((ranked, i) => (
            <div className="ranking-board-list-elem" key={`list-elem-${i}`}>
              <RankTile
                className="rank-tile ranking-board-rank"
                rank={ranked.trial ? (i + 1).toString() : '?'}
              />
              <AlgoTile
                className="tile ranking-board-algo"
                algo={ranked.algo}
                onUpdateAlgo={props.openUpdateAlgoModal}
                onRemoveAlgo={props.onRemoveAlgo}
                onVisualizeTrials={(algo, isLine) =>
                  props.stageUpdate({
                    layer: isLine ? 2 : 3,
                    exp: props.experiment.id,
                    algo,
                  })
                }
              />
              {props.experiment.metrics.map((m, j) => (
                <Title
                  className={`tile stats ${
                    m.metric_name === props.experiment.rankBy ? '' : 'inactive'
                  }`}
                  content={
                    ranked.trial
                      ? ranked.trial.results[m.metric_name].toFixed(2)
                      : '--'
                  }
                  key={`metric-value-${j}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Button
        className="spec"
        type="round"
        icon="add_circle_outline"
        color="positive"
        onClick={props.openCreateAlgoModal}
      />
    </StyledRankingBoard>
  );
}

RankingBoard.propTypes = {
  theme: PropTypes.object,
  experiment: PropTypes.object.isRequired,
  onRemoveAlgo: PropTypes.func.isRequired,
  openUpdateAlgoModal: PropTypes.func.isRequired,
  openCreateAlgoModal: PropTypes.func.isRequired,
};

RankingBoard.defaultProps = {
  theme,
};

export default RankingBoard;
