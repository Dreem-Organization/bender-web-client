import React, {Component} from 'react'
import _ from 'lodash'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Button from 'antd/lib/button'
import Popconfirm from 'antd/lib/popconfirm'
import message from 'antd/lib/message'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'

import {deleteAlgo} from '../constants/requests'

export default class AlgoList extends Component {
    constructor(props) {
        super(props);

        this._getAlgoList = this._getAlgoList.bind(this);
        this.handleDeleteAlgo = this.handleDeleteAlgo.bind(this)
    }

    handleDeleteAlgo(algoID) {
        deleteAlgo(this.props.user.token, algoID, () => {
            message.success('Algo deleted!');
            this.props.fetchExperimentData(this.props.user.token, this.props.experimentID)
        })
    }

    _getAlgoList() {
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
                                    addonAfter={<Icon type='link'/>}
                                    defaultValue={algo.id}
                                    value={algo.id}
                                />
                                <br />
                                <Popconfirm placement='top' title={'Are you sure ?'}
                                            onConfirm={() => this.handleDeleteAlgo(algo.id)} okText='Yes'
                                            cancelText='No'>
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

    render() {
        return (
            <div>
                {this._getAlgoList()}
            </div>
        )
    }
}
