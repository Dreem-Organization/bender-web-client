import React, { Component } from 'react'
import { Button } from 'antd'
import logo from '../images/bender-logo.svg'
import { browserHistory, Link } from 'react-router'
import { verifyEmail } from '../constants/requests'

export default class VerifyEmail extends Component {
  constructor (props) {
    super(props)

    this.handleClickButton = this.handleClickButton.bind(this)
  }
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.login(values)
      }
    })
  }

  handleClickButton () {
    verifyEmail(this.props.params.key, (json) => {
      browserHistory.push('/experiments')
    })
  }

  render () {
    return (
      <div className='form-wrapper'>
        <img
          src={logo}
          className='form-logo'
          alt='logo'
          style={{cursor: 'pointer'}}
          onClick={() => this.props.moveToView('experiment-list')}
        />
        <div className='login-form'>
          <h1>Verify your email</h1>
          <Button type='primary' size='large' htmlType='submit' className='login-form-button' onClick={this.handleClickButton}>
            Verify my email
          </Button>
          <br /><br /><br />
          <p>Don't have an account ? <Link to='signup/'>Signup</Link> instead</p>
          <br />
        </div>
      </div>
    )
  }
}
