import React from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import constants from './constants'
import Chart from './Chart';
import HeaderBar3 from './HeaderBar3';
import "./style.css";

export default class MyData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: ""
        }
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({
                currentUser: user, 
            });            
            if(this.state.currentUser === null) {
                this.props.history.push(constants.routes.home);
            }
        });  
    }

    componentWillUnmount() {
        this.authUnsub();
    }

    render() {
        return(
            <div>
                <HeaderBar3 />
                <div className="container">
                    <h1>My Data</h1>
                    
                    <Chart />
                </div>
            </div>
        );
    }
}    