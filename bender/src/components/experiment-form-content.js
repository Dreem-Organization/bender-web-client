import React from 'react'
import { Form, Input, Tooltip, Icon, Button } from 'antd'

const FormItem = Form.Item

const RegistrationForm = Form.create()(React.createClass({
  getInitialState () {
    return {
      passwordDirty: false
    }
  },

  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  },

  checkConfirm (rule, value, callback) {
    const form = this.props.form
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  },
  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 17 }
    }
    return (
      <Form horizontal onSubmit={this.handleSubmit} style={{}}>
        <FormItem
          {...formItemLayout}
          label='Name'
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{
              type: 'name', message: 'Please input a valid name!'
            }, {
              required: true, message: 'Please input a name!'
            }]
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='Author'
          hasFeedback
        >
          {getFieldDecorator('author', {
            rules: [{
              type: 'author', message: 'Please input a valid author!'
            }, {
              required: true, message: 'Please input a author!'
            }]
          })(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Description&nbsp;
              <Tooltip title='Describe your experiment'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please input your description!' }]
          })(
            <Input type='textarea' rows={4} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Metrics&nbsp;
              <Tooltip title='Describe your experiment'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('metrics', {
            rules: [{ required: true, message: 'Please input your metrics!' }]
          })(
            <Input type='textarea' rows={4} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Dataset Parameters&nbsp;
              <Tooltip title='Describe your experiment'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please input your description!' }]
          })(
            <Input type='textarea' rows={4} />
          )}
        </FormItem>
        <FormItem {...formItemLayout}>
          <Button type='primary' htmlType='submit' size='large'>Submit</Button>
        </FormItem>
      </Form>
    )
  }
}))

export default RegistrationForm
