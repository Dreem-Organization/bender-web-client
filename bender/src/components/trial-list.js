import React, { Component } from 'react'
import HomeChart from './home-chart'
import Trial from './trial'

export default class TrialList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      trials: [
        {
          'id': 1,
          'name': 'Neural Network',
          'author': 'Stan',
          'date': '15/11/2016',
          'score': 0.86,
          'parameter': 80,
          'comment': ''
        },
        {
          'id': 2,
          'name': 'Neural Network',
          'author': 'soukiassianb',
          'date': '15/11/2016',
          'score': 0.68,
          'parameter': 47,
          'comment': ''
        },
        {
          'id': 3,
          'name': 'Neural Network',
          'author': 'Vthorey',
          'date': '15/11/2016',
          'score': 0.74,
          'parameter': 78,
          'comment': ''
        },
        {
          'id': 4,
          'name': 'Neural Network',
          'author': 'Stan',
          'date': '15/11/2016',
          'score': 0.83,
          'parameter': 80,
          'comment': ''
        },
        {
          'id': 5,
          'name': 'Neural Network',
          'author': 'Vthorey',
          'date': '15/11/2016',
          'score': 0.8,
          'parameter': 80,
          'comment': ''
        },
        {
          'id': 6,
          'name': 'Neural Network',
          'author': 'Vthorey',
          'date': '15/11/2016',
          'score': 0.74,
          'parameter': 78,
          'comment': ''
        },
        {
          'id': 7,
          'name': 'Neural Network',
          'author': 'Stan',
          'date': '15/11/2016',
          'score': 0.83,
          'parameter': 80,
          'comment': ''
        },
        {
          'id': 8,
          'name': 'Neural Network',
          'author': 'Vthorey',
          'date': '15/11/2016',
          'score': 0.8,
          'parameter': 80,
          'comment': ''
        },
        {
          'id': 9,
          'name': 'Neural Network',
          'author': 'Vthorey',
          'date': '15/11/2016',
          'score': 0.74,
          'parameter': 78,
          'comment': ''
        },
        {
          'id': 10,
          'name': 'Neural Network',
          'author': 'Stan',
          'date': '15/11/2016',
          'score': 0.83,
          'parameter': 80,
          'comment': ''
        },
        {
          'id': 11,
          'name': 'Neural Network',
          'author': 'Vthorey',
          'date': '15/11/2016',
          'score': 0.74,
          'parameter': 78,
          'comment': ''
        },
        {
          'id': 12,
          'name': 'Neural Network',
          'author': 'Stan',
          'date': '15/11/2016',
          'score': 0.53,
          'parameter': 80,
          'comment': ''
        },
        {
          'id': 13,
          'name': 'Neural Network',
          'author': 'Stan',
          'date': '15/11/2016',
          'score': 0.91,
          'parameter': 80,
          'comment': ''
        }
      ]
    }

    this._getTrialList = this._getTrialList.bind(this)
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
        Latest Trials:
        <div className='trial-list'>
          <ul>{this._getTrialList()}</ul>
        </div>
      </div>
      )
  }
}
