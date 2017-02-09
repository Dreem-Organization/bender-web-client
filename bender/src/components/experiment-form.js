import _ from 'lodash'
import React, { Component } from 'react'
import { Modal, message } from 'antd'
import ExperimentFormContent from './experiment-form-content'
import { createExperiment } from '../constants/requests'
import { getUserData } from '../constants/utils'

export default class ExperimentForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      visible: false,
      user: getUserData()
    }

    this.showModal = this.showModal.bind(this)
    this.handleCreateExperiment = this.handleCreateExperiment.bind(this)
  }
  showModal () {
    this.setState({visible: true})
  }

  handleCreateExperiment (formValue) {
    this.setState({loading: true})
    debugger
    return createExperiment(this.state.user.token, {
      name: formValue.name,
      author: formValue.author,
      description: formValue.description,
      metrics: _.map(formValue.metrics.split(','), (m) => m.replace(/\s+/g, '')),
      dataset: formValue.dataset,
      dataset_parameters: formValue.dataset_parameters,
      is_private: formValue.is_private
    }, (resp) => {
      this.setState({ loading: false, visible: false })
      message.success('Experiment successfully created!')
      this.props.handleFetchExperiments()
    })
  }

  render () {
    return (
      <div>
        <div onClick={this.showModal}>
          {this.props.formButton}
        </div>
        <Modal
          visible={this.state.visible}
          title={<h3>Create a new experiment</h3>}
          onOk={this.handleSubmit}
          onCancel={() => this.setState({visible: false})}
          width='600px'
          footer={null}
        >
          <ExperimentFormContent
            handleCreateExperiment={this.handleCreateExperiment}
            username={this.state.user.username}
            loading={this.state.loading}
          />
        </Modal>
      </div>
    )
  }
}
