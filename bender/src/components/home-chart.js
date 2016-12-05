import _ from 'lodash'
import React, { Component } from 'react'
import {ResponsiveContainer, AreaChart, Area, Line, YAxis, CartesianGrid, Tooltip} from 'recharts'
import { Card, Select, Button, Tooltip as AntdTooltip} from 'antd'
import 'antd/lib/card/style/css'
import 'antd/lib/select/style/css'

const Option = Select.Option

const chartStyles = {
  fontSize: '12px',
  borderRadius: '5px',
  height: '250px',
  marginLeft: '-25px'
}

const cardStyles = {
  width: '100%',
  margin: '20px 0px',
  borderRadius: '5px'
}

const customTooltip = {
  background: '#fff',
  borderRadius: '3px',
  padding: 10,
  border: '1px solid rgb(217, 217, 217)',
  fontSize: 13,

}

export default class HomeChart extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedVar: Object.keys(this.props.trials[0].results)[0],
      isFilteringAlgos: false,
      selectedAlgos: this.props.algos.map((k) => k.id)
    }

    this.handleSelectMetric = this.handleSelectMetric.bind(this)
    this.handleSelectAlgo = this.handleSelectAlgo.bind(this)
    this._getChartData = this._getChartData.bind(this)
    this._getChartOrFilter = this._getChartOrFilter.bind(this)
    this.customTooltip = this.customTooltip.bind(this)
  }

  handleSelectMetric (selectedVar) {
    this.setState({selectedVar})
  }

  handleSelectAlgo (algo) {
    algo = parseInt(algo)
    let newSelectedAlgos
    if (_.includes(this.state.selectedAlgos, parseInt(algo))) {
      newSelectedAlgos = this.state.selectedAlgos.filter((k) => k !== parseInt(algo))
    } else {
      newSelectedAlgos = _.concat(this.state.selectedAlgos, parseInt(algo))
    }
    this.setState({
      selectedAlgos: newSelectedAlgos
    })
  }

  _getMetricSelect () {
    const metrics = Object.keys(this.props.trials[0].results).map((el) => {
      return <Option value={el}>{el}</Option>
    })

    return (
      <div>
        <AntdTooltip placement='top' title={'Filter Algorithms'}>
          <Button
            style={{ top: '-4px' }}
            type='ghost'
            shape='circle' icon='filter'
            onClick={() => this.setState({isFilteringAlgos: !this.state.isFilteringAlgos})}
          />
        </AntdTooltip>
        <Select
          defaultValue={this.state.selectedVar}
          style={{top: '-4px', margin: '0px 10px', width: '160'}}
          onChange={this.handleSelectMetric}
          size='large'
         >
          {metrics}
        </Select>
      </div>
    )
  }

  tickFormatter (val) {
    return Math.round(val * 100) / 100
  }

  _getChartData () {
    return this.props.trials.map((item) => {
      if (_.includes(this.state.selectedAlgos, item.algo)) {
        return {
          id: item.id,
          value: Math.round(item.results[this.state.selectedVar] * 10000) / 10000
        }
      }
    })
  }

  customTooltip (item) {
      const trial = this.props.trials.filter((k) => k.id === item.payload[0].payload.id)[0]
      console.log(trial)
    //   const parameters = _.forOwn(trial.parameters, (v, k) => <li>{k}: {v}</li>)
      return (
        <div style={customTooltip}>
          <h3 style={{color: '#1882fd', padding: '0 5'}}>{item.payload[0].payload.value}</h3>
          <h3>{trial.algo_name}</h3>
          <h4 style={{marginTop: 3}}>Parameters</h4>
          <ul>{Object.keys(trial.parameters).map((k) => <li>{k}: {_.round(trial.parameters[k], 4)}</li>)}</ul>
          <h4 style={{marginTop: 3}}>Metrics</h4>
          <ul>{Object.keys(trial.results).map((k) => <li>{k}: {_.round(trial.results[k], 4)}</li>)}</ul>
        </div>
      )
  }

  _getChartOrFilter () {
      if (this.state.isFilteringAlgos) {
          return (
              <div>
                  <Select
                    multiple
                    size='normal'
                    style={{width: '100%'}}
                    placeholder='Choose Algos'
                    onChange={this.handleSelectAlgo}
                    defaultValue={this.state.selectedAlgos}
                    >
                    {this.props.algos.map((k) => <Option key={k.id} value={k.id}>{k.name}</Option>)}
                  </Select>
                  <br /><br />
                  <Button
                    type='primary'
                    onClick={() => this.setState({isFilteringAlgos: !this.state.isFilteringAlgos})}
                  >Apply</Button>
              </div>
          )
      }
      return (
          <AreaChart style={chartStyles} margin={{top: 0, right: 0, left: 0, bottom: 0}} data={this._getChartData()}>
            <YAxis domain={['auto', 'auto']} tickFormatter={this.tickFormatter} />
            <CartesianGrid strokeDasharray='3 3' style={{opacity: 0.5}} />
            <Tooltip content={this.customTooltip} />
            <Area type='monotone' dataKey={'value'} fill='rgba(24, 131, 255, 0.1)' stroke='#108ee9' activeDot={{ r: 5 }} />
            <Line type='monotone' dataKey={'value'} stroke='red' activeDot={{ r: 5 }} />
          </AreaChart>
      )
  }

  render () {
    return (
      <Card title={this.state.selectedVar + ' over time'} extra={this._getMetricSelect()} style={cardStyles} bodyStyle={{height: '250px'}}>
        <ResponsiveContainer>
            {this._getChartOrFilter()}
        </ResponsiveContainer>
      </Card>
    )
  }
}
