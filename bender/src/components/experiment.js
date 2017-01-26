import React, { Component } from 'react'
import { fetchAlgos, fetchTrials, fetchExperiment } from '../constants/requests'
import ExperimentTrials from './experiment-trials'
import { requireAuth } from '../constants/utils'
// import ExperimentDashboard from './experiment-dashboard'
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmZGNkYTIzOTQ2ZmE0OTA2YjZkMjExM2NlYzc3MWM3MCIsImV4cCI6MTQ4MzAwOTI3NywicGVybWlzc2lvbnMiOiJoZWFkYmFuZD1hZG1pbjtub2N0aXM9YWRtaW47ZHJlZW1lcj1hZG1pbjtjdXN0b21lcj1hZG1pbjtkYXRhc2V0PWFkbWluO25pZ2h0cmVwb3J0PWFkbWluO2RhdGF1cGxvYWQ9YWRtaW47ZGF0YXNhbXBsZT1hZG1pbjthbGdvcnl0aG09YWRtaW47cHJvZHVjdF90ZXN0aW5nPWFkbWluO3F1YWxpdHk9YWRtaW4ifQ.HucoCotbZpfs4H_g2noJIS_OzotSpSU4OULvwPfOg8E"

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
      user: null
    }
  }

  componentWillMount () {
    debugger
    requireAuth('a', 'b', (user) => this.setState({user}))
  }

  componentDidMount () {
    // requireAuth('a', 'b', (user) => this.setState({user}))
    this.fetchExperimentData(token, this.props.params.experimentID)
  }

  fetchExperimentData (token, experimentID) {
    this.setState({algos: [], trials: []})
    this.fetchExperiment(experimentID)
    this.fetchAlgos(experimentID)
    this.fetchTrials(experimentID, null)
  }

  fetchExperiment (experimentID) {
    fetchExperiment(token, experimentID, (experiment) => {
      this.setState({experiment})
    })
  }

  fetchTrials (experimentID, urlFilters) {
    fetchTrials(token, experimentID, urlFilters, (trials) => {
      this.setState({trials})
    })
  }

  fetchAlgos (experimentID) {
    fetchAlgos(token, experimentID, (algos) => {
      this.setState({algos})
    })
  }
  setFilters (filters) {
    this.setState({filters})
    let urlFilters = `?order=${filters.order}&algo=${filters.algo}&desc=${filters.desc}&limit=${filters.limit}`
    fetchTrials(this.state.selectedExperiment, urlFilters)
  }

  render () {
    if (this.state.experiment !== null) {
      return (
        <ExperimentTrials
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
      return null
    }
  }
}
