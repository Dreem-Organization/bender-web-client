import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import logo from '../images/bender-logo.svg'
import { storageKey, loginURL, signupUrl } from '../constants/globals'
import { browserHistory } from 'react-router'

const FormItem = Form.Item

function formatResponseString (resp) {
  if (resp.status === 401 || resp.status === 403) {
    return 'Your session has expired. Please reload the page and log in again.'
  }
  return `Error during request, URL: ${resp.url}, Status: ${resp.statusText}`
}

function defaultBodyValue () {
  return Promise.resolve({})
}

function throwErrorMessage (r) {
  throw new Error(JSON.stringify(r))
}

function responseHandler (resp) {
  debugger
  if (!resp.ok) {
    return resp.json()
      .then(throwErrorMessage)
      .catch(function () {
        throw new Error(formatResponseString(resp))
      })
  }
  return resp.json().catch(defaultBodyValue)
}

function signupRequest (credentials) {
  return fetch(signupUrl, {
    method: 'POST'
    // headers: {
    //   'Authorization': 'Basic ' + window.btoa(credentials.username + ':' + credentials.password)
    // }
  }).then(responseHandler)
}

const SignUpForm = Form.create()(React.createClass({
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.signup(values)
      }
    })
  },

  signup (credentials) {
    return signupRequest(credentials).then((u) => {
      const user = {
        username: credentials.username,
        token: `Bearer ${u.token}`,
        id: u.user_id
      }

      window.localStorage.setItem(storageKey.username, credentials.username)
      window.localStorage.setItem(storageKey.token, user.token)
      window.localStorage.setItem(storageKey.user, user.id)
      browserHistory.push('/experiments')
    })
  },

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className='form-wrapper'>
        <img
          src={logo}
          className='form-logo'
          alt='logo'
          style={{cursor: 'pointer'}}
        />
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <h1>Sign Up</h1>
          <br />
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username' }]
            })(
              <Input addonBefore={<Icon type='user' />} placeholder='Username' />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email' }]
            })(
              <Input addonBefore={'@'} placeholder='Email Adress' />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(
              <Input addonBefore={<Icon type='lock' />} type='password' placeholder='Password' />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password2', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(
              <Input addonBefore={<Icon type='lock' />} type='password' placeholder='Confirm Password' />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}))

export default SignUpForm
