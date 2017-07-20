import React, {Component} from 'react'
import logo from '../images/bender-logo.svg'

export default class Loader extends Component {
    render() {
        return (
            <div style={{textAlign: 'center', marginTop: '200px'}}>
                <img
                    src={logo}
                    style={{height: '80px'}}
                    alt='logo'
                />
                <h1>Loading...</h1>
            </div>
        )
    }
}
