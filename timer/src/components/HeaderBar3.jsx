import React from "react";
import logo from '../images/splish+logo.png';
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import constants from './constants';
import "./style.css";

export default class HeaderBar extends React.Component {
    handleSignOut(evt) {
        firebase.auth().signOut()
        .catch(err => this.setState({ errorMessage: err.message }))
        .then(window.location.href = constants.routes.home)
    }
    
    render() {
        return (
            <div id="headerBar3">
                <div id="headerBarLogo2">
                        <Link to={constants.routes.home}>
                            <img src={logo} height="32px" className="d-inline-block align-top" alt=""/>
                        </Link>
                        <div id="myData-logOut" className="d-flex justify-content-between">
                            <Link to={constants.routes.main} id="linktoSignup" className="pt-1">Back to My Data</Link>  
                            <Link to={constants.routes.about} id="linktoSignup" className="pt-1">About</Link>
                            <Link to={constants.routes.home} id="linktoSignup" className="pt-1">Log out</Link>
                        </div>
                </div>                       
            </div>
        );
    }

}