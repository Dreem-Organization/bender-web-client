import React from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'

const FormItem = Form.Item;

class AlgoFormContent extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.handleCreateAlgo(values)
            }
        })
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout={"vertical"} onSubmit={this.handleSubmit}>
                <FormItem label='Name'>
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: 'Please provide an algo name'}]
                    })(
                        <Input placeholder='Name'/>
                    )}
                </FormItem>
                <FormItem label='Hyper Parameters (Comma-separated list)'>
                    {getFieldDecorator('parameters', {
                        rules: [{required: true, message: 'Please provide algo parameters'}]
                    })(
                        <Input placeholder='Parameters'/>
                    )}
                </FormItem>
                <Button type='primary' htmlType='submit' size='large' loading={this.props.loading}>
                    Submit
                </Button>
            </Form>
        );
    }
}

const WrappedAlgoFormContent = Form.create()(AlgoFormContent);
export default WrappedAlgoFormContent
