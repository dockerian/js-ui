import React, { Component } from 'react';
import './App.css';

class AppNote extends Component {
  render() {
    return (
      <div id="appNote">
        <p className="app-intro">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    );
  }
}

export default AppNote;
