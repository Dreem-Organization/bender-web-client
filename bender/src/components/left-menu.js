import React, { Component } from 'react'
import { Button, Tooltip } from 'antd'
import { Switch } from 'antd'
import logo from '../images/bender-logo.svg'

export default class LeftMenu extends Component {
  render () {
    let buttons
    if (this.props.isLoggedIn === true) {
      buttons = (
        <div className='menu-bottom-button'>
          <Tooltip placement='right' title={'New Experiment'}>
            <Button type='ghost' size='large' shape='circle-outline' icon='plus' style={{marginBottom: '15px'}} />
          </Tooltip>
          <Tooltip placement='right' title={'Log out'}>
            <Button type='ghost' size='large' shape='circle-outline' icon='logout' />
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
      )
    } else { buttons = null }
    return (
      <div className='left-menu'>
        <img
          src={logo}
          className='App-logo'
          alt='logo'
          style={{cursor: 'pointer'}}
          onClick={() => this.props.moveToView('experiment-list')}
        />
      {buttons}
      </div>
    )
  }
}
