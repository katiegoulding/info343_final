import React from "react";
import logo from '../images/splish+logo.png';
import splish from '../images/Splish+logo_small.png';
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
            <nav className="navbar navbar-default bg-default">
                <Link to={constants.routes.home} className="navbar-brand">
                <img src={logo} height="32px" className="d-inline-block align-top" alt=""/>
                </Link>   
                    <ul>
                        
                        <li><a href={constants.routes.signin}>Log in</a></li>
                        <li><a href={constants.routes.signup}>Sign up</a></li>
                        <li><a href="#Contact">Contact</a></li>
                        <li><a href="#TheTeam">Team</a></li>
                    </ul>
                {(this.props.currentUser ? ( <button id="logout" className="btn btn-default" onClick={evt => this.handleSignOut(evt)}> Logout </button> ) : ( null ))}                     
            </nav>
        );
    }

}