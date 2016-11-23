import React, { Component } from 'react'
import ExperimentListItem from './experiment-list-item'

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
        />
      )
    })
  }

  render () {
    return (
      <div className='main-container'>
        <h1 className='main'>Experiments</h1>
        <div className='experiment-list'>
          <ul>{this._getExperimentList()}</ul>
        </div>
      </div>
      )
  }
}
