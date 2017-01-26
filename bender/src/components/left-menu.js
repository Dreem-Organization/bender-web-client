import React, { Component } from 'react'
import { Button, Tooltip } from 'antd'
import { Switch } from 'antd'
import { Link } from 'react-router'
import logo from '../images/bender-logo.svg'
import { storageKey } from '../constants/globals'
import { browserHistory } from 'react-router'

export default class LeftMenu extends Component {
  logout () {
    Object.keys(storageKey).forEach((k) => window.localStorage.removeItem(storageKey[k]))
    browserHistory.push('/login')
  }
  render () {
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
          <Tooltip placement='right' title={'New Experiment'}>
            <Button type='ghost' size='large' shape='circle-outline' icon='plus' style={{marginBottom: '15px'}} />
          </Tooltip>
          <Tooltip placement='right' title={'Log out'}>
            <Button type='ghost' size='large' shape='circle-outline' icon='logout' onClick={this.logout} />
          </Tooltip>
          <Tooltip placement='right' title={'This will do something, I\'ve yet to decide what...'}>
            <Switch
              style={{marginTop: '20px'}}
              checkedChildren=''
              unCheckedChildren=''
              size='small'
              />
          </Tooltip>
        </div>
      </div>
    )
  }
}
