import React, { Component } from 'react'
import _ from 'lodash'
import HomeChart from './home-chart'
import Trial from './trial'
import AlgoList from './algo-list'
import TrialFilterer from './trial-filterer'
import TrialsGetStarted from './trials-get-started'
import { deleteTrial, deleteExperiment } from '../constants/requests'
import { Button, Row, Col, Tooltip, Tabs, Popconfirm, message} from 'antd'
import Clipboard from 'clipboard'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

const TabPane = Tabs.TabPane

export default class ExperimentTrials extends Component {
  constructor (props) {
    super(props)

    this.state = {
      animateChart: true
    }
    this._getTrialList = this._getTrialList.bind(this)
    this._renderDatasetLabel = this._renderDatasetLabel.bind(this)
    this.deleteTrial = this.deleteTrial.bind(this)
    this._renderContentOrGetStarted = this._renderContentOrGetStarted.bind(this)
    this.handleDeleteExperiment = this.handleDeleteExperiment.bind(this)
  }

  componentDidMount () {
    this.clipboard = new Clipboard(
      '#buttonId', {
        target: () => document.getElementById('inputId')
      }
    )
  }

  _getTrialList () {
    const trialList = _.map(this.props.trials, (trial, i) => {
      return (
        <Trial
          key={i}
          trial={trial}
          mainMetric={this.props.experiment.main_metric}
          deleteTrial={this.deleteTrial}
        />
      )
    })
    return (
      <div className='trial-list'>
        <ul>{trialList}</ul>
      </div>
    )
  }

  deleteTrial (trialID) {
    deleteTrial(this.props.user.token, trialID)
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

  handleDeleteExperiment () {
    deleteExperiment(this.props.user.token, this.props.experiment.id)
    message.success('Trial deleted.')
    browserHistory.push('/experiments')
  }

  _renderContentOrGetStarted () {
    if (this.props.trials.length >= 1) {
      return (
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
          <TabPane tab={<h4>Infos</h4>} key='4'>
            <Popconfirm placement='top' title={'Are you sure ?'} onConfirm={this.handleDeleteExperiment} okText='Yes' cancelText='No'>
              <Button>Delete Experiment</Button>
            </ Popconfirm>
          </TabPane>
        </Tabs>
      )
    } else {
      return (
        <TrialsGetStarted />
      )
    }
  }

  render () {
    return (
      <div className='main-container'>
        <Row>
          <Col span={12}>
            <h1 className='main'>
              <Link to='/experiments'>Experiments</Link> > {this.props.experiment.name}
            </h1>
          </Col>
          <Col span={12}>
            <Button
              style={{float: 'right', marginTop: '15px', fontSize: '13px'}}
              id={'buttonId'}
              type='primary'
              onClick={this.props.openDashboard}
              >
              Dashboard
            </Button>
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
        {this._renderContentOrGetStarted()}
      </div>
    )
  }
}
