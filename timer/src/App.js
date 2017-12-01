import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import constants from "./components/constants";

import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Homepage from './components/Homepage'; 

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Switch>
          <Route exact path={constants.routes.home} component={Homepage} />
          <Route path={constants.routes.signin} component={SignInForm} />
          <Route path={constants.routes.signup} component={SignUpForm} />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;