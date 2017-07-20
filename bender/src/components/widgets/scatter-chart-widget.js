import React, {Component} from 'react'
import _ from 'lodash'
import Col from 'antd/lib/col'
import Card from 'antd/lib/card'
import Select from 'antd/lib/select'
import {ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip} from 'recharts'
import TimeAgo from 'react-timeago'

const Option = Select.Option;

export default class ScatterChartWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            X: this.props.experiment.metrics[0],
            Y: this.props.algos[0].parameters[0]
        };
        this._selectXVar = this._selectXVar.bind(this);
        this._selectYVar = this._selectYVar.bind(this);
        this._getChartData = this._getChartData.bind(this);
        this.customTooltip = this.customTooltip.bind(this);
    }

    _selectXVar() {
        const options = _.map(this.props.experiment.metrics, (metric, i) => {
            return <Option key={i} value={metric}>{metric}</Option>
        });
        return (
            <Select
                style={{width: '200px'}}
                placeholder='Select X axis'
                defaultValue={this.props.experiment.metrics[0]}
                onChange={(X) => this.setState({X})}
            >
                {options}
            </Select>
        )
    }

    generateTableData(obj) {
        const lis = Object.keys(obj).map((k) => {
            return (
                <li key={k}>
                    {k}: {_.isNumber(obj[k]) ? _.round(+obj[k], 4) : obj[k]}
                </li>
            )
        });
        return <ul>{lis}</ul>
    }

    customTooltip(item) {
        const trial = this.props.trials.filter((k) => k.id === item.payload[2].value)[0];

        return (
            <div className="custom-tooltip">
                <TimeAgo style={{opacity: 0.6, float: 'right'}} date={trial.created}/>
                <h3 style={{color: '#1882fd', padding: '0 5'}}>X:{item.payload[0].value} Y:{item.payload[1].value}</h3>
                <h3>{trial.algo_name}</h3>
                <h4 style={{marginTop: 3}}>Parameters</h4>
                <ul>{this.generateTableData(trial.parameters)}</ul>
                <h4 style={{marginTop: 3}}>Metrics</h4>
                <ul>{this.generateTableData(trial.results)}</ul>
            </div>
        )
    }

    _selectYVar() {
        const options = _.flatten(
            _.map(this.props.algos, (algo) => {
                return _.map(algo.parameters, (param) => {
                    return <Option key={Math.random()} value={param}>{param}</Option>
                })
            }));
        return (
            <Select
                style={{width: '200px', top: '-4px', position: 'relative'}}
                placeholder='Select Y axis'
                defaultValue={this.props.algos[0].parameters[0]}
                onChange={(Y) => this.setState({Y})}
            >
                {options}
            </Select>
        )
    }

    _getChartData() {
        const algos = _.filter(this.props.algos, (a) => _.includes(a.parameters, this.state.Y)).map((k) => k.id);
        return _.chain(this.props.trials)
            .filter((k) => (_.includes(algos, k.algo)))
            .map((k) => ({
                id: k.id,
                X: _.round(k.results[this.state.X], 4),
                Y: k.parameters[this.state.Y]}))
            .value()
    }

    render() {
        return (
            <Col span={24}>
                <Card bordered={false} title={this._selectYVar()} extra={this._selectXVar()}
                      bodyStyle={{height: '220px', 'padding': 10}}>
                    <ResponsiveContainer>
                        <ScatterChart
                            height={200} margin={{top: 20, right: 15, bottom: 10, left: -25}}>
                            <Scatter data={this._getChartData()} fill='#008cec'/>
                            <YAxis dataKey={'X'} domain={['auto', 'auto']} name={this.state.X}/>
                            <XAxis dataKey={'Y'} domain={['auto', 'auto']} name={this.state.Y}/>
                            <ZAxis dataKey={'id'}/>
                            <Tooltip content={this.customTooltip} offset={25}/>
                            <CartesianGrid />
                        </ScatterChart>
                    </ResponsiveContainer>
                </Card>
            </Col>
        )
    }
}
