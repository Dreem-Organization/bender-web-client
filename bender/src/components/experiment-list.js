import React, { Component } from 'react'
import ExperimentListItem from './experiment-list-item'
import ExperimentForm from './experiment-form'
import { Row, Col, Tabs, Badge } from 'antd'

const TabPane = Tabs.TabPane

export default class ExperimentList extends Component {
  constructor (props) {
    super(props)

    this._getExperimentList = this._getExperimentList.bind(this)
  }

  _getExperimentList () {
    return this.props.experiments.map((experiment, i) => {
      return (
        <ExperimentListItem
          key={i}
          experiment={experiment}
          moveToView={this.props.moveToView}
          fetchExperimentData={this.props.fetchExperimentData}
          setSelectedExperiment={this.props.setSelectedExperiment}
        />
      )
    })
  }

  render () {
    return (
      <div className='main-container'>
        <Row>
          <Col span={12}><h1 className='main'>Experiments - {this.props.user.username}</h1></Col>
          <Col span={12} style={{paddingTop: '15px'}}>
            <ExperimentForm
              createExperiment={this.props.createExperiment}
            />
          </Col>
        </Row>

          <Tabs
            defaultActiveKey='1'
            animated={false}
            >
            <TabPane tab={
                <h4>Private ({this.props.experiments.length})</h4>
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
