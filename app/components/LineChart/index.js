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
      JSON.stringify(this.props.trials) !== JSON.stringify(prevProps.trials)
    ) {
      this.setState({
        key: Math.floor(Math.random() * Math.floor(1000)),
      });
    }
  }

  getLineData() {
    let data;
    if (this.props.experiment.selectedMetrics !== null) {
      data = _.chain(this.props.trials)
        .map(k => {
          const results = _.mapValues(k.results, r => _.round(r, 4));
          results.id = k.id;
          return results;
        })
        .reverse()
        .value();
    } else if (this.props.experiment.selectedHyperParameter !== null) {
      data = _(this.props.trials)
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

  generateTableData(params) {
    return Object.keys(params).map(p => {
      if (!_.isNull(params[p]) || params[p] === '') {
        return (
          <div className="data-table" key={p}>
            <Label className="left" content={p} type="simple" />
            <Label
              className="right"
              content={
                _.isNumber(params[p])
                  ? _.round(+params[p], 4).toString()
                  : params[p].toString()
              }
            />
          </div>
        );
      }
      return null;
    });
  }

  generateTableMetrics(results) {
    const metrics = this.props.experiment.metrics; // eslint-disable-line
    return metrics.map((m, i) => (
      <div className="data-table" key={m.metric_name}>
        <div className="left coloured">
          <div
            style={{
              display: 'inline-block',
              borderRadius: '50%',
              marginRight: '5px',
              width: '10px',
              height: '10px',
              backgroundColor: colorWheel[i],
            }}
          />
          <Label content={m.metric_name} type="simple" />
        </div>
        <Label
          className="right"
          content={
            _.isNumber(results[m.metric_name])
              ? _.round(+results[m.metric_name], 4).toString()
              : results[m.metric_name].toString()
          }
        />
      </div>
    ));
  }

  lineCustomTooltip(item) {
    if (item.payload[0]) {
      const trial = this.props.trials.filter(
        k => k.id === item.payload[0].payload.id,
      )[0];
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
    const lineData = [];
    this.props.trials.forEach(t => {
      lineData.push({
        id: t.id,
        ...t.results,
      });
    });
    const metric = this.props.experiment.metrics.find(
      m => m.metric_name === this.props.experiment.filters.order,
    );
    // reward or loss
    if (metric.type === 'reward') {
      lineData.sort((a, b) => b[metric.metric_name] - a[metric.metric_name]);
    } else {
      lineData.sort((a, b) => a[metric.metric_name] - b[metric.metric_name]);
    }
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
        data={lineData}
      >
        <CartesianGrid strokeDasharray="3 3" style={{ opacity: 0.5 }} />
        <Legend align="right" />
        <Tooltip content={this.lineCustomTooltip} offset={25} />
        <defs>
          {this.props.experiment.metrics.map((m, i) => {
            const colorId = `colorUv-${i}`;
            return (
              <linearGradient
                key={m.metric_name}
                id={colorId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={colorWheel[i]}
                  stopOpacity={0.15}
                />
                <stop
                  offset="95%"
                  stopColor={colorWheel[i]}
                  stopOpacity={0.25}
                />
              </linearGradient>
            );
          })}
        </defs>
        {this.props.experiment.selectedMetrics.map((m, index) => (
          <YAxis
            key={m.metric_name}
            margin={{
              left: -20 + 20 * this.props.experiment.selectedMetrics.length,
            }}
            width={65 - 5 * this.props.experiment.selectedMetrics.length}
            stroke={colorWheel[index]}
            yAxisId={`yaxis-${index}`}
            domain={['auto', 'auto']}
            tickFormatter={v => _.round(v, 3)}
          />
        ))}
        {this.props.experiment.selectedMetrics.map((m, index) => {
          const stroke = `${colorWheel[index]}`;
          const fill = `url(#colorUv-${index})`;
          return (
            <Area
              margin={{ bottom: 5 }}
              type="monotone"
              key={m.metric_name}
              dataKey={m.metric_name}
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
              onSelectionChange={val => {
                this.props.onFilterChange({
                  exp: this.props.experiment.id,
                  data: { order: val },
                });
                this.props.onChangeSelectedMetrics({
                  action: 'add',
                  metric: this.props.experiment.metrics.find(
                    m => m.metric_name === val,
                  ),
                  experiment: this.props.experiment.id,
                });
              }}
              selected="date"
              label="ORDER BY"
              values={this.props.experiment.metrics.map(m => ({
                id: m.metric_name,
                label: m.metric_name,
              }))}
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
                  key={metric.metric_name}
                  name={metric.metric_name}
                  label={metric.metric_name}
                  value={metric.metric_name}
                  checked={this.props.experiment.selectedMetrics.some(
                    m => metric.metric_name === m.metric_name,
                  )}
                  onChange={() =>
                    this.props.onChangeSelectedMetrics({
                      action: this.props.experiment.selectedMetrics.some(
                        m => metric.metric_name === m.metric_name,
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

  trials: PropTypes.array,
  experiment: PropTypes.object.isRequired,
  stage: PropTypes.object.isRequired,
};
LineChart.defaultProps = {
  theme,

  // moveToView: null
};
