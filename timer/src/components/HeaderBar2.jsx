import React from "react";
import logo from '../images/splish+logo.png';

import { Link } from "react-router-dom";
import constants from './constants';
import "./style.css";

export default class HeaderBar2 extends React.Component {
    render() {
        return (
            <div id="headerBar2">
                <div id="headerBarLogo">
                    <div id="LOGO">
                        <Link to={constants.routes.home}>
                            <img src={logo} width="231px" className="d-inline-block align-top" alt=""/>
                        </Link>
                    </div>
                </div>                       
            </div>
        );
    }

}