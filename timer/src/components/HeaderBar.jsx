import React from "react";
import logo from '../images/weather.svg';
import { Link } from "react-router-dom";
import constants from './constants';

export default class HeaderBar extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <Link to={constants.routes.home} className="navbar-brand">
                    <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
                </Link>                
            </nav>
        );
    }

}