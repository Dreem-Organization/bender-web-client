import _ from 'lodash'
import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import ExperimentFormContent from './experiment-form-content'
import { createExperiment } from '../constants/requests'

export default class ExperimentForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      visible: false
    }

    this.showModal = this.showModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleCreateExperiment = this.handleCreateExperiment.bind(this)
  }
  showModal () {
    this.setState({visible: true})
  }

  handleSubmit () {
    this.setState({loading: true})
    this.handleCreateExperiment()
    setTimeout(() => {
      this.setState({ loading: false, visible: false })
    }, 1000)
  }

  handleCancel () {
    this.setState({ visible: false })
  }

  handleCreateExperiment (formValue) {
    return createExperiment(this.props.user.token, {
      name: formValue.name,
      author: formValue.author,
      description: formValue.description,
      metrics: _.map(formValue.metrics.split(','), (m) => m.replace(/\s+/g, '')),
      dataset: formValue.dataset,
      dataset_parameters: formValue.dataset_parameters
    }, (resp) => resp)
  }

  render () {
    return (
      <div>
        <Button style={{'float': 'right'}} type='primary' size='large' onClick={this.showModal}>
          Create Experiment
        </Button>
        <Modal
          visible={this.state.visible}
          title='Create a new experiment'
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          width='600px'
          footer={null}
        >
          <ExperimentFormContent
            handleCreateExperiment={this.handleCreateExperiment}
          />
        </Modal>
      </div>
    )
  }
}
