import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import logo from '../images/bender-logo.svg'
import { storageKey, loginURL } from '../constants/globals'
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
  if (!resp.ok) {
    return resp.json()
      .then(throwErrorMessage)
      .catch(function () {
        throw new Error(formatResponseString(resp))
      })
  }
  return resp.json().catch(defaultBodyValue)
}

function loginRequest (credentials) {
  return fetch(loginURL, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + window.btoa(credentials.username + ':' + credentials.password)
    }
  }).then(responseHandler)
}

const NormalLoginForm = Form.create()(React.createClass({
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.login(values)
      }
    })
  },

  login (credentials) {
    return loginRequest(credentials).then((u) => {
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
          onClick={() => this.props.moveToView('experiment-list')}
        />
        <Form onSubmit={this.handleSubmit} className='login-form'>
          <h1>Login to Bender</h1>
          <p>You can login using your regular internal Rythm account.<br/>(same as viewer).</p>
          <br />
          <FormItem>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(
              <Input addonBefore={<Icon type='user' />} placeholder='Username' />
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

export default NormalLoginForm
