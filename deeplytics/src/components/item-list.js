import React, { Component } from 'react'
import HomeChart from './home-chart'
import Item from './item'

export default class ItemList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: [
        {
          'id': 1,
          'name': 'Neural Network',
          'author': 'Stan',
          'date': '15/11/2016',
          'score': 0.86,
          'parameter': 80,
          'comment': ''
        },
        {
          'id': 2,
          'name': 'Neural Network',
          'author': 'soukiassianb',
          'date': '15/11/2016',
          'score': 0.68,
          'parameter': 47,
          'comment': ''
        },
        {
          'id': 3,
          'name': 'Neural Network',
          'author': 'Vthorey',
          'date': '15/11/2016',
          'score': 0.74,
          'parameter': 78,
          'comment': ''
        },
        {
          'id': 4,
          'name': 'Neural Network',
          'author': 'Stan',
          'date': '15/11/2016',
          'score': 0.83,
          'parameter': 80,
          'comment': ''
        },
        {
          'id': 5,
          'name': 'Neural Network',
          'author': 'Vthorey',
          'date': '15/11/2016',
          'score': 0.8,
          'parameter': 80,
          'comment': ''
        },
        {
          'id': 6,
          'name': 'Neural Network',
          'author': 'Vthorey',
          'date': '15/11/2016',
          'score': 0.74,
          'parameter': 78,
          'comment': ''
        },
        {
          'id': 7,
          'name': 'Neural Network',
          'author': 'Stan',
          'date': '15/11/2016',
          'score': 0.83,
          'parameter': 80,
          'comment': ''
        },
        {
          'id': 8,
          'name': 'Neural Network',
          'author': 'Vthorey',
          'date': '15/11/2016',
          'score': 0.8,
          'parameter': 80,
          'comment': ''
        },
        {
          'id': 9,
          'name': 'Neural Network',
          'author': 'Vthorey',
          'date': '15/11/2016',
          'score': 0.74,
          'parameter': 78,
          'comment': ''
        },
        {
          'id': 10,
          'name': 'Neural Network',
          'author': 'Stan',
          'date': '15/11/2016',
          'score': 0.83,
          'parameter': 80,
          'comment': ''
        },
        {
          'id': 11,
          'name': 'Neural Network',
          'author': 'Vthorey',
          'date': '15/11/2016',
          'score': 0.74,
          'parameter': 78,
          'comment': ''
        },
        {
          'id': 12,
          'name': 'Neural Network',
          'author': 'Stan',
          'date': '15/11/2016',
          'score': 0.53,
          'parameter': 80,
          'comment': ''
        },
        {
          'id': 13,
          'name': 'Neural Network',
          'author': 'Stan',
          'date': '15/11/2016',
          'score': 0.91,
          'parameter': 80,
          'comment': ''
        }
      ]
    }

    this._getListItems = this._getListItems.bind(this)
  }

  _getListItems () {
    return this.state.items.map((item, i) => {
      return <Item key={i} item={item} />
    })
  }

  render () {
    return (
      <div className='main-container'>
        <HomeChart items={this.state.items} />
        Latest Experiments
        <div className='item-list'>
          <ul>{this._getListItems()}</ul>
        </div>
      </div>
      )
  }
}
