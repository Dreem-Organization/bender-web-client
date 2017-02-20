import React, { Component } from 'react'
import Experiment from './components/experiment.js'
import ExperimentList from './components/experiment-list'
import LoginForm from './components/login.js'
import LeftMenu from './components/left-menu.js'
import enUS from 'antd/lib/locale-provider/en_US'
import LocaleProvider from 'antd/lib/locale-provider'
import { storageKey } from './constants/globals'
import { Router, Route, browserHistory } from 'react-router'
import { checkTokenValidity } from './constants/utils'
import SignUpForm from './components/signup'
import 'whatwg-fetch'
import 'antd/dist/antd.css'
import './App.scss'

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
      algos: [],
      loggedIn: false,
      user: null
    }

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
    }
  }

  render () {
    return (
      <LocaleProvider locale={enUS}>
        <Router history={browserHistory}>
          <Route path='signup' component={SignUpForm} />
          <Route path='login' component={LoginForm} />
          <Route path='/' component={LoggedAppBase} onEnter={this.requireAuth}>
            <Route path='experiments' component={ExperimentList} onEnter={this.requireAuth} />
            <Route path='experiment/:experimentID' component={Experiment} onEnter={this.requireAuth} />
          </Route>
        </Router>
      </LocaleProvider>
    )
  }
}
