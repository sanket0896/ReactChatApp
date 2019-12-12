import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import UserPane from './components/UserPane/UserPane';
import MessagePane from './components/MessagePane/MessagePane';
import SetUsername from './components/SetUsername/SetUsername';

class App extends Component {
  render() {

    if(this.props.usernameSetSuccess){
      return (
        <div id="container">
          <UserPane />
          <MessagePane />
        </div>
      );
    }
    else{
      return (
        <div id="container">
          <SetUsername />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return ({
    usernameSetSuccess : state.usernameSetSuccess
  });
}

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps,mapDispatchToProps)(App);
