import _ from 'lodash'
import React, { Component } from 'react'
import Experiment from './components/experiment.js'
import ExperimentTrials from './components/experiment-trials'
import ExperimentList from './components/experiment-list'
import LoginForm from './components/login.js'
import LeftMenu from './components/left-menu.js'
import ExperimentDashboard from './components/experiment-dashboard'
import 'whatwg-fetch'
import 'antd/dist/antd.css'
import './App.scss'
import enUS from 'antd/lib/locale-provider/en_US'
import LocaleProvider from 'antd/lib/locale-provider'
import { storageKey } from './constants/globals'
import { checkTokenValidity } from './constants/utils'
import { Router, Route, browserHistory } from 'react-router'
import { fetchExperiments, fetchTrials, fetchAlgos, deleteTrial, createExperiment } from './constants/requests'

class LoggedAppBase extends Component {
  render () {
    return (
      <div className='App'>
        <LeftMenu />
        {this.props.children}
      </div>
    )
  }
}

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      experiments: [],
      selectedExperiment: null,
      trials: [],
      algos: [],
      filters: {
        order: 'date',
        desc: 'true',
        limit: '30',
        algo: null
      },
      loggedIn: false,
      user: null
    }

    this._getSelectedExperiment = this._getSelectedExperiment.bind(this)
    this.setSelectedExperiment = this.setSelectedExperiment.bind(this)
    this.fetchExperimentData = this.fetchExperimentData.bind(this)
    this.setFilters = this.setFilters.bind(this)
    this.fetchExperiments = this.fetchExperiments.bind(this)
    this.fetchTrials = this.fetchTrials.bind(this)
    this.fetchAlgos = this.fetchAlgos.bind(this)
    this.handleLogin = this.handleLogin.bind(this)

    this._renderExperimentList = this._renderExperimentList.bind(this)
    this._renderExperiment = this._renderExperiment.bind(this)
    this._renderExperimentDashboard = this._renderExperimentDashboard.bind(this)

    this.requireAuth = this.requireAuth.bind(this)
  }

  requireAuth (nextState, replace) {
    const user = window.localStorage.getItem(storageKey.user)
    const token = window.localStorage.getItem(storageKey.token)

    if (!user || !checkTokenValidity(token)) {
      replace({
        pathname: '/login',
        state: {
          nextPathname: nextState.location.pathname
        }
      })
    } else {
      const user = {
        id: window.localStorage.getItem(storageKey.user),
        username: window.localStorage.getItem(storageKey.username),
        token: window.localStorage.getItem(storageKey.token)
      }
      this.setState({user})
      // this.fetchExperiments(user.token)
    }
  }

  fetchExperimentData (experimentID) {
    this.setState({algos: [], trials: []})
    this.fetchAlgos(experimentID)
    this.fetchTrials(experimentID, null)
  }

  fetchExperiments (token) {
    fetchExperiments(token, (json) => {
      this.setState({experiments: json})
    })
  }

  fetchTrials (experimentID, urlFilters) {
    fetchTrials(this.state.user.token, experimentID, urlFilters, (json) => {
      this.setState({trials: json})
    })
  }

  fetchAlgos (experimentID) {
    fetchAlgos(this.state.user.token, experimentID, (json) => {
      this.setState({algos: json})
    })
  }

  deleteTrial (trialId) {
    deleteTrial(this.state.user.token, trialId)
  }

  createExperiment (experimentData) {
    createExperiment(this.state.user.token, experimentData, (json) => {})
  }

  _getSelectedExperiment () {
    return this.state.experiments.filter((e) => e.id === this.state.selectedExperiment)[0]
  }

  setFilters (filters) {
    this.setState({filters})
    let urlFilters = `?order=${filters.order}&algo=${filters.algo}&desc=${filters.desc}&limit=${filters.limit}`
    this.fetchTrials(this.state.selectedExperiment, urlFilters)
  }

  handleLogin (user) {
    this.setState({user, loggedIn: true})
    this.fetchExperiments(user.token)
    browserHistory.push('/experiments')
  }

  setSelectedExperiment (selectedExperiment) {
    this.setState({selectedExperiment})
  }

  _renderExperimentList () {
    const experimentList = (
      <ExperimentList
        user={this.state.user}
        experiments={this.state.experiments}
        setSelectedExperiment={this.setSelectedExperiment}
        fetchExperimentData={this.fetchExperimentData}
        createExperiment={this.createExperiment}
      />
    )

    return experimentList
  }

  _renderExperiment () {
    const experiment = (
      <ExperimentTrials
        experiment={this._getSelectedExperiment()}
        trials={this.state.trials}
        algos={this.state.algos}
        filters={this.state.filters}
        setFilters={this.setFilters}
        deleteTrial={this.deleteTrial}
        fetchExperimentData={this.fetchExperimentData}
      />
    )

    return experiment
  }

  _renderExperimentDashboard () {
    const experimentDashboard = (
      <ExperimentDashboard
        experiment={this._getSelectedExperiment()}
        trials={this.state.trials}
        algos={this.state.algos}
        filters={this.state.filters}
        setFilters={this.setFilters}
      />
    )

    return experimentDashboard
  }

  render () {
    return (
      <LocaleProvider locale={enUS}>
        <Router history={browserHistory}>
          <Route path='login' component={() => <LoginForm user={this.state.user} handleLogin={this.handleLogin} />} />
          <Route path='/' component={LoggedAppBase} onEnter={this.requireAuth}>
            <Route path='experiments' component={ExperimentList} onEnter={this.requireAuth} />
            <Route path='experiment/:experimentID' component={Experiment} onEnter={this.requireAuth} />
          </Route>
        </Router>
      </LocaleProvider>
    )
  }
}
