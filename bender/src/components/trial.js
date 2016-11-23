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
          <div className='author'>{this.props.trial.author}</div>
          <div className='score'>{this.props.trial.score}</div>
          <div></div>
        </li>
      )
    } else {
      trial = (
        <li className='trial' onClick={this.handleClick}>
          <h3>{this.props.trial.name}</h3>
          <div className='author'>{this.props.trial.author}</div>
          <div className='score'>{this.props.trial.score}</div>
        </li>
      )
    }
    return trial
  }
}
