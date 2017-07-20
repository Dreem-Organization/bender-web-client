import React, {Component} from 'react'
import ExperimentListItem from './experiment-list-item'
import ExperimentForm from './experiment-form'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Tabs from 'antd/lib/tabs'
import Button from 'antd/lib/button'
import {getUserData} from '../constants/utils'
import {fetchSharedWithExperiments, fetchUserExperiments} from '../constants/requests'

const TabPane = Tabs.TabPane;

export default class ExperimentList extends Component {
    constructor(props) {
        super(props);

        this._getExperimentList = this._getExperimentList.bind(this);
        this.handleFetchExperiments = this.handleFetchExperiments.bind(this);
        this.state = {
            user: getUserData(),
            sharedWithExperiments: [],
            userExperiments: []
        }
    }

    _getExperimentList(experiments) {
        return experiments.map((experiment, i) => {
            return (
                <ExperimentListItem
                    key={i}
                    experiment={experiment}
                    fetchExperimentData={this.props.fetchExperimentData}
                    setSelectedExperiment={this.props.setSelectedExperiment}
                />
            )
        })
    }

    componentDidMount() {
        this.handleFetchExperiments()
    }

    handleFetchExperiments() {
        fetchSharedWithExperiments(this.state.user.token, this.state.user.username, (resp) => {
            const sharedWithExperiments = resp.results;
            this.setState({sharedWithExperiments})
        });
        fetchUserExperiments(this.state.user.token, this.state.user.username, (resp) => {
            const userExperiments = resp.results;
            this.setState({userExperiments})
        });
    }

    render() {
        const formButton = (
            <Button
                style={{'float': 'right'}}
                type='primary'
                size='large'
                className='custom-primary'>
                Create Experiment
            </Button>
        );
        return (
            <div className='main-container'>
                <Row>
                    <Col span={12}><h1 className='main'>Experiments</h1></Col>
                    <Col span={12} style={{paddingTop: '15px'}}>
                        <ExperimentForm
                            user={this.state.user}
                            formButton={formButton}
                            handleFetchExperiments={this.handleFetchExperiments}
                        />
                    </Col>
                </Row>
                <Tabs
                    defaultActiveKey='1'
                    animated={false}
                >
                    <TabPane tab={
                        <h4>My Experiments ({this.state.userExperiments.length})</h4>
                    } key='1'>
                        <div className='experiment-list'>
                            <ul>{this._getExperimentList(this.state.userExperiments)}</ul>
                        </div>
                    </TabPane>
                    <TabPane tab={
                        <h4>Shared With Me ({this.state.sharedWithExperiments.length})</h4>
                    } key='2'>
                        <div className='experiment-list'>
                            <ul>{this._getExperimentList(this.state.sharedWithExperiments)}</ul>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
