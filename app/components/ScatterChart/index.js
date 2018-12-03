import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Label from 'components/Label';
import Select from 'components/Select';
import { light as theme } from 'themeConfig';
import TimeAgo from 'react-timeago';
import _ from 'lodash';
import {
  ScatterChart,
  Scatter,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import StyledMyScatterChart from './style';

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

export default class MyScatterChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedX: this.props.algo.parameters[0].name,
      selectedY: this.props.experiment.metrics[0].metric_name,
      isCategorical: this.props.algo.parameters[0].category === 'categorical',
    };

    this.onXChange = this.onXChange.bind(this);
    this.onYChange = this.onYChange.bind(this);
    this.getChart = this.getChart.bind(this);
    this.lineCustomTooltip = this.lineCustomTooltip.bind(this);
  }

  onXChange(val) {
    let isCat = false;
    this.props.algo.parameters.forEach(p => {
      if (p.name === val && p.category === 'categorical') {
        isCat = true;
      }
    });
    this.setState({
      isCategorical: isCat,
      selectedX: val,
    });
  }

  onYChange(val) {
    this.setState({
      selectedY: val,
    });
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
      const trial = this.props.trials[0];
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
    const scatterData = [];
    this.props.trials.forEach(t => {
      scatterData.push({
        x: t.parameters[this.state.selectedX],
        y: t.results[this.state.selectedY],
      });
    });
    scatterData.sort((a, b) => a.x - b.x);
    return (
      <ScatterChart
        style={chartStyles}
        className="scatter-chart"
        margin={{
          top: 0,
          right: 20,
          bottom: 3,
          left: 0,
        }}
      >
        <Scatter
          onClick={e =>
            this.props.onChartPointSelect(
              scatterData.findIndex(
                i => i.x === e.payload.x && i.y === e.payload.y,
              ),
            )
          }
          data={scatterData}
          fill="#008cec"
          r={2}
        />
        <XAxis
          type={this.state.isCategorical ? 'category' : 'number'}
          allowDuplicatedCategory={false}
          dataKey="x"
          name="toto"
          tickFormatter={val =>
            typeof val === 'string' ? val : val.toExponential(2)
          }
        />
        <YAxis padding={{ top: 10 }} dataKey="y" name="tata" />
        <Tooltip content={this.lineCustomTooltip} offset={25} />
        <CartesianGrid strokeDasharray="3 3" style={{ opacity: 0.3 }} />
      </ScatterChart>
    );
  }

  render() {
    return (
      <StyledMyScatterChart className="scatterchart" {...this.props}>
        <div className="scatterchart-filters-container">
          <div className="scatterchart-filters">
            <Select
              onSelectionChange={this.onYChange}
              selected="date"
              label="Y AXIS"
              values={this.props.experiment.metrics.map(m => ({
                id: m.metric_name,
                label: m.metric_name,
              }))}
              theme={this.props.theme}
            />
            <Select
              onSelectionChange={this.onXChange}
              selected="date"
              label="X AXIS"
              values={this.props.algo.parameters.map(p => ({
                id: p.name,
                label: p.name,
              }))}
              theme={this.props.theme}
            />
          </div>
        </div>
        <div className="scatterchart-container">
          <div className="scatterchart-sub-container">
            <ResponsiveContainer>{this.getChart()}</ResponsiveContainer>
          </div>
        </div>
      </StyledMyScatterChart>
    );
  }
}

MyScatterChart.displayName = 'MyScatterChart';
MyScatterChart.propTypes = {
  theme: PropTypes.object,
  onChartPointSelect: PropTypes.func,

  trials: PropTypes.array,
  experiment: PropTypes.object,
  algo: PropTypes.object,
  stage: PropTypes.object,
};
MyScatterChart.defaultProps = {
  theme,
};
