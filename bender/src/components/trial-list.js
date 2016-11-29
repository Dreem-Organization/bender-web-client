import React, { Component } from 'react'
import HomeChart from './home-chart'
import Trial from './trial'

export default class TrialList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      trials: []
    }
    this._getTrialList = this._getTrialList.bind(this)
  }

  componentDidMount () {
    fetch('http://127.0.0.1:8000/trials/', {
      headers: {'Content-type': 'application/json'}
    })
    .then((res) => res.json())
    .then((json) => {
      this.setState({trials: json})
      debugger
    })
  }

  _getTrialList () {
    return this.state.trials.map((trial, i) => {
      return <Trial key={i} trial={trial} />
    })
  }

  render () {
    return (
      <div className='main-container'>
        <h1 className='main'>Experiments > {this.props.experiment.name}</h1>
        <p className='author'>{this.props.experiment.author}</p>
        <p className='experiment-description'>{this.props.experiment.description}</p>
        <HomeChart items={this.state.trials} />
        <h3>Latest Trials:</h3>
        <div className='trial-list'>
          <ul>{this._getTrialList()}</ul>
        </div>
      </div>
      )
  }
}
