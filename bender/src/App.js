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

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIyZTExYmRkYmJhMjQ0MjYxYmQzYzA5NDM2MzhhNDVlYSIsImV4cCI6MTQ4MzAxMDM1NywicGVybWlzc2lvbnMiOiJoZWFkYmFuZD1hZG1pbjtub2N0aXM9YWRtaW47ZHJlZW1lcj1hZG1pbjtjdXN0b21lcj1hZG1pbjtkYXRhc2V0PWFkbWluO25pZ2h0cmVwb3J0PWFkbWluO2RhdGF1cGxvYWQ9YWRtaW47ZGF0YXNhbXBsZT1hZG1pbjthbGdvcnl0aG09YWRtaW47cXVhbGl0eT1kcmVlbWVyIn0.1qgUF_ToYjbxYM-IBjcr4y0xRpnXdPFIZurXSobuRRY'

const BASE_URL = 'https://api.rythm.co/v1/dreem/bender'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mainView: mainViews[0],
      viewID: null,
      experiments: [],
      selectedExperiment: null,
      trials: [],
      algos: [],
      filters: {
        order: 'date',
        desc: 'true',
        limit: '30',
        algo: null
      }
    }

    this._renderMainView = this._renderMainView.bind(this)
    this._getSelectedExperiment = this._getSelectedExperiment.bind(this)
    this.moveToView = this.moveToView.bind(this)
    this.setSelectedExperiment = this.setSelectedExperiment.bind(this)
    this.fetchExperimentData = this.fetchExperimentData.bind(this)
    this.setFilters = this.setFilters.bind(this)
    this.fetchExperiments = this.fetchExperiments.bind(this)
    this.fetchTrials = this.fetchTrials.bind(this)
    this.fetchAlgos = this.fetchAlgos.bind(this)
  }

  componentDidMount () {
    this.fetchExperiments()
  }

  fetchExperimentData (experimentId) {
    this.setState({algos: [], trials: []})
    this.fetchAlgos(experimentId)
    this.fetchTrials(experimentId, null)
    // this.interval = setInterval(this.fetchExperimentData(experimentId), 5000)
  }

  fetchExperiments () {
    fetch(`${BASE_URL}/experiments/`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': TOKEN
      }
    })
    .then((res) => res.json())
    .then((json) => {
      this.setState({experiments: json})
    })
  }

  fetchTrials (experimentId, urlFilters) {
    let url = `${BASE_URL}/experiments/${experimentId}/trials/`
    if (urlFilters != null) {
      url = url + urlFilters
    }
    fetch(url, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': TOKEN
      }
    })
    .then((res) => res.json())
    .then((json) => {
      this.setState({trials: json})
    })
  }

  fetchAlgos (experimentId) {
    fetch(`${BASE_URL}/experiments/${experimentId}/algos/`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': TOKEN
      }})
    .then((res) => res.json())
    .then((json) => {
      this.setState({algos: json})
    })
  }

  deleteTrial (trialId) {
    fetch(`${BASE_URL}/trials/${trialId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': TOKEN
      }
    })
  }

  createExperiment (experimentData) {
   fetch(`${BASE_URL}/experiments.json`, {
      method: 'POST',
      body: JSON.stringify(experimentData),
      headers: {
        'Authorization': TOKEN,
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
      .then((json) => {
        // this.fetchExperiments()
      })
  }

  _getSelectedExperiment () {
    return this.state.experiments.filter((e) => e.id === this.state.selectedExperiment)[0]
  }

  setFilters (filters) {
    this.setState({filters})
    let urlFilters = `?order=${filters.order}&algo=${filters.algo}&desc=${filters.desc}&limit=${filters.limit}`
    this.fetchTrials(this.state.selectedExperiment, urlFilters)
  }

  _renderMainView () {
    if (this.state.mainView === mainViews[0]) {
      return (
        <ExperimentList
          experiments={this.state.experiments}
          moveToView={this.moveToView}
          setSelectedExperiment={this.setSelectedExperiment}
          fetchExperimentData={this.fetchExperimentData}
          createExperiment={this.createExperiment}
        />
      )
    } else if (this.state.mainView === mainViews[1]) {
      return (
        <Experiment
          experiment={this._getSelectedExperiment()}
          moveToView={this.moveToView}
          trials={this.state.trials}
          algos={this.state.algos}
          filters={this.state.filters}
          setFilters={this.setFilters}
          deleteTrial={this.deleteTrial}
        />
      )
    } else if (this.state.mainView === mainViews[2]) {
      return (
        <ExperimentDashboard
          experiment={this._getSelectedExperiment()}
          moveToView={this.moveToView}
          trials={this.state.trials}
          algos={this.state.algos}
          filters={this.state.filters}
          setFilters={this.setFilters}
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
