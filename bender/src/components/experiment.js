import React, { Component } from 'react'
import { fetchAlgos, fetchTrials, fetchExperiment } from '../constants/requests'
import ExperimentTrials from './experiment-trials'
import ExperimentDashboard from './experiment-dashboard'
import { getUserData } from '../constants/utils'
import Loader from './loader'

export default class Experiment extends Component {
  constructor (props) {
    super(props)

    this.state = {
      experiment: null,
      trials: [],
      algos: [],
      filters: {
        order: 'date',
        desc: 'true',
        limit: '30',
        algo: null
      },
      showDashboard: false,
      user: getUserData()
    }

    this.setFilters = this.setFilters.bind(this)
    this.handleDashboardButton = this.handleDashboardButton.bind(this)
  }

  componentDidMount () {
    this.fetchExperimentData(this.state.user.token, this.props.params.experimentID)
  }

  fetchExperimentData (token, experimentID) {
    this.setState({algos: [], trials: []})
    this.fetchExperiment(experimentID)
    this.fetchAlgos(experimentID)
    this.fetchTrials(experimentID, null)
  }

  fetchExperiment (experimentID) {
    fetchExperiment(this.state.user.token, experimentID, (experiment) => {
      this.setState({experiment})
    })
  }

  fetchTrials (experimentID, urlFilters) {
    fetchTrials(this.state.user.token, experimentID, urlFilters, (trials) => {
      this.setState({trials})
    })
  }

  fetchAlgos (experimentID) {
    fetchAlgos(this.state.user.token, experimentID, (algos) => {
      this.setState({algos})
    })
  }
  setFilters (filters) {
    this.setState({filters})
    let urlFilters = `?order=${filters.order}&algo=${filters.algo}&desc=${filters.desc}&limit=${filters.limit}`
    fetchTrials(this.state.user.token, this.state.experiment.id, urlFilters, (trials) => {
      this.setState({trials})
    })
  }

  handleDashboardButton () {
    this.setState({showDashboard: !this.state.showDashboard})
  }

  render () {
    if (this.state.experiment !== null) {
      if (!this.state.showDashboard) {
        return (
          <ExperimentTrials
            user={this.state.user}
            experiment={this.state.experiment}
            trials={this.state.trials}
            algos={this.state.algos}
            filters={this.state.filters}
            setFilters={this.setFilters}
            deleteTrial={this.deleteTrial}
            fetchExperimentData={this.fetchExperimentData}
            openDashboard={this.handleDashboardButton}
          />
        )
      } else {
        return (
          <ExperimentDashboard
            experiment={this.state.experiment}
            trials={this.state.trials}
            algos={this.state.algos}
            filters={this.state.filters}
            setFilters={this.setFilters}
            closeDashboard={() => this.setState({showDashboard: false})}
          />
        )
      }
    }
    return (<Loader />)
  }
}