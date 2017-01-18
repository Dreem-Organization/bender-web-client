import _ from 'lodash'
import React, { Component } from 'react'
import { Menu, Select, Button, Icon, message } from 'antd'

// function handleButtonClick (e) {
//   message.info('Click on left button.')
//   console.log('click left button', e)
// }

function handleMenuClick (e) {
  message.info('Click on menu item.')
  console.log('click', e)
}

const SubMenu = Menu.SubMenu
const Option = Select.Option
const OptGroup = Select.OptGroup

const descOptions = [
  <Option key={1} value={'true'}>Desc</Option>,
  <Option key={2} value={'false'}>Asc</Option>
]

export default class TrialFilterer extends Component {
  constructor (props) {
    super(props)

    this._renderOrderMenu = this._renderOrderMenu.bind(this)
    this._getOrderOptions = this._getOrderOptions.bind(this)
    this._getAlgoOptions = this._getAlgoOptions.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSetFilters = this.handleSetFilters.bind(this)

    this.state = {
      filters: null
    }
  }

  componentDidMount () {
    this.setState({filters: this.props.filters})
  }

  _renderOrderMenu () {
    const metrics = this.props.experiment.metrics.map((m, i) => <Menu.Item key={m}>{m}</Menu.Item>)
    return (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key='1'>Date</Menu.Item>
        <SubMenu title='Metrics'>
          {metrics}
        </SubMenu>
      </Menu>
    )
  }

  _getOrderOptions () {
    const metrics = _.map(this.props.experiment.metrics, (m) => <Option key={m}>{m}</Option>)
    const options = [<Option key={'date'}>Date</Option>].concat(metrics)
    return (
      <OptGroup label='Order by'>
        {options}
      </OptGroup>
    )
  }

  _getLimitOptions () {
    const options = _.map([10, 20, 30, 60, 100], (k, i) => <Option key={i} value={k.toString()}>{k}</Option>)
    return (
      <OptGroup label='Limit'>
        {options}
      </OptGroup>
    )
  }

  _getAlgoOptions () {
    const algos = _.map(this.props.algos, (a, i) => <Option key={i} value={a.id}>{a.name}</Option>)
    const options = [<Option key={'all'} value={null}>All</Option>].concat(algos)
    return (
      <OptGroup label='Algo'>
        {options}
      </OptGroup>
    )
  }

  handleSetFilters () {
    this.props.setFilters(this.state.filters)
  }

  handleChange (key, val) {
    const filters = Object.assign({}, this.state.filters)
    filters[key] = val
    this.setState({filters})
  }

  render () {
    return (
      <div className='filterer'>
        <Select
          defaultValue={this.props.filters.algo}
          onChange={(v) => this.handleChange('algo', v)}
          className={'sort-button'}
         >
          {this._getAlgoOptions()}
        </Select>
        <Select
          defaultValue={this.props.filters.order}
          onChange={(v) => this.handleChange('order', v)}
          className={'sort-button'}
         >
          {this._getOrderOptions()}
        </Select>
        <Select
          defaultValue={this.props.filters.desc}
          onChange={(v) => this.handleChange('desc', v)}
          className={'sort-button'}
         >
          {descOptions}
        </Select>
        <Select
          defaultValue={this.props.filters.limit}
          onChange={(v) => this.handleChange('limit', v)}
          className={'sort-button'}
         >
          {this._getLimitOptions()}
        </Select>
        <Button type='primary' className={'sort-button apply'} onClick={this.handleSetFilters}>
          Apply <Icon type='filter' />
        </Button>
      </div>
    )
  }
}
