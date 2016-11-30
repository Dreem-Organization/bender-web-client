import React, { Component } from 'react'
import {LineChart, Line, YAxis, CartesianGrid, Tooltip} from 'recharts'
import { Card, Select } from 'antd'
import 'antd/lib/card/style/css'
import 'antd/lib/select/style/css'

const chartStyles = {
  fontSize: '12px',
  borderRadius: '5px',
  marginLeft: '-25px'
}

const cardStyles = {
  width: '100%',
  margin: '20px 0px',
  borderRadius: '5px'
}

export default class HomeChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedVar: Object.keys(this.props.items[0].results)[0]
    }

    this.handleSelectMetric = this.handleSelectMetric.bind(this)
  }

  handleSelectMetric (selectedVar) {
      this.setState({selectedVar})
  }

  _getMetricSelect () {
    const metrics = Object.keys(this.props.items[0].results).map((el) => {
        return <Option value={el}>{el}</Option>
    })
    return (
      <Select
          defaultValue={this.state.selectedVar}
          style={{ width: '160', top: '-4px' }}
          onChange={this.handleSelectMetric}
         >
        {metrics}
      </Select>
    )
  }

  tickFormatter (val) {
      return Math.round(val * 100) / 100
  }

  render () {
    const data = this.props.items.map((item) => {
      return {'value': Math.round(item.results[this.state.selectedVar] * 10000) / 10000}
    })

    return (
        <Card title={this.state.selectedVar + ' over time'} extra={this._getMetricSelect()} style={cardStyles}>
          <LineChart style={chartStyles} width={850} height={220} data={data}
            margin={{top: 10, right: 10, left: 10, bottom: 10}}>
            <YAxis domain={['auto', 'auto']} tickFormatter={this.tickFormatter} />
            <CartesianGrid strokeDasharray='2 2' />
            <Tooltip />
            <Line type='monotone' dataKey={'value'} stroke='#1883ff' activeDot={{ r: 5 }} />
          </LineChart>
        </Card>
    )
  }
}
