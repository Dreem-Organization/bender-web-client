import React, { Component } from 'react'
import _ from 'lodash'
import HomeChart from './home-chart'
import Trial from './trial'
import AlgoList from './algo-list'
import TrialFilterer from './trial-filterer'
import { Button, Row, Col, Tooltip, Tabs } from 'antd'
import Clipboard from 'clipboard'
import { Link } from 'react-router'

const TabPane = Tabs.TabPane

export default class Experiment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      animateChart: true
    }
    this._getTrialList = this._getTrialList.bind(this)
    this._renderDatasetLabel = this._renderDatasetLabel.bind(this)
  }

  componentDidMount () {
    this.clipboard = new Clipboard(
      '#buttonId', {
        target: () => document.getElementById('inputId')
      }
    )
  }

  _getTrialList () {
    if (this.props.trials.length >= 1) {
      const trialList = _.map(this.props.trials, (trial, i) => {
        return (
          <Trial
            key={i}
            trial={trial}
            mainMetric={this.props.experiment.main_metric}
            deleteTrial={this.props.deleteTrial}
          />
        )
      })
      return (
        <div className='trial-list'>
          <ul>{trialList}</ul>
        </div>
      )
    } else {
      return (
        <h2 className='no-trials'>
          No trials send yet.
        </h2>
      )
    }
  }

  _renderDatasetLabel () {
    if (this.props.experiment.dataset !== null && this.props.experiment.dataset.length >= 1) {
      return (
        <span className='dataset-label'>{this.props.experiment.dataset}</span>
      )
    }
  }

  _getHomeChart () {
    if (this.props.trials.length > 0) {
      return (
        <HomeChart
          trials={this.props.trials}
          algos={this.props.algos}
          mainMetric={this.props.experiment.main_metric}
          isAnimationActive={this.state.animateChart}
        />
     )
    } else {
      return null
    }
  }

  render () {
    return (
      <div className='main-container'>
        <Row>
          <Col span={12}>
            <h1 className='main'>
              <Link to='/'>Experiments</Link> > {this.props.experiment.name}
            </h1>
          </Col>
          <Col span={12}>
            <Link to={`/experiment/${this.props.experiment.id}/dashboard`}>
              <Button
                style={{float: 'right', marginTop: '15px', fontSize: '13px'}}
                id={'buttonId'}
                type='primary'>
                Dashboard
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <i>by {this.props.experiment.author}</i>
            {this._renderDatasetLabel()}
          </Col>
          <Col span={12}>
            <input
              id={'inputId'}
              type={'text'}
              value={this.props.experiment.id}
              style={{opacity: 0}}
              readOnly
            />
            <Tooltip title='Click to copy'>
              <Button
                style={{float: 'right'}}
                id={'buttonId'}
                type='dashed'>
                {this.props.experiment.id}
              </Button>
            </Tooltip>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p className='experiment-description'>
              {this.props.experiment.description}
            </p>
          </Col>
        </Row>
        <Tabs
          tabPosition={'top'}
          animated={false}
          tabBarExtraContent={
            <TrialFilterer
              experiment={this.props.experiment}
              algos={this.props.algos}
              setFilters={this.props.setFilters}
              filters={this.props.filters}
            />
          }
        >
          <TabPane tab={<h4>Trials</h4>} key='1'>
            {this._getHomeChart()}
            {this._getTrialList()}
          </TabPane>
          <TabPane tab={<h4>Algos</h4>} key='3'>
            <AlgoList algos={this.props.algos} />
          </TabPane>
          <TabPane tab={<h4>Infos</h4>} key='4'></TabPane>
        </Tabs>
      </div>
    )
  }
}
