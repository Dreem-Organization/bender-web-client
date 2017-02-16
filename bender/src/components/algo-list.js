import React, { Component } from 'react'
import _ from 'lodash'
import Clipboard from 'clipboard'
import { Row, Col, Button, Popconfirm, message, Input, Icon } from 'antd'
import { deleteAlgo } from '../constants/requests'

export default class AlgoList extends Component {
  constructor (props) {
    super(props)

    this._getAlgoList = this._getAlgoList.bind(this)
    this.handleDeleteAlgo = this.handleDeleteAlgo.bind(this)
  }

  componentDidMount () {
    this.clipboard = new Clipboard(
      '#buttonId', {
        target: () => document.getElementById('inputId')
      }
    )
  }

  handleDeleteAlgo (algoID) {
    deleteAlgo(this.props.user.token, algoID)
    message.success('Algo deleted!')
  }

  _getAlgoList () {
    return _.map(this.props.algos, (algo) => {
      return (
        <div className='algolist-wrapper' key={algo.id}>
          <Row className='algolist-header'>
            <Col span={12}>
              <h3>{algo.name}</h3>
            </Col>
            <Col span={12} style={{textAlign: 'right'}}>
              <b>{algo.trial_count} trials</b>
            </Col>
          </Row>
          <div className='algolist-content'>
            <Row>
              <Col span={12}>
                <h4>Required Parameters:</h4>
                <ul>
                  {_.map(algo.parameters, (p) => <li key={p}>{p}</li>)}
                </ul>
              </Col>
              <Col span={12} style={{textAlign: 'right'}}>
                <Input
                  addonAfter={<Icon type='link' />}
                  defaultValue={algo.id}
                  value={algo.id}
                />
                <br />
                <Popconfirm placement='top' title={'Are you sure ?'} onConfirm={() => this.handleDeleteAlgo(algo.id)} okText='Yes' cancelText='No'>
                  <Button
                    id={'buttonId'}>
                    Delete
                  </Button>
                </Popconfirm>
              </Col>
            </Row>
          </div>
        </div>
      )
    })
  }

  render () {
    return (
      <div>
        {this._getAlgoList()}
      </div>
    )
  }
}
