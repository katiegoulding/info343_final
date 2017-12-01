import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";

var config = {
    apiKey: "AIzaSyARE45Qi4idoyl8i_k2_Z49bOamBCrwq00",
    authDomain: "final-project-343.firebaseapp.com",
    databaseURL: "https://final-project-343.firebaseio.com/",
    messagingSenderId: "74000220836"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
