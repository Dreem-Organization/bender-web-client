import React, { Component } from 'react'
import {LineChart, Line, YAxis, CartesianGrid, Tooltip} from 'recharts'

export default class HomeChart extends Component {
  render () {
    return (
      <LineChart className='home-chart' width={500} height={200} data={this.props.items}
        margin={{top: 0, right: 0, left: 0, bottom: 0}}>
        <YAxis domain={['auto', 'auto']} />
        <CartesianGrid strokeDasharray='3 3' />
        <Tooltip />
        <Line type='monotone' dataKey='score' stroke='#1883ff' />
      </LineChart>
      )
  }
}
