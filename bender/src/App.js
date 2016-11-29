import _ from 'lodash'
import React, { Component } from 'react'
import logo from './images/logo.svg'
import TrialList from './components/trial-list'
import ExperimentList from './components/experiment-list'
import 'whatwg-fetch'
import './App.css'

const mainViews = [
  'experiment-list',
  'trial-list'
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
    fetch('http://127.0.0.1:8000/experiments/', {
      headers: {'Content-type': 'application/json'}
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
        <TrialList
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
        <div className='App-header'>
          <a href='/'>
            <img src={logo} className='App-logo' alt='logo' />
          </a>
          <h1 className='logo'>BENDER</h1>
        </div>
        {this._renderMainView()}
        <br/><br/>
      </div>
    )
  }
}
