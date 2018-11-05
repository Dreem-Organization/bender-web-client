import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from 'components/Label';
import Icon from 'components/Icon';
import Checkbox from 'components/Checkbox';
import Select from 'components/Select';
import theme from 'themeConfig';
import TimeAgo from 'react-timeago';
import _ from 'lodash';
import {
  ComposedChart,
  ResponsiveContainer,
  Area,
  Legend,
  CartesianGrid,
  Tooltip,
  YAxis,
} from 'recharts';
import StyledLineChart from './style';

const chartStyles = {
  fontSize: '12px',
  borderRadius: '5px',
  height: '250px',
  marginLeft: '10px',
  marginBottom: '20px',
  overflow: 'visible',
  position: 'relative',
  zIndex: 30,
};

const colorWheel = {
  0: '#108FE9',
  1: '#56B9FD',
  2: '#B69CFD',
  3: '#FFA2D6',
  4: '#FF999C',
};

export default class LineChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: Math.floor(Math.random() * Math.floor(1000)),
    };

    this.getLineData = this.getLineData.bind(this);
    this.getChart = this.getChart.bind(this);
    this.lineCustomTooltip = this.lineCustomTooltip.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(
        this.props.experiment.trials.list[this.props.stage.algo],
      ) !==
      JSON.stringify(prevProps.experiment.trials.list[this.props.stage.algo])
    ) {
      this.setState({
        key: Math.floor(Math.random() * Math.floor(1000)),
      });
    }
  }

  getLineData() {
    let data;
    if (this.props.experiment.selectedMetrics !== null) {
      data = _.chain(this.props.experiment.trials.list[this.props.stage.algo])
        .map(k => {
          const results = _.mapValues(k.results, r => _.round(r, 4));
          results.id = k.id;
          return results;
        })
        .reverse()
        .value();
    } else if (this.props.experiment.selectedHyperParameter !== null) {
      data = _(this.props.experiment.trials.list[this.props.stage.algo])
        .map(k => ({
          id: k.id,
          value: _.round(
            k.parameters[this.props.experiment.selectedHyperParameter],
            4,
          ),
        }))
        .reverse()
        .value();
    }
    return data;
  }

  generateTableData(obj) {
    return Object.keys(obj).map(k => {
      if (!_.isNull(obj[k]) || obj[k] === '') {
        return (
          <div className="data-table" key={k}>
            <Label className="left" content={k} type="simple" />
            <Label
              className="right"
              content={
                _.isNumber(obj[k])
                  ? _.round(+obj[k], 4).toString()
                  : obj[k].toString()
              }
            />
          </div>
        );
      }
      return null;
    });
  }

  generateTableMetrics(obj) {
    const metrics = this.props.experiment.metrics; // eslint-disable-line
    return metrics.map(k => {
      const id = metrics.indexOf(k) % _.size(colorWheel);
      if (!_.isNull(obj[k]) || obj[k] === '') {
        return (
          <div className="data-table" key={k}>
            <div className="left coloured">
              <div
                style={{
                  display: 'inline-block',
                  borderRadius: '50%',
                  marginRight: '5px',
                  width: '10px',
                  height: '10px',
                  backgroundColor: colorWheel[id],
                }}
              />
              <Label content={k} type="simple" />
            </div>
            <Label
              className="right"
              content={
                _.isNumber(obj[k])
                  ? _.round(+obj[k], 4).toString()
                  : obj[k].toString()
              }
            />
          </div>
        );
      }
      return null;
    });
  }

  lineCustomTooltip(item) {
    if (item.payload[0]) {
      const trial = this.props.experiment.trials.list[
        this.props.stage.algo
      ].filter(k => k.id === item.payload[0].payload.id)[0];
      return (
        <div className="custom-tooltip">
          <div className="custom-tooltip-header">
            <Label
              className="custom-tooltip-title"
              content={trial.algo_name}
              type="important"
              size="big"
            />
            <TimeAgo className="time-ago" date={trial.created} />
          </div>
          <div className="custom-tooltip-sub-container">
            <Label content="Metrics" type="important" />
            <div className="custom-tooltip-data-list">
              {this.generateTableMetrics(trial.results)}
            </div>
          </div>
          <div className="custom-tooltip-sub-container">
            <Label content="Parameters" type="important" />
            <div className="custom-tooltip-data-list">
              {this.generateTableData(trial.parameters)}
            </div>
          </div>
        </div>
      );
    }
    return '';
  }

  getChart() {
    const id = metric =>
      this.props.experiment.metrics.indexOf(metric) %
      Object.keys(colorWheel).length;
    if (this.props.experiment.selectedMetrics.length === 0) {
      return (
        <div className="chart-empty-container">
          <Label content="Uh, oh — looks like you haven't selected any metric to visualize yet." />
        </div>
      );
    }
    return (
      <ComposedChart
        key={this.state.key}
        style={chartStyles}
        margin={{
          top: 10,
          right: 10,
          left: -18,
          bottom: 5,
        }}
        onClick={e => this.props.onChartPointSelect(e.activeLabel)}
        data={this.getLineData()}
      >
        <CartesianGrid strokeDasharray="3 3" style={{ opacity: 0.5 }} />
        <Legend align="right" />
        <Tooltip content={this.lineCustomTooltip} offset={25} />
        <defs>
          {this.props.experiment.metrics.map(m => {
            const colorId = `colorUv-${id(m)}`;
            return (
              <linearGradient key={m} id={colorId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={colorWheel[id(m)]}
                  stopOpacity={0.15}
                />
                <stop
                  offset="95%"
                  stopColor={colorWheel[id(m)]}
                  stopOpacity={0.25}
                />
              </linearGradient>
            );
          })}
        </defs>
        {this.props.experiment.selectedMetrics.map((m, index) => (
          <YAxis
            key={m}
            margin={{
              left: -20 + 20 * this.props.experiment.selectedMetrics.length,
            }}
            width={65 - 5 * this.props.experiment.selectedMetrics.length}
            stroke={colorWheel[id(m)]}
            yAxisId={`yaxis-${index}`}
            domain={['auto', 'auto']}
            tickFormatter={v => _.round(v, 3)}
          />
        ))}
        {this.props.experiment.selectedMetrics.map((m, index) => {
          const stroke = `${colorWheel[id(m)]}`;
          const fill = `url(#colorUv-${id(m)})`;
          return (
            <Area
              margin={{ bottom: 5 }}
              type="monotone"
              key={m}
              dataKey={m}
              yAxisId={`yaxis-${index}`}
              fillOpacity={1}
              fill={fill}
              strokeWidth={1.7}
              stroke={stroke}
              activeDot={{ r: 5 }}
              animationDuration={850}
            />
          );
        })}
      </ComposedChart>
    );
  }

  render() {
    return (
      <StyledLineChart className="chart" {...this.props}>
        <div className="chart-filters-container">
          <Icon name="filter_list" />
          <Label content="Filters :" size="tiny" type="important" />
          <div className="chart-filters">
            <Select
              onSelectionChange={val =>
                this.props.onFilterChange({ order: val })
              }
              selected="date"
              label="ORDER BY"
              values={[{ id: 'date', label: 'Date' }].concat(
                this.props.experiment.metrics.map(m => ({
                  id: m,
                  label: m,
                })),
              )}
            />
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-sub-container">
            <ResponsiveContainer>{this.getChart()}</ResponsiveContainer>
          </div>
        </div>
        <div className="chart-visualize-container">
          <div className="chart-visualize-sub-container">
            <Icon name="visibility" />
            <Label content="Visualization :" size="tiny" type="important" />
            <div className="chart-checkboxes">
              {this.props.experiment.metrics.map(metric => (
                <Checkbox
                  key={metric}
                  name={metric}
                  label={metric}
                  value={metric}
                  checked={this.props.experiment.selectedMetrics.includes(
                    metric,
                  )}
                  onChange={() =>
                    this.props.onChangeSelectedMetrics({
                      action: this.props.experiment.selectedMetrics.includes(
                        metric,
                      )
                        ? 'remove'
                        : 'add',
                      metric,
                      experiment: this.props.experiment.id,
                    })
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </StyledLineChart>
    );
  }
}

LineChart.displayName = 'LineChart';
LineChart.propTypes = {
  theme: PropTypes.object,
  filters: PropTypes.object.isRequired,
  onChartPointSelect: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onChangeSelectedMetrics: PropTypes.func.isRequired,

  experiment: PropTypes.object.isRequired,
  stage: PropTypes.object.isRequired,
};
LineChart.defaultProps = {
  theme,

  // moveToView: null
};
