import _ from 'lodash'
import React, { Component } from 'react'
import Experiment from './components/experiment'
import ExperimentList from './components/experiment-list'
import LeftMenu from './components/left-menu.js'

import 'whatwg-fetch'
import 'antd/dist/antd.css'
import './App.css'

const mainViews = [
  'experiment-list',
  'experiment'
]

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mainView: mainViews[0],
      viewID: null,
      experiments: [],
      selectedExperiment: null
    }

    this._renderMainView = this._renderMainView.bind(this)
    this._getSelectedExperiment = this._getSelectedExperiment.bind(this)
    this.moveToView = this.moveToView.bind(this)
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
        />
      )
    } else if (this.state.mainView === mainViews[1]) {
      return (
        <Experiment
          experiment={this._getSelectedExperiment()}
          moveToView={this.moveToView}
        />
      )
    }
  }

  moveToView (viewName, viewID) {
    this.setState({
      mainView: mainViews[_.findIndex(mainViews, (e) => e === viewName)],
      selectedExperiment: viewID
    })
  }

  render () {
    return (
      <div className='App'>
        <LeftMenu />
        {this._renderMainView()}
        <br />
      </div>
    )
  }
}
