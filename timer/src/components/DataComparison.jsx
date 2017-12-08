import React from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import constants from './constants'
import HeaderBar3 from './HeaderBar3';

export default class DataComparison extends React.Component {
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
                    <h1>Data Comparison</h1>
                </div>
            </div>
        );
    }
}    