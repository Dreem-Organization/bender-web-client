import React, { Component } from 'react'
import TimeAgo from 'react-timeago'
import { Row, Col, Button } from 'antd'
import _ from 'lodash'


const deleteButtonStyle = {
  float: 'right',
  margin: '5px'
}

export default class Trial extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.state = {
      isExpanded: false,
      main_metric: {
        name: this.props.mainMetric,
        value: _.round(this.props.trial.results[this.props.mainMetric], 3)
      }
    }
  }

  handleClick () {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  _renderTableFromObject (obj, title) {
    if (Object.values(obj).length >= 1) {
      return (
        <div style={{margin: '5px'}}>
          <h4>{title}</h4>
          <table>
            <tbody>
              {Object.keys(obj).map((e, i) => <tr key={i}><td>{e}</td><td>{obj[e]}</td></tr>)}
            </tbody>
          </table>
        </div>
      )
    }
    return null
  }

  render () {
    let trial
    if (this.state.isExpanded) {
      trial = (
        <li className='trial-expanded'>
          <div className='trial trial-expanded-header' onClick={this.handleClick}>
            <h2>{this.props.trial.algo_name}</h2>
            <div className='date'>
              <TimeAgo date={this.props.trial.created} />
            </div>
            <div className='score'>
              <span>{this.state.main_metric.name}:</span>
              {this.state.main_metric.value}
            </div>
          </div>
          <div className='trial-expanded-content'>
            <q>{this.props.trial.comment}</q>
            <Row>
              <Col span={12}>
                {this._renderTableFromObject(this.props.trial.parameters, 'Parameters')}
              </Col>
              <Col span={12}>
                {this._renderTableFromObject(this.props.trial.results, 'Metrics')}
              </Col>
              <Button style={deleteButtonStyle} type='default'>Delete</Button>
            </Row>
          </div>
        </li>
      )
    } else {
      trial = (
        <li className='trial' onClick={this.handleClick}>
          <h3>{this.props.trial.algo_name}</h3>
          <div className='date'>
            <TimeAgo date={this.props.trial.created} />
          </div>
          <div className='score'><span>{this.state.main_metric.name}:</span>{this.state.main_metric.value}</div>
        </li>
      )
    }
    return trial
  }
}
