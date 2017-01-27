import _ from 'lodash'
import React, { Component } from 'react'
import { Modal } from 'antd'
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
    return createExperiment(this.state.user.token, {
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
        <div onClick={this.showModal}>
          {this.props.formButton}
        </div>
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
            username={this.state.user.username}
          />
        </Modal>
      </div>
    )
  }
}
