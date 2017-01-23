import _ from 'lodash'
import React, { Component } from 'react'
import Experiment from './components/experiment'
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
import { Router, Route, browserHistory } from 'react-router'

const BASE_URL = 'https://api.rythm.co/v1/dreem/bender'

function checkTokenValidity (token) {
  if (!token) {
    return false
  }
  const tokenParts = _.split(token, '.')
  if (tokenParts.length !== 3) {
    return false
  }
  if (process.env.NODE_ENV === 'production') {
    try {
      const userInfo = JSON.parse(window.atob(tokenParts[1]))
      if (userInfo.exp != null) {
        const expiration = +userInfo.exp
        if (_.isNaN(expiration)) {
          return false
        }
        if (expiration * 1000 - Date.now() < 3600000) {
          return false
        }
      }
    } catch (e) {
      return false
    }
  }
  return true
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

    this._renderLoginForm = this._renderLoginForm.bind(this)
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
      this.fetchExperiments(user.token)
    }
  }

  fetchExperimentData (experimentId) {
    this.setState({algos: [], trials: []})
    this.fetchAlgos(experimentId)
    this.fetchTrials(experimentId, null)
    // this.interval = setInterval(this.fetchExperimentData(experimentId), 5000)
  }

  fetchExperiments (token) {
    fetch(`${BASE_URL}/experiments/`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': token
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
        'Authorization': this.state.user.token
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
        'Authorization': this.state.user.token
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
        'Authorization': this.state.user.token
      }
    })
  }

  createExperiment (experimentData) {
    fetch(`${BASE_URL}/experiments.json`, {
      method: 'POST',
      body: JSON.stringify(experimentData),
      headers: {
        'Authorization': this.state.user.token,
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

  handleLogin (user) {
    this.setState({user, loggedIn: true})
    this.fetchExperiments(user.token)
  }

  setSelectedExperiment (selectedExperiment) {
    this.setState({selectedExperiment})
  }

  _renderLoginForm () {
    const loginForm = (
      <LoginForm
        handleLogin={this.handleLogin}
      />
    )

    return this.wrapComponent(loginForm)
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

    return this.wrapComponent(experimentList)
  }

  _renderExperiment () {
    const experiment = (
      <Experiment
        experiment={this._getSelectedExperiment()}
        trials={this.state.trials}
        algos={this.state.algos}
        filters={this.state.filters}
        setFilters={this.setFilters}
        deleteTrial={this.deleteTrial}
        fetchExperimentData={this.fetchExperimentData}
      />
    )

    return this.wrapComponent(experiment)
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

    return this.wrapComponent(experimentDashboard)
  }

  wrapComponent (component) {
    return (
      <div className='App'>
        <LeftMenu
          isLoggedIn={this.stateloggedIn}
        />
        {component}
      </div>
    )
  }

  render () {
    return (
      <LocaleProvider locale={enUS}>
        <Router history={browserHistory}>
          <Route path='/' component={this._renderExperimentList} onEnter={this.requireAuth} />
          <Route path='login' component={this._renderLoginForm} />
          <Route path='experiment' component={this.baseExperiment} />
          <Route path='experiment/:experimentID' component={this._renderExperiment} />
          <Route path='experiment/:experimentID/dashboard' component={this._renderExperimentDashboard} />
        </Router>
      </LocaleProvider>
    )
  }
}
