import React, { Component } from 'react'
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
                    'comment': '',
                    'isExpanded': false
                },
                {
                    'id': 2,
                    'name': 'Neural Network',
                    'author': 'soukiassianb',
                    'date': '15/11/2016',
                    'score': 0.68,
                    'parameter': 47,
                    'comment': '',
                    'isExpanded': false
                },
                {
                    'id': 3,
                    'name': 'Neural Network',
                    'author': 'Vthorey',
                    'date': '15/11/2016',
                    'score': 0.74,
                    'parameter': 78,
                    'comment': '',
                    'isExpanded': false
                },
                {
                    'id': 4,
                    'name': 'Neural Network',
                    'author': 'Stan',
                    'date': '15/11/2016',
                    'score': 0.83,
                    'parameter': 80,
                    'comment': '',
                    'isExpanded': false
                },
                {
                    'id': 5,
                    'name': 'Neural Network',
                    'author': 'Vthorey',
                    'date': '15/11/2016',
                    'score': 0.8,
                    'parameter': 80,
                    'comment': '',
                    'isExpanded': false
                },
                {
                    'id': 6,
                    'name': 'Neural Network',
                    'author': 'Vthorey',
                    'date': '15/11/2016',
                    'score': 0.74,
                    'parameter': 78,
                    'comment': '',
                    'isExpanded': false
                },
                {
                    'id': 7,
                    'name': 'Neural Network',
                    'author': 'Stan',
                    'date': '15/11/2016',
                    'score': 0.83,
                    'parameter': 80,
                    'comment': '',
                    'isExpanded': false
                },
                {
                    'id': 8,
                    'name': 'Neural Network',
                    'author': 'Vthorey',
                    'date': '15/11/2016',
                    'score': 0.8,
                    'parameter': 80,
                    'comment': '',
                    'isExpanded': false
                },
                {
                    'id': 9,
                    'name': 'Neural Network',
                    'author': 'Vthorey',
                    'date': '15/11/2016',
                    'score': 0.74,
                    'parameter': 78,
                    'comment': '',
                    'isExpanded': false
                },
                {
                    'id': 10,
                    'name': 'Neural Network',
                    'author': 'Stan',
                    'date': '15/11/2016',
                    'score': 0.83,
                    'parameter': 80,
                    'comment': '',
                    'isExpanded': false
                }
            ]
        }
        this._getListItems = this._getListItems.bind(this)
        this.handleItemClick = this.handleItemClick.bind(this)
    }

    handleItemClick (id, isExpanded) {
        this.setState({
            items: this.state.items.map((e) => {
                if (e.id == id) {
                    e.isExpanded = !isExpanded
                }
            })
        })
    }

    _getListItems () {
        return this.state.items.map((item, i) => {
            return <Item key={i} item={item} handleItemClick={this.handleItemClick} />
        })
    }

    render () {
        return (
            <div className="main-container">
            Latest Experiments
                <div className="item-list">
                    <ul>
                        {this._getListItems()}
                    </ul>
                </div>
            </div>
        )
    }
}
