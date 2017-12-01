import React, { Component } from 'react';
import SignUpForm from './components/SignUpForm';
import './App.css';
import SignInForm from './components/SignInForm'
import HeaderBar from './components/HeaderBar' 

class App extends Component {
  render() {
    return (
      <div>
        <HeaderBar/>
        <SignUpForm />
        <SignInForm/>
      </div>
    );
  }
}

export default App;