import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import logo from '../images/bender-logo.svg'
const FormItem = Form.Item

const NormalLoginForm = Form.create()(React.createClass({
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.handleLogin()
      }
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
          <p>You can login using your regular internal<br /> Rythm account (same as viewer).</p>
          <br />
          <FormItem>
            {getFieldDecorator('userName', {
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
            <a className='login-form-forgot'>Forgot password</a>
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
