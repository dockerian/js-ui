import React, { Component } from 'react';
import logo from './assets/logo.svg';
import AppHeader from './AppHeader.js';
import AppFooter from './AppFooter.js';
import AppNote from './AppNote.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader/>
        <div className="app-main">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="app-title">Dockerian JsUi by React.js</h1>
        </div>
        <AppNote/>
        <AppFooter/>
      </div>
    );
  }
}

export default App;
