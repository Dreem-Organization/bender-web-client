import React, { Component } from 'react'
import { Modal, Button } from 'antd'
import ExperimentFormContent from './experiment-form-content'

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
  }
  showModal () {
    this.setState({visible: true})
  }

  handleSubmit () {
    this.setState({loading: true})
    setTimeout(() => {
      this.setState({ loading: false, visible: false })
    }, 3000)
  }

  handleCancel () {
    this.setState({ visible: false })
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
          width='800'
          footer={[
            <Button key='back' type='ghost' size='large' onClick={this.handleCancel}>Return</Button>,
            <Button key='submit' type='primary' size='large' loading={this.state.loading} onClick={this.handleSubmit}>
              Create
            </Button>
          ]}
        >
          <ExperimentFormContent />
        </Modal>
      </div>
    )
  }
}
