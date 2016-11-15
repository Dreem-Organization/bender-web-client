import React, { Component } from 'react'
import logo from './images/logo.svg'
import ItemList from './components/item-list'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h1>Deeplytics</h1>
        </div>
        <ItemList />
      </div>
    )
  }
}

export default App
