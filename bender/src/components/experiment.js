import React, { Component } from 'react'
import HomeChart from './home-chart'
import Trial from './trial'
import { Button, Icon, Row, Col, Tooltip } from 'antd'

const ButtonGroup = Button.Group;

export default class Experiment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      trials: []
    }
    this._getTrialList = this._getTrialList.bind(this)
    this._getHomeChart = this._getHomeChart.bind(this)
  }

  componentDidMount () {
    fetch('http://127.0.0.1:8000/trials_for_experiment/' + this.props.experiment.id + '/', {
      headers: {'Content-type': 'application/json'}
    })
    .then((res) => res.json())
    .then((json) => {
      this.setState({trials: json})
    })
  }

  _getTrialList () {
    return this.state.trials.map((trial, i) => {
      return <Trial key={i} trial={trial} />
    })
  }

  _getHomeChart () {
      if (this.state.trials.length > 0) {
          return (<HomeChart items={this.state.trials} />)
      } else {
          return (null)
      }
  }

  render () {
    return (
      <div className='main-container'>
        <h1 className='main'>
          <a onClick={() => this.props.moveToView('experiment-list')}>Experiments</a> > {this.props.experiment.name}
        </h1>
        <Row>
            <Col span={12}>
                <i>by {this.props.experiment.author}</i>
            </Col>
            <Col span={12}>
                <Tooltip title='Click to copy'>
                    <Button style={{float: 'right'}} type='dashed'>67T8EZ6TZ8ED675Z4DRFE</Button>
                </Tooltip>
            </Col>
        </Row>
        <p className='experiment-description'>{this.props.experiment.description}</p>
        {this._getHomeChart()}
        <h3 style={{marginBottom: 5}}>Latest Trials:</h3>
        <div className='trial-list'>
          <ul>{this._getTrialList()}</ul>
        </div>
      </div>
      )
  }
}
