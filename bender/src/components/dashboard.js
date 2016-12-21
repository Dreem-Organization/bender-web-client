import React, { Component } from 'react'
import _ from 'lodash'
import { Row, Col, Card} from 'antd'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)

    this._getBestMetrics = this._getBestMetrics.bind(this)
  }
  _getBestMetrics () {
    return _.map(this.props.experiment.metrics, (metric) => {
      const best = _.chain(this.props.trials)
                       .map((k) => k.results[metric])
                       .max()
                       .value()
      return (
        <Col span={6}>
          <Card bordered={false} className='dashboard-number'>
            <h1>{_.round(best, 2)}</h1>
            <p>highest {metric}</p>
          </Card>
        </Col>
      )
    })
  }
  render () {
    return (
      <Row>
        {this._getBestMetrics()}
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
      </Row>
    )
  }
}
