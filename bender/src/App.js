import _ from 'lodash'
import React, { Component } from 'react'
import Experiment from './components/experiment'
import ExperimentList from './components/experiment-list'
import LeftMenu from './components/left-menu.js'
import ExperimentDashboard from './components/experiment-dashboard'

import 'whatwg-fetch'
import 'antd/dist/antd.css'
import './App.scss'

const mainViews = [
  'experiment-list',
  'experiment',
  'experimentDashboard'
]

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mainView: mainViews[0],
      viewID: null,
      experiments: [],
      selectedExperiment: null,
      trials: [],
      algos: []
    }

    this._renderMainView = this._renderMainView.bind(this)
    this._getSelectedExperiment = this._getSelectedExperiment.bind(this)
    this.moveToView = this.moveToView.bind(this)
    this.setSelectedExperiment = this.setSelectedExperiment.bind(this)
    this.fetchData = this.fetchData.bind(this)
  }

  componentDidMount () {
    fetch('http://127.0.0.1:8000/experiments/', {
      headers: {'Content-type': 'application/json'}
    })
    .then((res) => res.json())
    .then((json) => {
      this.setState({experiments: json})
    })
    // this.interval = setInterval(this.fetchData, 5000)
  }

  fetchData (experimentId) {
    this.setState({algos: [], trials: []})

    fetch('http://127.0.0.1:8000/trials_for_experiment/' + experimentId + '/', {
      headers: {'Content-type': 'application/json'}
    })
    .then((res) => res.json())
    .then((json) => {
      this.setState({trials: json})
    })
    fetch('http://127.0.0.1:8000/algos_for_experiment/' + experimentId + '/', {
      headers: {'Content-type': 'application/json'}
    })
    .then((res) => res.json())
    .then((json) => {
      this.setState({algos: json})
    })
  }

  _getSelectedExperiment () {
    return this.state.experiments.filter((e) => e.id === this.state.selectedExperiment)[0]
  }

  _renderMainView () {
    if (this.state.mainView === mainViews[0]) {
      return (
        <ExperimentList
          experiments={this.state.experiments}
          moveToView={this.moveToView}
          setSelectedExperiment={this.setSelectedExperiment}
          fetchData={this.fetchData}
        />
      )
    } else if (this.state.mainView === mainViews[1]) {
      return (
        <Experiment
          experiment={this._getSelectedExperiment()}
          moveToView={this.moveToView}
          trials={this.state.trials}
          algos={this.state.algos}
        />
      )
    } else if (this.state.mainView === mainViews[2]) {
      return (
        <ExperimentDashboard
          experiment={this._getSelectedExperiment()}
          moveToView={this.moveToView}
          trials={this.state.trials}
          algos={this.state.algos}
        />
      )
    }
  }

  moveToView (viewName, viewID) {
    this.setState({mainView: mainViews[_.findIndex(mainViews, (e) => e === viewName)]})
  }

  setSelectedExperiment (selectedExperiment) {
    this.setState({selectedExperiment})
  }

  render () {
    return (
      <div className='App'>
        <LeftMenu
          moveToView={this.moveToView}
        />
        {this._renderMainView()}
      </div>
    )
  }
}
