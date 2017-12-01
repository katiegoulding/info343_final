import React from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Link } from "react-router-dom";
import constants from './constants'
import HeaderBar from './HeaderBar'

export default class SignInForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
            email: "",
            password: "",
            errorMessage: ""
        }
    }

    handleSignIn(evt) {
        evt.preventDefault();        
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(err => this.setState({errorMessage: err.message}));        
    }

    render() {
        return(
            <div>
                <HeaderBar />
                <div className="container">
                    <h1>Sign In</h1>

                    <form onSubmit={evt => this.handleSignIn(evt)}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" className="form-control" placeholder="Email" onInput={evt => this.setState({email: evt.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" className="form-control" placeholder="Password" onInput={evt => this.setState({password: evt.target.value})}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-default">
                                Sign In
                            </button>
                        </div>
                        <p>Don't have an account yet? <Link to={constants.routes.signup}>Sign up.</Link></p>
                    </form>
                </div>
            </div>
        );
    }
}    