import React from 'react'
import { Form, Input, Button, Switch } from 'antd'

const FormItem = Form.Item

const RegistrationForm = Form.create()(React.createClass({
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        this.props.handleCreateExperiment(
          Object.assign({}, values, {
            author: this.props.username
          })
        )
      }
    })
  },

  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <Form vertical onSubmit={this.handleSubmit}>
        <FormItem label='Name'>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please provide and experiment name!' }]
          })(
            <Input placeholder='Name' />
         )}
        </FormItem>
        <FormItem label='Description'>
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please provide a description' }]
          })(
            <Input type='textarea' rows={3} placeholder='Description' />
         )}
        </FormItem>
        <FormItem label='Metrics (Comma separated list)'>
          {getFieldDecorator('metrics', {
            rules: [{ required: true, message: 'Please provide metrics' }]
          })(
            <Input placeholder='Metrics' />
         )}
        </FormItem>
        <FormItem label='Dataset'>
          {getFieldDecorator('dataset', {
            rules: [{ required: true, message: 'Please provide dataset information' }]
          })(
            <Input placeholder='Dataset' />
          )}
        </FormItem>
        <FormItem label='Dataset Parameters (Optional)'>
          {getFieldDecorator('dataset_parameters', {
            rules: [{ required: false, message: '(Optional) provide dataset parameters' }]
          })(
            <Input placeholder='Dataset Parameters' />
          )}
        </FormItem>
        <FormItem
          label='Private Experiment'
        >
          {getFieldDecorator('is_private')(
            <Switch />
          )}
        </FormItem>
        <Button type='primary' htmlType='submit' size='large' loading={this.props.loading}>
          Submit
        </Button>
      </Form>
    )
  }
}))

export default RegistrationForm
