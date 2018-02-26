import React, { Component } from 'react';
import './App.css';
import UserPane from './components/UserPane';
import MessagePane from './components/MessagePane';

class App extends Component {
  render() {
    return (
      <div id="container">
        <UserPane />
        <MessagePane />
      </div>
    );
  }
}

export default App;
