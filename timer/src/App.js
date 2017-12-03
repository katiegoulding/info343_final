import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import constants from "./components/constants";
import './App.css';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import Homepage from './components/Homepage'; 
import Main from './components/Main';
import MyData from './components/MyData';
import DataComparison from './components/DataComparison';
import Settings from './components/Settings';
import Timer from './components/Timer';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Switch>
          <Route exact path={constants.routes.home} component={Homepage} />
          <Route path={constants.routes.signin} component={SignInForm} />
          <Route path={constants.routes.signup} component={SignUpForm} />
          <Route path={constants.routes.main} component={Main} />
          <Route path={constants.routes.myData} component={MyData} />
          <Route path={constants.routes.dataComp} component={DataComparison} />
          <Route path={constants.routes.timer} component={Timer} />
          <Route path={constants.routes.settings} component={Settings} />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;