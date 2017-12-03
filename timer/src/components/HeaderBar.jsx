import React from "react";
import logo from '../images/weather.svg';
import { Link } from "react-router-dom";
import firebase from "firebase/app";
import constants from './constants';

export default class HeaderBar extends React.Component {
    handleSignOut(evt) {
        firebase.auth().signOut()
        .catch(err => this.setState({ errorMessage: err.message }))
        .then(window.location.href = constants.routes.home)
    }

    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <Link to={constants.routes.home} className="navbar-brand">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
                </Link>   
                {(this.props.currentUser ? ( <button id="logout" className="btn btn-default" onClick={evt => this.handleSignOut(evt)}> Logout </button> ) : ( null ))}                     
            </nav>
        );
    }

}