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
      trials: null,
      algos: null,
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
    this.fetchExperimentData = this.fetchExperimentData.bind(this)
  }

  componentDidMount () {
    this.fetchExperimentData(this.state.user.token, this.props.params.experimentID)
  }

  fetchExperimentData (token, experimentID) {
    this.setState({algos: null, trials: null})
    this.fetchExperiment(experimentID)
    this.fetchAlgos(experimentID)
    this.fetchTrials(experimentID, null)
  }

  fetchExperiment (experimentID) {
    fetchExperiment(this.state.user.token, this.state.user.username, experimentID, (experiment) => {
      this.setState({experiment})
    })
  }

  fetchTrials (experimentID, urlFilters) {
    fetchTrials(this.state.user.token, experimentID, urlFilters, (resp) => {
      const trials = resp.results
      this.setState({trials})
    })
  }

  fetchAlgos (experimentID) {
    fetchAlgos(this.state.user.token, experimentID, (resp) => {
      const algos = resp.results
      this.setState({algos})
    })
  }

  setFilters (filters) {
    let urlFilters = ''
    const desc = filters.desc === 'true' ? '' : '-'

    urlFilters += `&o_results=${desc}${filters.order}`
    urlFilters += `&limit=${filters.limit}`

    if (filters.algo !== null) {
      urlFilters += `&algo=${filters.algo}`
    }

    fetchTrials(this.state.user.token, this.state.experiment.id, urlFilters, (resp) => {
      const trials = resp.results
      this.setState({trials, filters})
    })
  }

  render () {
    if (this.state.experiment !== null && this.state.trials !== null && this.state.algos !== null) {
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
