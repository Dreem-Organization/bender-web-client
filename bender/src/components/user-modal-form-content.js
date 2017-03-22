import React from 'react'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item

const UserModalFormContent = Form.create()(React.createClass({

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleSubmitUserForm()
      }
    })
  },

  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <div>
        <Form layout={'vertical'} onSubmit={this.handleSubmit}>
          <FormItem label='Username'>
            {getFieldDecorator('username', {
              initialValue: this.props.user.username,
              rules: [{ required: true, message: 'Please provide a valid usernamme' }]
            })(
              <Input />
           )}
          </FormItem>
          <FormItem label='First Name'>
            {getFieldDecorator('first_name', {
              initialValue: this.props.user.first_name,
              rules: [{ required: false }]
            })(
              <Input placeholder='first_name' />
           )}
          </FormItem>
          <FormItem label='Last Name'>
            {getFieldDecorator('last_name', {
              initialValue: this.props.user.last_name,
              rules: [{ required: false }]
            })(
              <Input placeholder='Last Name' />
           )}
          </FormItem>
          <Button type='primary' htmlType='submit' loading={this.props.loading}>
            Save changes
          </Button>
          <Button onClick={this.props.closeModal} style={{marginLeft: '15px'}}>
            Close
          </Button>
        </Form>
      </div>
    )
  }
}))

export default UserModalFormContent
