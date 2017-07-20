import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import Icon from 'antd/lib/icon'
import Tag from 'antd/lib/tag'
export default class Experiment extends Component {
    constructor(props) {
        super(props);

        this.handleExperimentClick = this.handleExperimentClick.bind(this)
    }

    handleExperimentClick() {
        browserHistory.push(`/experiment/${this.props.experiment.id}/`)
    }

    render() {
        return (
            <li className='experiment-list-item' onClick={this.handleExperimentClick}>
                <h3><Icon type={this.props.experiment.shared_with.length >= 1 ? 'team' : 'lock'}
                          style={{color: '#b6b5b5'}}/> {this.props.experiment.name}</h3>
                <div style={{marginTop: '5px'}}>
                    <Tag color='blue' style={{fontSize: '11px'}}>{this.props.experiment.owner}</Tag>
                </div>
                <div className='algo-count'>
                    <span>{this.props.experiment.algo_count}</span>
                    <br />algos
                </div>
                <div className='trial-count'>
                    <span>{this.props.experiment.trial_count}</span>
                    <br />trials
                </div>
            </li>
        )
    }
}
