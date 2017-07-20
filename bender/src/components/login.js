import React from 'react'
import Form from 'antd/lib/form'
import Icon from 'antd/lib/icon'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Checkbox from 'antd/lib/checkbox'
import logo from '../images/bender-logo.svg'
import {storageKey, BASE_URL} from '../constants/globals'
import {browserHistory, Link} from 'react-router'

const FormItem = Form.Item;

function formatResponseString(resp) {
    if (resp.status === 401 || resp.status === 403) {
        return 'Your session has expired. Please reload the page and log in again.'
    }
    return `Error during request, URL: ${resp.url}, Status: ${resp.statusText}`
}

function defaultBodyValue() {
    return Promise.resolve({})
}

function throwErrorMessage(r) {
    throw new Error(JSON.stringify(r))
}

function responseHandler(resp) {
    if (!resp.ok) {
        return resp.json()
            .then(throwErrorMessage)
            .catch(function () {
                throw new Error(formatResponseString(resp))
            })
    }
    return resp.json().catch(defaultBodyValue)
}

function loginRequest(credentials) {
    return fetch(`${BASE_URL}/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: credentials.username,
            password: credentials.password
        })
    }).then(responseHandler)
}

class NormalLoginForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.login(values)
            }
        });
    };

    login(credentials) {
        return loginRequest(credentials).then((data) => {
            const user = {
                token: `JWT ${data.token}`,
                id: data.user.pk,
                email: data.user.email,
                username: data.user.username,
                firstName: data.user.first_name,
                lastName: data.user.last_name
            };

            window.localStorage.setItem(storageKey.token, user.token);
            window.localStorage.setItem(storageKey.user, JSON.stringify(user));
            browserHistory.push('/experiments')
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
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
                    <p>New around here ? <Link to='signup/'>Signup</Link> instead</p>
                    <br />
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username'}]
                        })(
                            <Input addonBefore={<Icon type='user'/>} placeholder='Username'/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your password'}]
                        })(
                            <Input addonBefore={<Icon type='lock'/>} type='password' placeholder='Password'/>
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
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
export default WrappedNormalLoginForm