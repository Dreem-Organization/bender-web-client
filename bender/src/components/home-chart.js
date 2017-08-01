import _ from 'lodash'
import React, {Component} from 'react'
import {
    ComposedChart,
    ResponsiveContainer,
    Area,
    Line,
    CartesianGrid,
    Tooltip,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis
} from 'recharts'
import Card from 'antd/lib/card'
import Select from 'antd/lib/select'
import TimeAgo from 'react-timeago'
import 'antd/lib/card/style/css'
import 'antd/lib/select/style/css'

const Option = Select.Option;

const chartStyles = {
    fontSize: '12px',
    borderRadius: '5px',
    height: '250px',
    marginLeft: '10px',
    marginBottom: '20px',
    overflow: 'visible',
    position: 'relative',
    zIndex: 30
};

const cardStyles = {
    width: '100%',
    margin: '20px 0px',
    borderRadius: '5px',
    overflow: 'visible',
};

const customTooltip = {
    background: '#fff',
    borderRadius: '3px',
    padding: 10,
    border: '1px solid rgb(217, 217, 217)',
    fontSize: 13,
    position: 'relative',
    zIndex: 30,
};

export default class HomeChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedParameter: null,
        };

        this.handleSelectAlgo = this.handleSelectAlgo.bind(this);
        this.getLineChartData = this.getLineChartData.bind(this);
        this.getScatterChartData = this.getScatterChartData.bind(this);
        this.getChart = this.getChart.bind(this);
        this.lineCustomTooltip = this.lineCustomTooltip.bind(this);
        this.scatterCustomTooltip = this.scatterCustomTooltip.bind(this);
        this.getDiscreteChartData = this.getDiscreteChartData.bind(this);
        this.getDiscreteParameters = this.getDiscreteParameters.bind(this);
        this.getAlgos = this.getAlgos.bind(this);
        this.displayParameter = this.displayParameter.bind(this);
    };

    handleSelectAlgo(algo) {
        algo = parseInt(algo, 10);
        let newSelectedAlgos;
        if (_.includes(this.state.selectedAlgos, algo)) {
            newSelectedAlgos = this.state.selectedAlgos.filter((k) => k !== algo)
        } else {
            newSelectedAlgos = _.concat(this.state.selectedAlgos, algo)
        }
        this.setState({
            selectedAlgos: newSelectedAlgos
        })
    }

    _getMetricSelect() {
        const metrics = _.map(this.props.experiment.metrics, (metric) => {
            return <Option key={metric} value={metric}>{metric}</Option>
        });
        const parameters = _.flatMap(this.props.algos, (algo) => {
            return _.map(algo.parameters, (param) => {
                return <Option key={param} value={param}>{param}</Option>
            })
        });

        return (
            <div>
                <Select
                    placeholder={'Parameters'}
                    style={{minWidth: '160px'}}
                    onChange={(p) => this.setState({selectedParameter: p})}
                >
                    {[...[<Option key='' value={null}> --- </Option>], parameters]}
                </Select>
                <Select
                    placeholder={'Metrics'}
                    defaultValue={this.props.selectedMetric}
                    value={this.props.selectedMetric}
                    style={{minWidth: '160px', marginLeft: '20px'}}
                    onChange={(m) => this.props.handleSelectedMetric(m)}
                >
                    {[...[<Option key='' value={null}> --- </Option>], metrics]}
                </Select>
            </div>
        )
    }

    getLineChartData() {
        if (this.props.selectedMetric !== null) {
            return _
                .chain(this.props.trials)
                .map((k) => ({id: k.id, value: _.round(k.results[this.props.selectedMetric], 4)}))
                .reverse()
                .value()
        } else if (this.state.selectedParameter !== null) {
            return _(this.props.trials).map((k) => ({
                id: k.id,
                value: _.round(k.parameters[this.state.selectedParameter], 4)
            })).reverse().value()
        }
    }

    getScatterChartData() {
        const algos = this.getAlgos();
        const data = _.chain(this.props.trials)
            .filter((k) => (_.includes(algos, k.algo)))
            .map((k) => ({
                id: k.id,
                X: _.round(k.results[this.props.selectedMetric], 4),
                Y: k.parameters[this.state.selectedParameter]
            }))
            .value();
        return data
    }

    getAlgos() {
        return (_.filter(this.props.algos, (a) => _.includes(a.parameters,
            this.state.selectedParameter)).map((k) => k.id))
    }

    getDiscreteParameters() {
        return (_.chain(this.props.trials).filter((k) =>
            (_.includes(this.getAlgos(), k.algo))).uniqBy((k) => k.parameters[this.state.selectedParameter])
            .map((k, i) => ({
                param: k.parameters[this.state.selectedParameter],
                index: i
            })).value())
    }

    displayParameter(tick) {
        const queried = this.getDiscreteParameters().filter((y) => y.index === tick);
        return queried.length > 0 ? queried[0].param : '';
    }

    getDiscreteChartData() {
        return (_.chain(this.props.trials)
            .filter((k) => (_.includes(this.getAlgos(), k.algo)))
            .map((k) => ({
                id: k.id,
                X: _.round(k.results[this.props.selectedMetric], 4),
                Y: this.getDiscreteParameters().filter((y) =>
                y.param === k.parameters[this.state.selectedParameter])[0].index,
                param: k.parameters[this.state.selectedParameter]
            }))
            .value())
    }

    generateTableData(obj) {
        const lis = Object.keys(obj).map((k) => {
            if (!_.isNull(obj[k]) || obj[k] === '') {
                return (
                    <li key={k}>
                        {k}: {_.isNumber(obj[k]) ? _.round(+obj[k], 4) : obj[k]}
                    </li>
                )
            }
            return null
        });
        return <ul>{lis}</ul>
    }

    lineCustomTooltip(item) {
        const trial = this.props.trials.filter((k) => k.id === item.payload[0].payload.id)[0];
        return (
            <div style={customTooltip}>
                <TimeAgo style={{opacity: 0.6, float: 'right'}} date={trial.created}/>
                <h3 style={{color: '#1882fd', padding: '0 5'}}>{item.payload[0].payload.value}</h3>
                <h3>{trial.algo_name}</h3>
                <h4 style={{marginTop: 3}}>Parameters</h4>
                <ul>{this.generateTableData(trial.parameters)}</ul>
                <h4 style={{marginTop: 3}}>Metrics</h4>
                <ul>{this.generateTableData(trial.results)}</ul>
            </div>
        )
    }

    scatterCustomTooltip(item) {
        const trial = this.props.trials.filter((k) => k.id === item.payload[2].value)[0];

        return (
            <div style={customTooltip}>
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

    getChart() {
        if (this.props.selectedMetric === null || this.state.selectedParameter === null) {
            return (
                <ComposedChart
                    style={chartStyles}
                    margin={{top: 5, right: 10, left: -18, bottom: 5}}
                    data={this.getLineChartData()}>
                    <YAxis domain={['auto', 'auto']} tickFormatter={(v) => _.round(v, 3)}/>
                    <CartesianGrid strokeDasharray='3 3' style={{opacity: 0.3}}/>
                    <Tooltip content={this.lineCustomTooltip} offset={25}/>
                    <defs>
                        <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                            <stop offset='5%' stopColor='#0082dc' stopOpacity={0.15}/>
                            <stop offset='95%' stopColor='#0082dc' stopOpacity={0.05}/>
                        </linearGradient>
                    </defs>
                    <Line
                        type='monotone'
                        dataKey={'value'}
                        stroke='#108ee9'
                        strokeWidth={1.5}
                        activeDot={{r: 5}}
                        animationDuration={850}
                    />
                    <Area
                        type='monotone'
                        dataKey={'value'}
                        fillOpacity={1}
                        fill='url(#colorUv)'
                        strokeWidth={0}
                        activeDot={{r: 5}}
                        animationDuration={850}
                    />
                </ComposedChart>
            )
        } else if (typeof this.props.trials[0].parameters[this.state.selectedParameter] === 'string') {
            return (
                <ScatterChart
                    style={chartStyles}
                    className="scatter-chart"
                    margin={{top: -5, right: 10, bottom: 0, left: -8}}>
                    <Scatter data={this.getDiscreteChartData()} fill='#008cec' r={2}/>
                    <YAxis dataKey={'X'} domain={['auto', 'auto']} name={this.state.X}/>
                    <XAxis dataKey={'Y'} tickFormatter={this.displayParameter}
                           domain={['dataMin - 1', 'dataMax + 1']} interval={0} name={this.state.Y}/>
                    <ZAxis dataKey={'id'}/>
                    <Tooltip content={this.scatterCustomTooltip} offset={25}/>
                    <CartesianGrid strokeDasharray='3 3' style={{opacity: 0.3}}/>
                </ScatterChart>
            )
        }
        return (
            <ScatterChart
                style={chartStyles}
                className="scatter-chart"
                margin={{top: -5, right: 10, bottom: 0, left: -8}}>
                <Scatter data={this.getScatterChartData()} fill='#008cec' r={2}/>
                <YAxis dataKey={'X'} domain={['auto', 'auto']} name={this.state.X}/>
                <XAxis dataKey={'Y'} domain={['auto', 'auto']} name={this.state.Y}/>
                <ZAxis dataKey={'id'}/>
                <Tooltip content={this.scatterCustomTooltip} offset={25}/>
                <CartesianGrid strokeDasharray='3 3' style={{opacity: 0.3}}/>
            </ScatterChart>
        )
    }

    render() {
        const titleSuffix = this.state.selectedParameter === null ? ' over time' : ': ' + this.state.selectedParameter;
        return (
            <Card title={this.props.selectedMetric + titleSuffix}
                  extra={this._getMetricSelect()}
                  style={cardStyles}
                  bodyStyle={{
                      height: '275px',
                      marginLeft: '-15px',
                      marginRight: '5px',
                      marginTop: '0px',
                      padding: '10px'
                  }}>
                <ResponsiveContainer>
                    {this.getChart()}
                </ResponsiveContainer>
            </Card>)
    }
}