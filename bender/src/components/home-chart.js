import React, { Component } from 'react'
import {LineChart, Line, YAxis, CartesianGrid, Tooltip} from 'recharts'
import { Card } from 'antd'
import 'antd/lib/card/style/css'

const chartStyles = {
  fontSize: '12px',
  borderRadius: '5px',
  marginLeft: '-25px'
}

const cardStyles = {
    width: 530,
    margin: '20px 0px',
    borderRadius: '5px'
}

export default class HomeChart extends Component {
  render () {
    return (
        <Card title="Loss over time" extra={<a href="#">More</a>} style={cardStyles}>
          <LineChart style={chartStyles} width={500} height={200} data={this.props.items}
            margin={{top: 10, right: 10, left: 10, bottom: 10}}>
            <YAxis domain={['auto', 'auto']} />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Line type='monotone' dataKey='score' stroke='#1883ff' />
          </LineChart>
        </Card>
    )
  }
}
