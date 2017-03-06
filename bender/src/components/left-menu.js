import React, { Component } from 'react'
import { Button, Tooltip } from 'antd'
import { browserHistory, Link } from 'react-router'
import logo from '../images/bender-logo.svg'
import { storageKey } from '../constants/globals'
import ExperimentForm from './experiment-form'

const buttonStyle = {
  marginBottom: '13px'
}

export default class LeftMenu extends Component {
  logout () {
    Object.keys(storageKey).forEach((k) => window.localStorage.removeItem(storageKey[k]))
    browserHistory.push('/login')
  }
  render () {
    const formButton = (
      <Tooltip placement='right' title={'New Experiment'}>
        <Button
          type='ghost'
          size='large'
          shape='circle-outline'
          icon='plus'
          style={buttonStyle}
        />
      </Tooltip>
    )
    return (
      <div className='left-menu'>
        <Link to='/experiments'>
          <img
            src={logo}
            className='App-logo'
            alt='logo'
            style={{cursor: 'pointer'}}
          />
        </Link>
        <div className='menu-bottom-button'>
          <ExperimentForm formButton={formButton} />
          <Tooltip placement='right' title={'User'}>
            <Button type='ghost' size='large' shape='circle-outline' icon='user' style={buttonStyle} />
          </Tooltip>
          <Tooltip placement='right' title={'Log out'}>
            <Button type='ghost' size='large' shape='circle-outline' icon='logout' onClick={this.logout} style={buttonStyle} />
          </Tooltip>
        </div>
      </div>
    )
  }
}
