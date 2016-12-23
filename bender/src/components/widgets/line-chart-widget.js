import React, { Component } from 'react'
import _ from 'lodash'
import { ComposedChart, ResponsiveContainer, Area, Line, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Col, Card } from 'antd'
import TimeAgo from 'react-timeago'


const chartStyles = {
  fontSize: '12px',
  borderRadius: '5px',
  height: '200px',
  marginLeft: '-25px'
}

const customTooltip = {
  background: '#fff',
  borderRadius: '3px',
  padding: 10,
  border: '1px solid rgb(217, 217, 217)',
  fontSize: 13
}

const cardStyles = {
}


export default class LineChartWidget extends Component {
  constructor (props) {
    super(props)

    this._getChartData = this._getChartData.bind(this)
    this.customTooltip = this.customTooltip.bind(this)
  }

  generateTableData (obj) {
    const lis = Object.keys(obj).map((k) => {
      return (
        <li key={k}>
          {k}: {_.isNumber(obj[k]) ? _.round(+obj[k], 4) : obj[k]}
        </li>
      )
    })
    return <ul>{lis}</ul>
  }

  _getChartData () {
    const data = _
      .chain(this.props.trials)
      //.filter((k) => (_.includes(this.state.selectedAlgos, k.algo)))
      .map((k) => ({id: k.id, value: _.round(k.results[this.props.metric], 4)}))
      .reverse()
      .value()
    return data
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

  render () {
    return (
      <Col span={12}>
        <Card bordered={false} title={this.props.metric} style={cardStyles} bodyStyle={{height: '200px'}}>
          <ResponsiveContainer>
            <ComposedChart
              style={chartStyles}
              margin={{top: 0, right: 0, left: 0, bottom: 0}}
              data={this._getChartData()}>
              <YAxis domain={['auto', 'auto']} tickFormatter={this.tickFormatter} />
              <CartesianGrid strokeDasharray='3 3' style={{opacity: 0.3}} />
              <Tooltip content={this.customTooltip} offset={25} />
              <Area type='monotone' dataKey={'value'} fill='rgba(24, 131, 255, 0.1)' stroke='#108ee9' activeDot={{ r: 5 }} />
              <Line type='monotone' dataKey={'value'} stroke='#108ee9' activeDot={{ r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </Col>
    )
  }
}
