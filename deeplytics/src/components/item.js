import React, { Component } from 'react'


export default class Item extends Component {
    constructor (props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
        this.state = {
            isExpanded: false
        }
    }

    handleClick () {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }

    render () {
        let item
        if(this.state.isExpanded) {
            item = (
                <li className="item item-expanded" onClick={this.handleClick}>
                    <h2>{this.props.item.name}</h2>
                    <div className="author">{this.props.item.author}</div>
                    <div className="score">{this.props.item.score}</div>
                    <div>
                        
                    </div>
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
