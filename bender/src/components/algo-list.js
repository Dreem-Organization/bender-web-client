import React, { Component } from 'react'
import _ from 'lodash'
import { Row, Col, Button, Tooltip } from 'antd'

export default class AlgoList extends Component {
  constructor (props) {
    super(props)

    this._getAlgoList = this._getAlgoList.bind(this)
  }

  _getAlgoList () {
    return _.map(this.props.algos, (algo) => {
      return (
        <div className='algolist-wrapper'>
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
                  {_.map(algo.parameters, (p) => <li>{p}</li>)}
                </ul>
              </Col>
              <Col span={12} style={{textAlign: 'right'}}>
                <Tooltip title='Click to copy'>
                  <Button
                    id={'buttonId'}
                    type='dashed'>
                    {algo.id}
                  </Button>
                </Tooltip>
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
