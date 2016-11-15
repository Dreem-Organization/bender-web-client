import React, { Component } from 'react'


export default class Item extends Component {
    constructor (props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick () {
        this.props.handleItemClick(this.props.item.id, this.props.item.isExpanded)
    }

    render () {
        let item
        if(this.props.isExpanded) {
            item = (
                <li className="item item-expanded" onClick={this.handleClick}>
                    <h3>{this.props.item.name}</h3>
                    <div className="author">{this.props.item.author}</div>
                    <div className="score">{this.props.item.score}</div>
                </li>
            )
        } else {
            item = (
                <li className="item" onClick={this.handleClick}>
                    <h3>{this.props.item.name}</h3>
                    <div className="author">{this.props.item.author}</div>
                    <div className="score">{this.props.item.score}</div>
                </li>
            )
        }
        return item
    }
}
