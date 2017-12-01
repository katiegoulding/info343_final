import React, { Component } from 'react';
import './App.css';
import SignInForm from './components/SignInForm'
import HeaderBar from './components/HeaderBar' 

class App extends Component {
  render() {
    return (
      <div>
        <HeaderBar/>
        <SignInForm/>
      </div>
    );
  }
}

export default App;