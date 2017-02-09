import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { Icon } from 'antd'

export default class Experiment extends Component {
  constructor (props) {
    super(props)

    this.handleExperimentClick = this.handleExperimentClick.bind(this)
  }

  handleExperimentClick () {
    browserHistory.push(`/experiment/${this.props.experiment.id}/`)
  }

  render () {
    return (
      <li className='experiment-list-item' onClick={this.handleExperimentClick}>
        <h3><Icon type={this.props.experiment.is_private ? 'lock' : 'team'} style={{color: '#b6b5b5'}} /> {this.props.experiment.name}</h3>
        <i className='author'>by {this.props.experiment.author}</i>
        <div className='algo-count'>
          <span>{this.props.experiment.algo_count}</span>
          <br />algos
        </div>
        <div className='trial-count'>
          <span>{this.props.experiment.trial_count}</span>
          <br />trials
        </div>
      </li>
    )
  }
 }
