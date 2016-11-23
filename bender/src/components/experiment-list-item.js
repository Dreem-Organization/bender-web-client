import React, { Component } from 'react'

export default class Experiment extends Component {
  constructor (props) {
    super(props)

    this.handleExperimentClick = this.handleExperimentClick.bind(this)
  }

  handleExperimentClick () {
    this.props.moveToView('trial-list', this.props.experiment.id)
  }

  render () {
    return (
      <li className='experiment-list-item' onClick={this.handleExperimentClick}>
        <h3>{this.props.experiment.name}</h3>
      </li>
    )
  }
 }
