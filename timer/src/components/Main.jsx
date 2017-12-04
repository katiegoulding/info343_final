import React from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Link } from "react-router-dom";
import constants from './constants';
import HeaderBar from './HeaderBar';
import timerIcon from '../images/timerIcon.png';
import profileIcon from '../images/profileIcon.png';
import comparisonIcon from '../images/comparisonIcon.png';
import settingsIcon from '../images/settingsIcon.png';

export default class Main extends React.Component {
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
        console.log(this.state.currentUser)
        // let zipRef = firebase.database().ref(this.state.currentUser.photoURL + "/"); 
        // this.zipRef.push({
        //     zip: this.state.currentUser.photoURL
        // });  

        return(
            <div>
                <HeaderBar currentUser={this.state.currentUser} />
                <div className="container">
                    <div id="welcome">
                        <h1>Welcome {this.state.currentUser.email}</h1>
                        {/* Display name only shows after page reloads ? */}
                        <h1> {this.state.currentUser.displayName} </h1> 
                    </div>

                    <hr></hr>
                    <Link to={constants.routes.timer}>
                    <div id="showerTimer">
                        <img src={timerIcon} alt="timer" />
                        <p> Shower Timer </p>
                    </div>
                    </Link>

                    <hr></hr>
                    <Link to={constants.routes.myData} currentuser={this.state.currentUser}>
                    <div id="myData">
                            <img src={profileIcon} alt="profile" />
                        <p> My Data </p>
                    </div>
                    </Link>

                    <hr></hr>
                    <Link to={constants.routes.dataComp}>
                    <div id="dataComp">
                        <img src={comparisonIcon} alt="data comparison" />
                        <p> Data Comparison </p>
                    </div>
                    </Link>

                    <hr></hr>
                    <Link to={constants.routes.settings}>
                    <div id="settings">
                        <img src={settingsIcon} alt="settings" />
                        <p> Settings </p>
                    </div>
                    </Link>
                    
                    <hr></hr>
                </div>
            </div>
        );
    }
}    