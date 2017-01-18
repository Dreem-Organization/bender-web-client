import React, { Component } from 'react'

export default class Experiment extends Component {
  constructor (props) {
    super(props)

    this.handleExperimentClick = this.handleExperimentClick.bind(this)
  }

  handleExperimentClick () {
    this.props.moveToView('experiment')
    this.props.fetchExperimentData(this.props.experiment.id)
    this.props.setSelectedExperiment(this.props.experiment.id)
  }

  render () {
    return (
      <li className='experiment-list-item' onClick={this.handleExperimentClick}>
        <h3>{this.props.experiment.name}</h3>
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
