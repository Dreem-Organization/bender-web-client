import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import AlgoTile from 'components/AlgoTile';
import ResultTile from 'components/ResultTile';
import Button from 'components/Button';
import RankTile from 'components/RankTile';
import Label from 'components/Label';
import StyledRankingBoard from './style';

function RankingBoard(props) {
  const getBestTrial = (trials, algo, metric) => {
    let ret = trials[0];
    let max = trials[0].results[metric.metric_name];
    let min = trials[0].results[metric.metric_name];
    trials.forEach(t => {
      if (metric.type === 'reward' && t.results[metric.metric_name] > max) {
        ret = t;
        max = t.results[metric.metric_name];
      } else if (
        metric.type === 'loss' &&
        t.results[metric.metric_name] < min
      ) {
        ret = t;
        min = t.results[metric.metric_name];
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
  ranking.sort(
    (a, b) =>
      b.trial.results[b.metric.metric_name] -
      a.trial.results[a.metric.metric_name],
  );
  ranking = ranking.concat(unranked);
  return (
    <StyledRankingBoard className="ranking-board" {...props}>
      <div className="ranking-board-container">
        <div className="ranking-board-head">
          <Label
            size="tiny"
            className="label ranking-board-rank"
            content="RANK"
            theme={props.theme}
          />
          <Label
            size="tiny"
            className="label ranking-board-algo"
            content="ALGO"
            theme={props.theme}
          />
          {props.experiment.metrics.map((m, i) => (
            <div className="ranking-board-listing" key={`board-listing-${i}`}>
              <Label
                size="tiny"
                className="label"
                type={
                  m.metric_name === props.experiment.rankBy.metric_name
                    ? 'important'
                    : ''
                }
                content={m.metric_name.replace(new RegExp('_', 'g'), ' ')}
                onClick={() => props.onRankByChange(m, props.experiment.id)}
                key={`head-${i}`}
                theme={props.theme}
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
                theme={props.theme}
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
                theme={props.theme}
              />
              {props.experiment.metrics.map((m, j) => (
                <ResultTile
                  content={
                    ranked.trial
                      ? ranked.trial.results[m.metric_name].toFixed(2)
                      : '--'
                  }
                  metric={m}
                  trial={ranked.trial}
                  rankBy={props.experiment.rankBy.metric_name}
                  key={`metric-value-${j}`}
                  onOpenHpModal={props.onOpenHpModal}
                  theme={props.theme}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="ranking-board-add-algo">
        <Button
          className="spec"
          type="round"
          icon="add_circle_outline"
          color="positive"
          onClick={props.openCreateAlgoModal}
          theme={props.theme}
        />
      </div>
    </StyledRankingBoard>
  );
}

RankingBoard.propTypes = {
  theme: PropTypes.object,
  experiment: PropTypes.object.isRequired,
  onRankByChange: PropTypes.func.isRequired,
  onRemoveAlgo: PropTypes.func.isRequired,
  openUpdateAlgoModal: PropTypes.func.isRequired,
  openCreateAlgoModal: PropTypes.func.isRequired,
  onOpenHpModal: PropTypes.func.isRequired,
};

RankingBoard.defaultProps = {
  theme,
};

export default RankingBoard;
