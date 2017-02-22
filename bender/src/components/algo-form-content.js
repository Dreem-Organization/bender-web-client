import React from 'react'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item

const AlgoFormContent = Form.create()(React.createClass({
  handleSubmit (e) {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleCreateAlgo(values)
      }
    })
  },

  render () {
    const { getFieldDecorator } = this.props.form

    return (
      <Form vertical onSubmit={this.handleSubmit}>
        <FormItem label='Name'>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please provide an algo name' }]
          })(
            <Input placeholder='Name' />
         )}
        </FormItem>
        <FormItem label='Hyper Parameters (Comma separated list)'>
          {getFieldDecorator('parameters', {
            rules: [{ required: true, message: 'Please provide algo parameters' }]
          })(
            <Input placeholder='Parameters' />
         )}
        </FormItem>
        <Button type='primary' htmlType='submit' size='large' loading={this.props.loading}>
          Submit
        </Button>
      </Form>
    )
  }
}))

export default AlgoFormContent
