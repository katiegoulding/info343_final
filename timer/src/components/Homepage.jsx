import React from "react";
import { Link } from "react-router-dom";
import constants from "./constants";
import HeaderBar from "./HeaderBar";

export default class Homepage extends React.Component {
    render() {
        return(
            <div>
                <HeaderBar />
                <div className="container">
                    <h1>Every Drop Counts</h1>
                    <h2>The Problem</h2>
                    <li>
                        Less than 3% of the planet's water is fresh water
                    </li>
                    <li>
                        1.6% of the fresh water is locked in polar ice caps and glaciers.
                    </li>
                    <li>
                        Over 7 billion people share the 1% of accessible fresh water.
                    </li>
                    <li>
                        Each American uses an average of 88 gallons of water a day at home.
                    </li>
                    <li>
                        In developing countries, women spend up to 6 hours a day collecting potable water.
                    </li>
                    <p>
                        (Information from: <a href="https://water.org/">water.org</a>, <a href="https://www.epa.gov/watersense/statistics-and-facts">EPA</a>)
                    </p>
                    <br></br>   
                    <button className="btn btn-default"> <Link to={constants.routes.signup}> Sign Up </Link> </button>
                    <p> Already have an account? <Link to={constants.routes.signin}> Sign in! </Link> </p> 
                </div>
            </div>
        );
    }
}