import React from 'react';
import PropTypes from 'prop-types';
import { light as theme } from 'themeConfig';
import Title from 'components/Title';
import LineChart from 'components/LineChart';
import ScatterChart from 'components/ScatterChart';
import Details from 'components/Details';
import StyledTrialsBoard from './style';

function TrialsBoard(props) {
  return (
    <StyledTrialsBoard className="trials-board" {...props}>
      {props.experiment.trials.list[props.stage.algo].length > 0 ? (
        <div className="trials-board-body-container">
          <div className="trials-board-graph-container">
            {props.stage.layer === 2 ? (
              <LineChart
                trials={props.experiment.trials.list[props.stage.algo]}
                experiment={props.experiment}
                filters={props.filters}
                onFilterChange={props.onFilterChange}
                stage={props.stage}
                onChartPointSelect={props.onChartPointSelect}
                onChangeSelectedMetrics={props.onChangeSelectedMetrics}
                theme={props.theme}
              />
            ) : (
              <ScatterChart
                trials={props.experiment.trials.list[props.stage.algo]}
                algo={props.experiment.algos.list[props.stage.algo]}
                experiment={props.experiment}
                stage={props.stage}
                onChartPointSelect={props.onChartPointSelect}
                theme={props.theme}
              />
            )}
          </div>
          <div className="trials-board-details-cointainer">
            <Details
              trials={props.experiment.trials.list[props.stage.algo]}
              selectedPoint={props.chartSelectedPoint}
              theme={props.theme}
            />
          </div>
        </div>
      ) : (
        <div className="trials-board-no-trials">
          <Title
            content="No trials for the moment !"
            size={5}
            theme={props.theme}
          />
        </div>
      )}
    </StyledTrialsBoard>
  );
}

TrialsBoard.propTypes = {
  theme: PropTypes.object,
  stage: PropTypes.object.isRequired,
  experiment: PropTypes.object,
  filters: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSelectedHyperParameterChange: PropTypes.func.isRequired,
  onChartPointSelect: PropTypes.func.isRequired,
  chartSelectedPoint: PropTypes.number.isRequired,
  onChangeSelectedMetrics: PropTypes.func.isRequired,
};

TrialsBoard.defaultProps = {
  theme,
};

export default TrialsBoard;
