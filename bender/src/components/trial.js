import React, { Component } from 'react'
import TimeAgo from 'react-timeago'


export default class Trial extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.state = {
      isExpanded: false,
      main_metric: {
        name: Object.keys(this.props.trial.results)[0],
        value: this.props.trial.results[Object.keys(this.props.trial.results)[0]]
      }
    }
  }

  handleClick () {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render () {
    let trial
    debugger
    if (this.state.isExpanded) {
      trial = (
        <li className='trial trial-expanded' onClick={this.handleClick}>
          <h2>{this.props.trial.algo_name}</h2>
          <div className='date'>
            <TimeAgo date={this.props.trial.created} />
          </div>
          <div className='score'><span>{this.state.main_metric.name}:</span>{this.state.main_metric.value}</div>
          <br />
          <h4>Parameters</h4>
          <table>
            <tbody>
              <tr>{Object.keys(this.props.trial.parameters).map((e) => <td>{e}</td>)}</tr>
              <tr>{Object.values(this.props.trial.parameters).map((e) => <td>{e}</td>)}</tr>
            </tbody>
          </table>
          <h4>Metrics</h4>
          <table>
            <tbody>
              <tr>{Object.keys(this.props.trial.results).map((e) => <td>{e}</td>)}</tr>
              <tr>{Object.values(this.props.trial.results).map((e) => <td>{e}</td>)}</tr>
            </tbody>
          </table>
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
