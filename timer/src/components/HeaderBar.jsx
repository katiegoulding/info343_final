import React from "react";
import logo from '../images/weather.svg';

export default class HeaderBar extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="">
                <img src={logo} width="30" height="30" className="d-inline-block align-top" alt=""/>
                
                </a>
            </nav>
        );
    }

}