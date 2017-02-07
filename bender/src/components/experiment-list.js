import React, { Component } from 'react'
import ExperimentListItem from './experiment-list-item'
import ExperimentForm from './experiment-form'
import { Row, Col, Tabs, Button } from 'antd'
import { getUserData } from '../constants/utils'
import { fetchExperiments } from '../constants/requests'

const TabPane = Tabs.TabPane

export default class ExperimentList extends Component {
  constructor (props) {
    super(props)

    this._getExperimentList = this._getExperimentList.bind(this)
    this.handleFetchExperiments = this.handleFetchExperiments.bind(this)
    this.state = {
      user: getUserData(),
      experiments: []
    }
  }

  _getExperimentList () {
    return this.state.experiments.map((experiment, i) => {
      return (
        <ExperimentListItem
          key={i}
          experiment={experiment}
          fetchExperimentData={this.props.fetchExperimentData}
          setSelectedExperiment={this.props.setSelectedExperiment}
        />
      )
    })
  }

  componentDidMount () {
    this.handleFetchExperiments()
  }

  handleFetchExperiments () {
    fetchExperiments(this.state.user.token, (json) => {
      this.setState({experiments: json})
    })
  }

  render () {
    const formButton = (
      <Button style={{'float': 'right'}} type='primary' size='large'>
        Create Experiment
      </Button>
    )
    return (
      <div className='main-container'>
        <Row>
          <Col span={12}><h1 className='main'>Experiments</h1></Col>
          <Col span={12} style={{paddingTop: '15px'}}>
            <ExperimentForm
              user={this.state.user}
              formButton={formButton}
              handleFetchExperiments={this.handleFetchExperiments}
            />
          </Col>
        </Row>
        <Tabs
          defaultActiveKey='1'
          animated={false}
          >
          <TabPane tab={
              <h4>Private ({this.state.experiments.length})</h4>
            } key='1'>
            <div className='experiment-list'>
              <ul>{this._getExperimentList()}</ul>
            </div>
          </TabPane>
          <TabPane tab={<h4>Public</h4>} key='2'>
            Public experiments
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
