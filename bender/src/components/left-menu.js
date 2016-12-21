import React, { Component } from 'react'
import { Button, Tooltip } from 'antd'
import { Switch } from 'antd'
import logo from '../images/bender-logo.svg'

export default class LeftMenu extends Component {
  render () {
    return (
      <div className='left-menu'>
        <a href='/'>
          <img src={logo} className='App-logo' alt='logo' />
        </a>
        <div className='menu-bottom-button'>
          <Tooltip placement='right' title={'New Experiment'}>
            <Button type='ghost' size='large' shape='circle-outline' icon='plus' style={{marginBottom: '15px'}} />
          </Tooltip>
          <Tooltip placement='right' title={'Settings'}>
            <Button type='ghost' size='large' shape='circle-outline' icon='setting' />
          </Tooltip>
          <Switch
            style={{marginTop: '20px'}}
            checkedChildren=''
            unCheckedChildren=''
            size='small'
            />
        </div>
      </div>
    )
  }
}
