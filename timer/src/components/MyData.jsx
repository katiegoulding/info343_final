import React from "react";
// import firebase from "firebase/app";
// import 'firebase/auth';
// import 'firebase/database';
// import { Link } from "react-router-dom";
// import constants from './constants'
import HeaderBar from './HeaderBar'

export default class MyData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        }
    }

    render() {
        return(
            <div>
                <HeaderBar />
                <div className="container">
                    <h1>My Data</h1>
                </div>
            </div>
        );
    }
}    