import _ from 'lodash'
import React, {Component} from 'react'
import {
    ComposedChart,
    ResponsiveContainer,
    Area,
    Legend,
    CartesianGrid,
    Tooltip,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
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

const colTooltip = {
    //display: 'inline-block',
    verticalAlign: 'top',
    marginRight: 20,
    marginTop: 3
};

const colorWheel = {
    0: '#108FE9', //#108EE9
    1: '#56B9FD',
    2: '#B69CFD',
    3: '#FFA2D6',
    4: '#FF999C'
};

export default class HomeChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedParameter: null,
            displayedMetrics: [],
        };

        this.handleSelectAlgo = this.handleSelectAlgo.bind(this);
        this.getLineData = this.getLineData.bind(this);
        this.getScatterData = this.getScatterData.bind(this);
        this.getChart = this.getChart.bind(this);
        this.lineCustomTooltip = this.lineCustomTooltip.bind(this);
        this.scatterCustomTooltip = this.scatterCustomTooltip.bind(this);
        this.getDiscreteData = this.getDiscreteData.bind(this);
        this.getDiscreteParameters = this.getDiscreteParameters.bind(this);
        this.getAlgos = this.getAlgos.bind(this);
        this.displayParameter = this.displayParameter.bind(this);
        this.handleDisplayedMetric = this.handleDisplayedMetric.bind(this);
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

    componentDidMount() {
        this.setState({displayedMetrics: [this.props.selectedMetric]})
    }

    handleDisplayedMetric(displayedMetrics) {
        this.setState({displayedMetrics})
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
                {this.state.selectedParameter === null ?
                    <Select
                        mode="multiple"
                        placeholder="Metrics"
                        defaultValue={this.props.selectedMetric}
                        style={{minWidth: '160px', marginLeft: '20px'}}
                        onChange={(m) => this.handleDisplayedMetric(m)}
                    >{metrics}
                    </Select> :
                    <Select
                        placeholder={'Metrics'}
                        defaultValue={this.props.selectedMetric}
                        value={this.props.selectedMetric}
                        style={{minWidth: '160px', marginLeft: '20px'}}
                        onChange={(m) => this.props.handleSelectedMetric(m)}>
                        {[...[<Option key='' value={null}> --- </Option>], metrics]}
                    </Select>}
            </div>
        )
    }

    getLineData() {
        let data;
        if (this.props.selectedMetric !== null) {
            data = _
                .chain(this.props.trials)
                .map(function (k) {
                    let results = _.mapValues(k.results, (r) => (_.round(r, 4)));
                    results.id = k.id;
                    return results;
                })
                .reverse()
                .value()
        } else if (this.state.selectedParameter !== null) {
            data = _(this.props.trials)
                .map((k) => ({
                            id: k.id,
                            value: _.round(k.parameters[this.state.selectedParameter], 4)
                        }
                    )
                )
                .reverse()
                .value()
        }
        return data;
    }

    getScatterData() {
        const algos = this.getAlgos();
        return _.chain(this.props.trials)
            .filter((k) => (_.includes(algos, k.algo)))
            .map((k) => ({
                id: k.id,
                X: _.round(k.results[this.props.selectedMetric], 4),
                Y: k.parameters[this.state.selectedParameter]
            }))
            .value();
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

    getDiscreteData() {
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

    generateTableData(obj, displayColors) {
        const lis = Object.keys(obj).map((k, index) => {
            if (!_.isNull(obj[k]) || obj[k] === '') {
                return (
                    <div key={k}>
                        {displayColors ? <div
                            style={{
                                display: "inline-block",
                                borderRadius: "50%",
                                marginTop: "5px", marginRight: "5px",
                                width: "10px", height: "10px", float: "left",
                                backgroundColor: colorWheel[index % _.size(colorWheel)]
                            }}/> : null}
                        <li>
                            {k}: {_.isNumber(obj[k]) ? _.round(+obj[k], 4) : obj[k]}
                        </li>
                    </div>
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

                <div style={colTooltip}>
                    <h4>Parameters</h4>
                    <ul>{this.generateTableData(trial.parameters, false)}</ul>
                </div>
                <div style={colTooltip}>
                    <h4>Metrics</h4>
                    <ul>{this.generateTableData(trial.results, true)}</ul>
                </div>
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

                <div style={colTooltip}>
                    <h4>Parameters</h4>
                    <ul>{this.generateTableData(trial.parameters, false)}</ul>
                </div>
                <div style={colTooltip}>
                    <h4>Metrics</h4>
                    <ul>{this.generateTableData(trial.results, true)}</ul>
                </div>
            </div>
        )
    }

    getChart() {
        const experimentMetrics = this.props.experiment.metrics;
        const displayedMetrics = this.state.displayedMetrics;

        if (this.props.selectedMetric === null || this.state.selectedParameter === null) {
            return (
                <ComposedChart
                    style={chartStyles}
                    margin={{top: 10, right: 10, left: -18, bottom: 5}}
                    data={this.getLineData()}>
                    <CartesianGrid strokeDasharray='3 3' style={{opacity: 0.3}}/>
                    <Legend align="right"/>
                    <Tooltip content={this.lineCustomTooltip} offset={25}/>
                    <defs>
                        {this.props.experiment.metrics.map(function (m, index) {
                                const id = index % _.size(colorWheel);
                                const color_id = `colorUv-${id}`;
                                return (
                                    <linearGradient
                                        key={m}
                                        id={color_id} x1='0' y1='0' x2='0' y2='1'>
                                        <stop offset='5%' stopColor={colorWheel[id]} stopOpacity={0.15}/>
                                        <stop offset='95%' stopColor={colorWheel[id]} stopOpacity={0.25}/>
                                        >
                                    </linearGradient>
                                )
                            }
                        )
                        }
                    </defs>
                    {displayedMetrics.map(function (m, index) {
                            const colorIndex = experimentMetrics.indexOf(m) % _.size(colorWheel);
                            return (
                                <YAxis
                                    key={m}
                                    margin={{left: -20 + 20 * displayedMetrics.length}}
                                    width={65 - 5 * displayedMetrics.length}
                                    stroke={colorWheel[colorIndex]}
                                    yAxisId={`yaxis-${index}`}
                                    domain={['auto', 'auto']}
                                    tickFormatter={(v) => _.round(v, 3)}/>
                            )
                        }
                    )
                    }
                    {displayedMetrics.map(function (m, index) {
                            const colorIndex = experimentMetrics.indexOf(m) % _.size(colorWheel);
                            const stroke = `${colorWheel[colorIndex]}`;
                            const fill = `url(#colorUv-${colorIndex})`;
                            return (
                                <Area
                                    margin={{bottom: 5}}
                                    type='monotone'
                                    key={m}
                                    dataKey={m}
                                    yAxisId={`yaxis-${index}`}
                                    fillOpacity={1}
                                    fill={fill}
                                    strokeWidth={1.7}
                                    stroke={stroke}
                                    activeDot={{r: 5}}
                                    animationDuration={850}/>
                            )
                        }
                    )
                    }

                </ComposedChart>
            )
        } else if (typeof this.props.trials[0].parameters[this.state.selectedParameter] === 'string') {
            return (
                <ScatterChart
                    style={chartStyles}
                    className="scatter-chart"
                    margin={{top: 0, right: 20, bottom: 3, left: -11}}>
                    <Scatter data={this.getDiscreteData()} fill='#008cec' r={2}/>
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
                margin={{top: 0, right: 20, bottom: 3, left: -11}}>
                <Scatter data={this.getScatterData()} fill='#008cec' r={2}/>
                <YAxis dataKey={'X'} domain={['auto', 'auto']} name={this.state.X}/>
                <XAxis dataKey={'Y'} domain={['auto', 'auto']} name={this.state.Y}/>
                <ZAxis dataKey={'id'}/>
                <Tooltip content={this.scatterCustomTooltip} offset={25}/>
                <CartesianGrid strokeDasharray='3 3' style={{opacity: 0.3}}/>
            </ScatterChart>
        )
    }

    render() {
        const titleSuffix = this.state.selectedParameter === null ? ' over time': ': ' + this.state.selectedParameter;
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
            </Card>
        )
    }
}