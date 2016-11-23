import React, { Component } from 'react'

export default class Trial extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
    this.state = {
      isExpanded: false
    }
  }

  handleClick () {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }

  render () {
    let trial
    if (this.state.isExpanded) {
      trial = (
        <li className='trial trial-expanded' onClick={this.handleClick}>
          <h2>{this.props.trial.name}</h2>
          <div className='date'>{this.props.trial.date}</div>
          <div className='score'><span>Loss:</span>{this.props.trial.score}</div>
          <h4>Parameters</h4>
          <table>
            <tbody>
              <tr>
                <td>Parameter 1</td>
                <td>Parameter 2</td>
                <td>Parameter 3</td>
              </tr>
              <tr>
                <td>12.2</td>
                <td>0.82</td>
                <td>'Gini'</td>
              </tr>
            </tbody>
          </table>
          <h4>Metrics</h4>
          <table>
            <tbody>
              <tr>
                <td>Metric 1</td>
                <td>Metric 2</td>
                <td>Metric 3</td>
              </tr>
              <tr>
                <td>12.2</td>
                <td>0.82</td>
                <td>0.97</td>
              </tr>
            </tbody>
          </table>
        </li>
      )
    } else {
      trial = (
        <li className='trial' onClick={this.handleClick}>
          <h3>{this.props.trial.name}</h3>
          <div className='date'>{this.props.trial.date}</div>
          <div className='score'>{this.props.trial.score}</div>
        </li>
      )
    }
    return trial
  }
}
