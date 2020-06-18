import React, { Component } from 'react';
import './App.css';

class AppFooter extends Component {
  render() {
    let year = (new Date()).getFullYear()
    let yearCopy = (year <= 2020 ? '' : '2020-') + year
    return (
      <footer className="app-footer">
      &copy; {yearCopy}
      </footer>
    );
  }
}

export default AppFooter;
