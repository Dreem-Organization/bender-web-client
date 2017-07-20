import React, {Component} from 'react'
import Button from 'antd/lib/button'
import Tooltip from 'antd/lib/tooltip'
import Modal from 'antd/lib/modal'
import {getUserData} from '../constants/utils'
import UserModalFormContent from './user-modal-form-content'
import {fetchSharedWithExperiments} from '../constants/requests'

const buttonStyle = {
    marginBottom: '13px'
};

export default class UserModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            user: getUserData(),
            experiments: []
        }
    }

    componentDidMount() {
        fetchSharedWithExperiments(this.state.user.token, this.state.user.username, (resp) => {
            const experiments = resp.results;
            this.setState({experiments});
        })
    }

    submitUserForm(values) {
        alert('submitted!')
    }

    _getTableData() {
        if (this.state.experiment === []) {
            return null
        }
        return this.state.experiments.map((e, k) => {
            return (
                <div key={k} className='experiment-settings-item'>
                    <h3>{e.name}</h3>
                    <Button>Remove</Button>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <Tooltip placement='right' title={'User'}>
                    <Button
                        type='ghost'
                        size='large'
                        shape='circle-outline'
                        icon='user'
                        style={buttonStyle}
                        onClick={() => this.setState({visible: !this.state.visible})}
                    />
                </Tooltip>
                <Modal
                    visible={this.state.visible}
                    title={this.state.user.username}
                    width='600px'
                    footer={null}
                    onCancel={() => this.setState({visible: false})}
                >
                    <h4>My Settings</h4>
                    <UserModalFormContent
                        handleSubmitUserForm={this.submitUserForm}
                        user={this.state.user}
                        closeModal={() => this.setState({visible: false})}
                    />
                    <br /><br />
                    <h4>Experiments Shared With Me</h4>
                    {this._getTableData()}
                </Modal>
            </div>
        )
    }
}
