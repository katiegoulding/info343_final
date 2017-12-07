import React from "react";
import logo from '../images/splish+logo.png';
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import constants from './constants';
import "./style.css";

export default class HeaderBar3 extends React.Component {
    handleSignOut(evt) {
        firebase.auth().signOut()
        .catch(err => this.setState({ errorMessage: err.message }))
        .then(window.location.href = constants.routes.home)
    }
    
    render() {
        return (
            <div id="headerBar3">
                <div id="headerBarLogo2">
                        <Link to={constants.routes.main}>
                            <img src={logo} height="32px" className="d-inline-block align-top" alt=""/>
                        </Link>
<<<<<<< HEAD
                        <div id="myData-logOut1" className="d-flex justify-content-between">
                            <Link to={constants.routes.main} id="linktoSignup" className="pt-1">Home</Link>
                            <Link to={constants.routes.about} id="linktoSignup" className="pt-1">About</Link>  
=======
                        <div id="myData-logOut" className="d-flex justify-content-between">
                            <Link to={constants.routes.main} id="linktoSignup" className="pt-1">Back to My Data</Link>  
                            <Link to={constants.routes.about} id="linktoSignup" className="pt-1">About</Link>
>>>>>>> 02f642d190bd6c1192dab1c7c852047d2ce86a5f
                            <Link to={constants.routes.home} id="linktoSignup" className="pt-1">Log out</Link>
                        </div>
                </div>                       
            </div>
        );
    }

}