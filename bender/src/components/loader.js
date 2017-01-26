import React, { Component } from 'react'
import logo from '../images/bender-logo.svg'

export default class Loader extends Component {
  render () {
    return (
      <div style={{textAlign: 'center', marginTop: '200px'}}>
        <img
          src={logo}
          style={{height: '100px'}}
          alt='logo'
          style={{cursor: 'pointer'}}
        />
       <h1>Loading...</h1>
      </div>
    )
  }
}
