import React from "react";
import logo from '../images/RealLogo.svg';
import logo2 from '../images/splish.png';
import { Link } from "react-router-dom";
import constants from './constants';
import "./style.css";

export default class HeaderBar extends React.Component {
    render() {
        return (
            <div id="headerBar2">
                <div id="headerBarLogo">
                    <div id="LOGO">
                        <Link to={constants.routes.home}>
                            <img src={logo} width="53" height="70" className="d-inline-block align-top" alt=""/>
                            <img src={logo2} className="d-inline-block align-top pl-3" alt=""/>
                        </Link>
                    </div>
                </div>                       
            </div>
        );
    }

}