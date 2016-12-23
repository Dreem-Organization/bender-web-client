import React, { Component } from 'react'
import HomeChart from './home-chart'
import Trial from './trial'
import AlgoList from './algo-list'
import { Button, Row, Col, Tooltip, Tabs, Icon } from 'antd'
import Clipboard from 'clipboard'

const TabPane = Tabs.TabPane

export default class Experiment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      animateChart: true
    }
    this._getTrialList = this._getTrialList.bind(this)
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
      const trialList = this.props.trials.map((trial, i) => {
        return <Trial key={i} trial={trial} />
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

  _getHomeChart () {
    if (this.props.trials.length > 0) {
      return (
        <HomeChart
          trials={this.props.trials}
          algos={this.props.algos}
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
              <a onClick={() => this.props.moveToView('experiment-list')}>Experiments</a> > {this.props.experiment.name}
            </h1>
          </Col>
          <Col span={12}>
          <Button
            style={{float: 'right', marginTop: '15px', fontSize: '13px'}}
            id={'buttonId'}
            onClick={() => this.props.moveToView('experimentDashboard')}
            type='primary'>
            Dashboard
          </Button>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <i>by {this.props.experiment.author}</i>
            <span className='dataset-label'>{this.props.experiment.dataset}</span>
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
        <p className='experiment-description'>{this.props.experiment.description}</p>
        {this._getHomeChart()}
        <Tabs tabPosition={'top'} animated={false}>
          <TabPane tab={<h4>Latest Trials</h4>} key='1'>
            {this._getTrialList()}
          </TabPane>
          <TabPane tab={<h4>Algos</h4>} key='3'>
            <AlgoList algos={this.props.algos} />
          </TabPane>
          <TabPane tab={<h4>Infos</h4>} key='4'>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
