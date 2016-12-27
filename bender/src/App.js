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
    fetch('https://api.rythm.co/v1/dreem/bender/experiments/', {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2ZDExNTY0YzczM2U0MDhkYTRiYzVlZWYxNjE5NTMxZiIsImV4cCI6MTQ3MTQ2MDE4NiwicGVybWlzc2lvbnMiOiJoZWFkYmFuZD10ZWFtO25vY3Rpcz1hZG1pbjtkcmVlbWVyPXRlYW07Y3VzdG9tZXI9dGVhbTtkYXRhc2V0PXRlYW07bmlnaHRyZXBvcnQ9dGVhbTtkYXRhdXBsb2FkPWFkbWluO2RhdGFzYW1wbGU9dGVhbTthbGdvcnl0aG09dGVhbTtwcm9kdWN0X3Rlc3Rpbmc9dGVhbSJ9.JRDPQVQGZWvd9C6UMNtG2Q0tDxbMgqSk21r6UI8C38w'
      }
    })
    .then((res) => res.json())
    .then((json) => {
      this.setState({experiments: json})
    })
    // this.interval = setInterval(this.fetchData, 5000)
  }

  fetchData (experimentId) {
    this.setState({algos: [], trials: []})
    fetch('https://api.rythm.co/v1/dreem/bender/experiments/' + experimentId + '/trials/', {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2ZDExNTY0YzczM2U0MDhkYTRiYzVlZWYxNjE5NTMxZiIsImV4cCI6MTQ3MTQ2MDE4NiwicGVybWlzc2lvbnMiOiJoZWFkYmFuZD10ZWFtO25vY3Rpcz1hZG1pbjtkcmVlbWVyPXRlYW07Y3VzdG9tZXI9dGVhbTtkYXRhc2V0PXRlYW07bmlnaHRyZXBvcnQ9dGVhbTtkYXRhdXBsb2FkPWFkbWluO2RhdGFzYW1wbGU9dGVhbTthbGdvcnl0aG09dGVhbTtwcm9kdWN0X3Rlc3Rpbmc9dGVhbSJ9.JRDPQVQGZWvd9C6UMNtG2Q0tDxbMgqSk21r6UI8C38w'
      }
    })
    .then((res) => res.json())
    .then((json) => {
      this.setState({trials: json})
    })

    fetch('https://api.rythm.co/v1/dreem/bender/experiments/' + experimentId + '/algos/', {
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI2ZDExNTY0YzczM2U0MDhkYTRiYzVlZWYxNjE5NTMxZiIsImV4cCI6MTQ3MTQ2MDE4NiwicGVybWlzc2lvbnMiOiJoZWFkYmFuZD10ZWFtO25vY3Rpcz1hZG1pbjtkcmVlbWVyPXRlYW07Y3VzdG9tZXI9dGVhbTtkYXRhc2V0PXRlYW07bmlnaHRyZXBvcnQ9dGVhbTtkYXRhdXBsb2FkPWFkbWluO2RhdGFzYW1wbGU9dGVhbTthbGdvcnl0aG09dGVhbTtwcm9kdWN0X3Rlc3Rpbmc9dGVhbSJ9.JRDPQVQGZWvd9C6UMNtG2Q0tDxbMgqSk21r6UI8C38w'
      }
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
