import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from 'components/Label';
import Icon from 'components/Icon';
import Checkbox from 'components/Checkbox';
import Select from 'components/Select';
import { light as theme } from 'themeConfig';
import TimeAgo from 'react-timeago';
import _ from 'lodash';
import {
  ComposedChart,
  ResponsiveContainer,
  Area,
  Line,
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
    const sm = this.props.experiment.selectedMetrics;
    if (sm !== null) {
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

  generateCfdMetrics(item) {
    if (item.payload.length > 1) {
      const pl = item.payload[1].payload;
      return (
        <div className="custom-tooltip-sub-container">
          <Label content="Selected Metric" type="important" />
          <div className="custom-tooltip-data-list">
            <div className="data-table">
              <div className="left">
                <Label content="STD" type="simple" />
              </div>
              <Label
                className="right"
                content={
                  _.isNumber(pl.cfd)
                    ? _.round(+pl.cfd, 4).toString()
                    : pl.cfd.toString()
                }
              />
            </div>
            {pl.replicas.map(r => (
              <div className="data-table" key={r}>
                <div className="left">
                  <Label content="Other Recorded Value" type="simple" />
                </div>
                <Label
                  className="right"
                  content={
                    _.isNumber(r) ? _.round(+r, 4).toString() : r.toString()
                  }
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    return '';
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
          {this.generateCfdMetrics(item)}
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
    const sm = this.props.experiment.selectedMetrics;
    let lineData = [];
    let cfdActivated = false;
    this.props.trials.forEach(t => {
      lineData.push({
        id: t.id,
        cfdHigh: [],
        cfdLow: [],
        cfd: null,
        replicas: [],
        selectedMetric: sm,
        ...t.results,
        ...t,
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
    lineData = lineData.reverse();
    lineData.forEach((pointA, iA) => {
      lineData.forEach((pointB, iB) => {
        if (
          JSON.stringify(pointA.parameters) ===
            JSON.stringify(pointB.parameters) &&
          iA !== iB
        ) {
          pointA.replicas.push(pointB.results[metric.metric_name]);
          lineData.splice(iB, 1);
        }
      });
    });
    lineData = lineData.reverse();
    lineData.forEach((point, i) => {
      if (point.replicas.length > 0) {
        point.replicas.push(point.results[metric.metric_name]);
        const moy =
          point.replicas.reduce((a, b) => a + b, 0) / point.replicas.length;
        const std =
          point.replicas.reduce((a, b) => a + (b - moy) ** 2, 0) /
          point.replicas.length;
        // CONFIDENCE INTERVAL -> Nope
        // const cfd = 1.96 * (Math.sqrt(std) / Math.sqrt(point.replicas.length));
        lineData[i].cfdHigh = point.results[metric.metric_name] + std;
        lineData[i].cfdLow = point.results[metric.metric_name] - std;
        lineData[i].cfd = std;
        cfdActivated = true;
      } else {
        lineData[i].cfd = 0;
        lineData[i].cfdHigh = point.results[metric.metric_name];
        lineData[i].cfdLow = point.results[metric.metric_name];
      }
    });
    if (sm.length === 0) {
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
        onClick={e => this.props.onChartPointSelect(lineData[e.activeLabel])}
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
        {sm.map((m, index) => (
          <YAxis
            key={m.metric_name}
            margin={{
              left: -20 + 20 * sm.length,
            }}
            width={65 - 5 * sm.length}
            stroke={colorWheel[index]}
            yAxisId={`yaxis-${index}`}
            domain={['auto', 'auto']}
            tickFormatter={v => _.round(v, 3)}
          />
        ))}
        {sm.map((m, index) => {
          const stroke = `${colorWheel[index]}`;
          const fill = `url(#colorUv-${index})`;
          return !cfdActivated ? (
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
          ) : (
            <Line
              key="line"
              type="monotone"
              dataKey={m.metric_name}
              strokeWidth={2}
              yAxisId={`yaxis-${0}`}
              stroke={`${colorWheel[0]}`}
            />
          );
        })}
        {cfdActivated ? (
          <Line
            key="cfdHigh"
            type="monotone"
            dot={false}
            strokeDasharray="5 5"
            strokeOpacity={0.6}
            dataKey="cfdHigh"
            yAxisId={`yaxis-${0}`}
            stroke={`${colorWheel[0]}`}
          />
        ) : (
          ''
        )}
        {cfdActivated ? (
          <Line
            key="cfdLow"
            type="monotone"
            dot={false}
            strokeDasharray="5 5"
            strokeOpacity={0.6}
            dataKey="cfdLow"
            yAxisId={`yaxis-${0}`}
            stroke={`${colorWheel[0]}`}
          />
        ) : (
          ''
        )}
      </ComposedChart>
    );
  }

  render() {
    const sm = this.props.experiment.selectedMetrics;
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
              theme={this.props.theme}
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
            <Icon name="visibility" theme={this.props.theme} />
            <Label
              content="Visualization :"
              size="tiny"
              type="important"
              theme={this.props.theme}
            />
            <div className="chart-checkboxes">
              {this.props.experiment.metrics.map(metric => (
                <Checkbox
                  key={metric.metric_name}
                  name={metric.metric_name}
                  label={metric.metric_name}
                  value={metric.metric_name}
                  checked={sm.some(m => metric.metric_name === m.metric_name)}
                  onChange={() =>
                    this.props.onChangeSelectedMetrics({
                      action: sm.some(m => metric.metric_name === m.metric_name)
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
