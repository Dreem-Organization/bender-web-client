import React, { Component } from 'react'
import _ from 'lodash'
import { Row, Col, Card, Button } from 'antd'

import { ResponsiveContainer, Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis} from 'recharts'
import LineChartWidget from './widgets/line-chart-widget'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)
    this._getBestMetrics = this._getBestMetrics.bind(this)
    this._getMetricsLineCharts = this._getMetricsLineCharts.bind(this)
  }

  _getBestMetrics () {
    return _.map(this.props.experiment.metrics, (metric, i) => {
      const best = _.chain(this.props.trials)
                       .map((k) => k.results[metric])
                       .max()
                       .value()
      return (
        <Col span={6} key={i}>
          <Card bordered={false} className='dashboard-number'>
            <h1>{_.round(best, 2)}</h1>
            <p>highest {metric}</p>
          </Card>
        </Col>
      )
    })
  }

  _getMetricsLineCharts () {
    return _.map(this.props.experiment.metrics, (metric, i) => {
      return (
        <LineChartWidget
          key={i}
          metric={metric}
          trials={this.props.trials}
        />
      )
    })
  }
  render () {
    const testdata =  [
      { subject: 'Math', A: 120, B: 110, fullMark: 150 },
      { subject: 'Chinese', A: 98, B: 130, fullMark: 150 },
      { subject: 'English', A: 86, B: 130, fullMark: 150 },
      { subject: 'Geography', A: 99, B: 100, fullMark: 150 },
      { subject: 'Physics', A: 85, B: 90, fullMark: 150 },
      { subject: 'History', A: 65, B: 85, fullMark: 150 },
    ]

    return (
      <div className='main-container'>
        <Row>
          <Col span={20}>
            <h1 className='main'>
              <a onClick={() => this.props.moveToView('experiment-list')}>Experiments</a>
              &nbsp;>&nbsp;
              <a onClick={() => this.props.moveToView('experiment')}>{this.props.experiment.name}</a>
              &nbsp;>&nbsp;Dashboard
            </h1>
          </Col>
          <Col span={4}>
          <Button
            style={{float: 'right', marginTop: '15px', fontSize: '13px'}}
            id={'buttonId'}
            onClick={() => this.props.moveToView('experiment')}
            type='default'>
            Close Dashboard
          </Button>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Card bordered={false} className='dashboard-number'>
              <h1>{this.props.experiment.trial_count}</h1>
              <p>TRIALS</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} className='dashboard-number'>
              <h1>{this.props.experiment.algo_count}</h1>
              <p>ALGOS</p>
            </Card>
          </Col>
          {this._getBestMetrics()}
          {this._getMetricsLineCharts()}
          <Col span={12}>
            <Card bordered={false} title={'Radar'} bodyStyle={{height: '220px', 'padding': 10}}>
              <ResponsiveContainer>
              <RadarChart cy={100} outerRadius={80} data={testdata}>
                <Radar name='Mike' dataKey='A' fillOpacity={0.1} stroke='#037fff' fill='#037fff' />
                <Radar name="Lily" dataKey="B" fillOpacity={0.6}  stroke='#037fff' fill='#037fff' />
                <PolarGrid />
                <PolarAngleAxis dataKey='subject' />
                <PolarRadiusAxis />
              </RadarChart>
             </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
