import _ from 'lodash'
import React, { Component } from 'react'
import { ComposedChart, ResponsiveContainer, Area, Line, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Card, Select } from 'antd'
import TimeAgo from 'react-timeago'
import 'antd/lib/card/style/css'
import 'antd/lib/select/style/css'

const Option = Select.Option

const chartStyles = {
  fontSize: '12px',
  borderRadius: '5px',
  height: '250px',
  marginLeft: '-25px'
}

const cardStyles = {
  width: '100%',
  margin: '20px 0px',
  borderRadius: '5px'
}

const customTooltip = {
  background: '#fff',
  borderRadius: '3px',
  padding: 10,
  border: '1px solid rgb(217, 217, 217)',
  fontSize: 13
}

export default class HomeChart extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedVar: this.props.mainMetric
    }

    this.handleSelectMetric = this.handleSelectMetric.bind(this)
    this.handleSelectAlgo = this.handleSelectAlgo.bind(this)
    this._getChartData = this._getChartData.bind(this)
    this._getChartOrFilter = this._getChartOrFilter.bind(this)
    this.customTooltip = this.customTooltip.bind(this)
  }

  handleSelectMetric (selectedVar) {
    this.setState({selectedVar})
  }

  handleSelectAlgo (algo) {
    algo = parseInt(algo, 10)
    let newSelectedAlgos
    if (_.includes(this.state.selectedAlgos, algo)) {
      newSelectedAlgos = this.state.selectedAlgos.filter((k) => k !== algo)
    } else {
      newSelectedAlgos = _.concat(this.state.selectedAlgos, algo)
    }
    this.setState({
      selectedAlgos: newSelectedAlgos
    })
  }

  _getMetricSelect () {
    const metrics = Object.keys(this.props.trials[0].results).map((el) => {
      return <Option key={el} value={el}>{el}</Option>
    })

    return (
      <div style={{position: 'relative', 'top': '-2px'}}>
        <Select
          defaultValue={this.state.selectedVar}
          style={{top: '-4px', margin: '0px 10px', width: '160px'}}
          onChange={this.handleSelectMetric}
          size='large'
         >
          {metrics}
        </Select>
      </div>
    )
  }

  tickFormatter (val) {
    return _.round(val, 3)
  }

  _getChartData () {
    return _
      .chain(this.props.trials)
      .map((k) => ({id: k.id, value: _.round(k.results[this.state.selectedVar], 4)}))
      .reverse()
      .value()
  }

  generateTableData (obj) {
    const lis = Object.keys(obj).map((k) => {
      if (!_.isNull(obj[k]) || obj[k] === '') {
        return (
          <li key={k}>
            {k}: {_.isNumber(obj[k]) ? _.round(+obj[k], 4) : obj[k]}
          </li>
        )
      }
    })
    return <ul>{lis}</ul>
  }

  customTooltip (item) {
    const trial = this.props.trials.filter((k) => k.id === item.payload[0].payload.id)[0]
    return (
      <div style={customTooltip}>
        <TimeAgo style={{opacity: 0.6, float: 'right'}} date={trial.created} />
        <h3 style={{color: '#1882fd', padding: '0 5'}}>{item.payload[0].payload.value}</h3>
        <h3>{trial.algo_name}</h3>
        <h4 style={{marginTop: 3}}>Parameters</h4>
        <ul>{this.generateTableData(trial.parameters)}</ul>
        <h4 style={{marginTop: 3}}>Metrics</h4>
        <ul>{this.generateTableData(trial.results)}</ul>
      </div>
    )
  }

  _getChartOrFilter () {
    return (
      <ComposedChart
        style={chartStyles}
        margin={{top: 0, right: 0, left: 0, bottom: 0}}
        data={this._getChartData()}>
        <YAxis domain={['auto', 'auto']} tickFormatter={this.tickFormatter} />
        <CartesianGrid strokeDasharray='3 3' style={{opacity: 0.3}} />
        <Tooltip content={this.customTooltip} offset={25} />
        <Area type='monotone' dataKey={'value'} fill='rgba(24, 131, 255, 0.1)' stroke='#108ee9' activeDot={{ r: 5 }} isAnimationActive={this.props.isAnimationActive} />
        <Line type='monotone' dataKey={'value'} stroke='#108ee9' activeDot={{ r: 5 }} isAnimationActive={this.props.isAnimationActive} />
      </ComposedChart>
    )
  }

  render () {
    return (
      <Card title={this.state.selectedVar + ' over time'} extra={this._getMetricSelect()} style={cardStyles} bodyStyle={{height: '250px'}}>
        <ResponsiveContainer>
          {this._getChartOrFilter()}
        </ResponsiveContainer>
      </Card>
    )
  }
}
