import React from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Mention from 'antd/lib/mention'
import {fetchUsernames} from '../constants/requests'
import _ from 'lodash'

const FormItem = Form.Item;
const getMentions = Mention.getMentions;

class ExperimentFormContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
        };
        this.handleCreateExperiment = this.props.handleCreateExperiment.bind(this);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.handleCreateExperiment(
                    Object.assign({}, values, {
                        owner: this.props.username,
                        shared_with: getMentions(values.shared_with)
                    })
                )
            }
        })
    };

    onSearchChange(value) {
        fetchUsernames(this.props.user.token, value.toLowerCase(), (data) => {
            this.setState({
                suggestions: _.chain(data.results).map((k) => k.username).filter((k) => k !== this.props.user.username).value()
            })
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form layout={'vertical'} onSubmit={this.handleSubmit}>
                <FormItem label='Name'>
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: 'Please provide an experiment name'}]
                    })(
                        <Input placeholder='Name'/>
                    )}
                </FormItem>
                <FormItem label='Description'>
                    {getFieldDecorator('description', {
                        rules: [{required: true, message: 'Please provide a description'}]
                    })(
                        <Input type='textarea' rows={3} placeholder='Description'/>
                    )}
                </FormItem>
                <FormItem label='Metrics (Comma separated list)'>
                    {getFieldDecorator('metrics', {
                        rules: [{required: true, message: 'Please provide metrics'}]
                    })(
                        <Input placeholder='Metrics'/>
                    )}
                </FormItem>
                <FormItem label='Dataset'>
                    {getFieldDecorator('dataset', {
                        rules: [{required: true, message: 'Please provide dataset information'}]
                    })(
                        <Input placeholder='Dataset'/>
                    )}
                </FormItem>
                <FormItem label='Dataset Parameters (Optional)'>
                    {getFieldDecorator('dataset_parameters', {
                        rules: [{required: false, message: '(Optional) provide dataset parameters'}]
                    })(
                        <Input placeholder='Dataset Parameters'/>
                    )}
                </FormItem>
                <FormItem label='Share your experiment (Optional)'>
                    {getFieldDecorator('shared_with', {
                        rules: [{required: false, message: '(Optional) share your experiment'}]
                    })(
                        <Mention
                            placeholder='@username'
                            notFoundContent='Type @username'
                            suggestions={this.state.suggestions}
                            onSearchChange={this.onSearchChange}
                        />
                    )}
                </FormItem>
                <Button type='primary' htmlType='submit' size='large' loading={this.props.loading}>
                    Submit
                </Button>
            </Form>
        )
    }
}

const WrappedExperimentFormContent = Form.create()(ExperimentFormContent);

export default WrappedExperimentFormContent
