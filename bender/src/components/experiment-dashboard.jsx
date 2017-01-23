import React, { Component } from 'react'
import _ from 'lodash'
import { Row, Col, Card, Button } from 'antd'
import LineChartWidget from './widgets/line-chart-widget'
// import RadarChartWidget from './widgets/radar-chart-widget'
import ScatterChartWidget from './widgets/scatter-chart-widget'
import TrialFilterer from './trial-filterer'
import { Link } from 'react-router'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)

    this._getBestMetrics = this._getBestMetrics.bind(this)
    this._getMetricsLineCharts = this._getMetricsLineCharts.bind(this)
  }

  _getBestMetrics () {
    return _.map(this.props.experiment.metrics, (metric, i) => {
      let best = _.chain(this.props.trials).map((k) => k.results[metric])
      if (this.props.filters.desc === 'true') {
        best = best.min().value()
      } else {
        best = best.max().value()
      }
      return (
        <Col span={6} key={i}>
          <Card bordered={false} className='dashboard-number'>
            <h1>{_.round(best, 2)}</h1>
            <p>{this.props.filters.desc === 'true' ? 'min' : 'max'} {metric}</p>
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
    return (
      <div className='main-container'>
        <Row>
          <Col span={20}>
            <h1 className='main'>
              <Link to={'/'}>Experiments</Link>
              &nbsp;>&nbsp;
              <Link to={`/experiment/${this.props.experiment.id}`}>
                {this.props.experiment.name}
              </Link>
              &nbsp;>&nbsp;Dashboard
            </h1>
          </Col>
          <Col span={4}>
            <Link to={`/experiment/${this.props.experiment.id}`}>
              <Button
                style={{float: 'right', marginTop: '15px', fontSize: '13px'}}
                id={'buttonId'}
                type='default'>
                Close Dashboard
              </Button>
            </Link>
          </Col>
          <Col span={24}>
            <TrialFilterer
              experiment={this.props.experiment}
              algos={this.props.algos}
              setFilters={this.props.setFilters}
              filters={this.props.filters}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Card bordered={false} className='dashboard-number'>
              <h1>{this.props.experiment.trial_count}</h1>
              <p>total trials</p>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} className='dashboard-number'>
              <h1>{this.props.experiment.algo_count}</h1>
              <p>total algos</p>
            </Card>
          </Col>
          {this._getBestMetrics()}
          {this._getMetricsLineCharts()}
          <ScatterChartWidget
            trials={this.props.trials}
            experiment={this.props.experiment}
            algos={this.props.algos}
          />
        </Row>
      </div>
    )
  }
}
