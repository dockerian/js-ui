import React, { Component } from 'react';
import './App.css';

class AppHeader extends Component {
  render() {
    return (
      <div id="appHeader">
        <header className="app-header">
          <button id="btn-menu" className="btn-menu"/>
        </header>
      </div>
    );
  }
}

export default AppHeader;
