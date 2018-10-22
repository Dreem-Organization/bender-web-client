/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import theme from 'themeConfig';
import Title from 'components/Title';
import Icon from 'components/Icon';
import Checkbox from 'components/Checkbox';
import Label from 'components/Label';
import Select from 'components/Select';
import Chart from 'components/Chart';
import Details from 'components/Details';
import StyledTrialsBoard from './style';

function TrialsBoard(props) {
  return (
    <StyledTrialsBoard className="trials-board" {...props}>
      <div className="trials-board-head-container">
        <Title content="Trials Board" size={2} />
      </div>
      <div className="trials-board-filters-container">
        <Icon name="filter_list" />
        <Label content="Filters :" size="tiny" type="important" />
        <div className="trials-board-filters">
          <Select
            onSelectionChange={val => props.onFilterChange({ algo: val })}
            selected="all"
            label="ALGOS"
            values={[{ id: 'all', label: 'All' }].concat(
              Object.values(props.experiment.algos.list).map(a => ({
                id: a.id,
                label: a.name,
              })),
            )}
          />
          <Select
            onSelectionChange={val => props.onFilterChange({ order: val })}
            selected="date"
            label="ORDER BY"
            values={[{ id: 'date', label: 'Date' }].concat(
              props.experiment.metrics.map(m => ({
                id: m,
                label: m,
              })),
            )}
          />
          <Select
            onSelectionChange={val => props.onFilterChange({ sort: val })}
            selected="asc"
            label="SORT BY"
            values={[{ id: 'asc', label: 'Asc' }, { id: 'dsc', label: 'Dsc' }]}
          />
          <Select
            onSelectionChange={val => props.onFilterChange({ limit: val })}
            selected="10"
            label="LIMIT"
            values={[
              { id: '10', label: '10' },
              { id: '20', label: '20' },
              { id: '30', label: '30' },
              { id: '40', label: '40' },
              { id: '50', label: '50' },
              { id: '100', label: '100' },
            ]}
          />
        </div>
      </div>
      {props.experiment.trials.list.length > 0 ? (
        <div className="trials-board-body-container">
          <div className="trials-board-graph-title-container">
            {/* {console.log(props.experiment.algos.list[props.filters.algo], props.filters.algo)} */}
            <Title
              content={
                props.filters.algo === 'all'
                  ? 'ALL'
                  : props.experiment.algos.list[props.filters.algo].name
              }
              size={5}
            />
            <Label
              content={`algo${props.filters.algo === 'all' ? 's' : ''}`}
              size="tiny"
              type="simple"
            />
            <Title
              content={
                props.filters.order === 'date' ? 'trials' : props.filters.order
              }
              size={5}
            />
            <Label content="over" size="tiny" type="simple" />
            <Title content={props.experiment.selectedHyperParameter} size={5} />
          </div>
          <div className="trials-board-graph-container">
            <Chart
              experiment={props.experiment}
              filters={props.filters}
              onChartPointSelect={props.onChartPointSelect}
            />
          </div>
          <div className="trials-board-visualize-container">
            <div className="trials-board-visualize-sub-container">
              <Icon name="visibility" />
              <Label content="Visualization :" size="tiny" type="important" />
              <Select
                onSelectionChange={val =>
                  props.onSelectedHyperParameterChange(props.experiment.id, val)
                }
                selected="all"
                label="X UNIT"
                values={[{ id: 'time', label: 'Time' }].concat(
                  props.filters.algo === 'all'
                    ? []
                    : props.experiment.hyperParametersAvailables.map(param => ({
                      id: param,
                      label: param,
                    })),
                )}
              />
              <div className="trials-board-checkboxes">
                {props.experiment.metrics.map(metric => (
                  <Checkbox
                    key={metric}
                    name={metric}
                    label={metric}
                    value={metric}
                    checked={props.experiment.selectedMetrics.includes(metric)}
                    onChange={() =>
                      props.onChangeSelectedMetrics({
                        action: props.experiment.selectedMetrics.includes(
                          metric,
                        )
                          ? 'remove'
                          : 'add',
                        metric,
                        experiment: props.experiment.id,
                      })
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="trials-board-details-cointainer">
            <Details
              trials={props.experiment.trials.list}
              selectedPoint={props.chartSelectedPoint}
            />
          </div>
        </div>
      ) : (
        <div className="trials-board-no-trials">
          <Title content="No trials for the moment !" size={5} />
        </div>
      )}
    </StyledTrialsBoard>
  );
}

TrialsBoard.propTypes = {
  theme: PropTypes.object,
  experiment: PropTypes.object.isRequired,
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
