import _ from 'lodash'
import React, { Component } from 'react'
import { Modal, message } from 'antd'
import AlgoFormContent from './algo-form-content'
import { createAlgo } from '../constants/requests'
import { getUserData } from '../constants/utils'

export default class AlgoForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      visible: false,
      user: getUserData()
    }

    this.showModal = this.showModal.bind(this)
    this.handleCreateAlgo = this.handleCreateAlgo.bind(this)
  }
  showModal () {
    this.setState({visible: true})
  }

  handleCreateAlgo (formValue) {
    this.setState({loading: true})
    return createAlgo(this.state.user.token, {
      name: formValue.name,
      parameters: _.chain(formValue.parameters.split(','))
                   .map((m) => m.replace(/\s+/g, ''))
                   .filter((m) => m !== '')
                   .value(),
      experiment: this.props.experiment.id
    }, (resp) => {
      this.setState({ loading: false, visible: false })
      message.success('Algo successfully created!')
      this.props.fetchExperimentData(this.props.user.token, this.props.experiment.id)
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
          title={<h3>Create an Algo</h3>}
          onOk={this.handleSubmit}
          onCancel={() => this.setState({visible: false})}
          width='600px'
          footer={null}
        >
          <AlgoFormContent
            username={this.state.user.username}
            loading={this.state.loading}
            handleCreateAlgo={this.handleCreateAlgo}
          />
        </Modal>
      </div>
    )
  }
}
