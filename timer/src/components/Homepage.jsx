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
                    <h1>Homepage!</h1>
                    <button className="btn btn-default"> <Link to={constants.routes.signup}> Sign Up </Link> </button>
                    <p> Already have an account? <Link to={constants.routes.signin}> Sign in! </Link> </p> 
                </div>
            </div>
        );
    }
}