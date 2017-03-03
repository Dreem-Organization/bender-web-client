import React, { Component } from 'react'
import _ from 'lodash'
import HomeChart from './home-chart'
import Trial from './trial'
import AlgoList from './algo-list'
import TrialFilterer from './trial-filterer'
import AlgoForm from './algo-form'
import { deleteTrial, deleteExperiment } from '../constants/requests'
import { Button, Row, Col, Tabs, Popconfirm, message, Input, Icon, Steps } from 'antd'
import { Link, browserHistory } from 'react-router'

const Step = Steps.Step

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

  _getTrialList () {
    const trialList = _.map(this.props.trials, (trial, i) => {
      return (
        <Trial
          key={i}
          trial={trial}
          mainMetric={this.props.experiment.metrics[0]}
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
          metrics={this.props.experiment.metrics}
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
    let trialsOrGetStarted
    if (this.props.trials.length < 1) {
      const algoForm = (
        <AlgoForm
          user={this.props.user}
          experiment={this.props.experiment}
          fetchExperimentData={this.props.fetchExperimentData}
          formButton={<Button size='small' type='ghost' style={{ marginTop: '10px' }}>Create Algo</Button>}
        />
      )
      trialsOrGetStarted = (
        <Steps
          current={this.props.algos.length < 1 ? 1 : 2}
          style={{ background: '#fff', padding: '30px', margin: '40px 0px', borderRadius: '6px' }}>
          <Step title='Experiment created' />
          <Step
            title={this.props.algos.length < 1 ? 'Create an Algo' : 'Algo Created'}
            description={<p>Click below to create your first algo. {algoForm}</p>}
            />
          <Step title='Send a trial' description='Install the Python client to send your first trial.' />
        </Steps>
      )
    } else {
      trialsOrGetStarted = (
        <div>
          {this._getHomeChart()}
          {this._getTrialList()}
        </div>
      )
    }
    return (
      <Tabs
        tabPosition={'top'}
        animated={false}
        defaultActiveKey={'0'}
        tabBarExtraContent={
          <TrialFilterer
            experiment={this.props.experiment}
            algos={this.props.algos}
            setFilters={this.props.setFilters}
            filters={this.props.filters}
          />
        }
      >
        <TabPane tab={<h4>Trials</h4>} key='0'>
          {trialsOrGetStarted}
        </TabPane>
        <TabPane tab={<h4>Algos</h4>} key='2'>
          <AlgoForm
            user={this.props.user}
            experiment={this.props.experiment}
            fetchExperimentData={this.props.fetchExperimentData}
            formButton={
              <Button
                type='primary'
                style={{margin: '15px 0px'}}
                className='custom-primary'>
                Create algo
              </Button>
              }
            />
          <AlgoList
            algos={this.props.algos}
            user={this.props.user}
            experimentID={this.props.experiment.id}
            fetchExperimentData={this.props.fetchExperimentData}
          />
        </TabPane>
        <TabPane tab={<h4>Infos</h4>} key='3'>
          <Popconfirm placement='top' title={'Are you sure ?'} onConfirm={this.handleDeleteExperiment} okText='Yes' cancelText='No'>
            <Button>Delete Experiment</Button>
          </ Popconfirm>
        </TabPane>
      </Tabs>
    )
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
              className='custom-primary'
              onClick={this.props.openDashboard}
              >
              Dashboard
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <i>by {this.props.experiment.author}</i>
            {this._renderDatasetLabel()}
          </Col>
          <Col span={6}>
            <Input
              addonAfter={<Icon type='link' />}
              defaultValue={this.props.experiment.id}
              value={this.props.experiment.id}
            />
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
