import React from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import constants from "./constants";
import HeaderBar from './HeaderBar';
import "firebase/auth";
import "firebase/database";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
            email: "",
            password: "",
            passwordConfirm: "",
            displayName: "",            
            zipcode: "",
        }
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({currentUser: user});
        });
    }

    componentWillUnmount() {
        this.authUnsub();
    }

    handleSignUp(evt) {
        evt.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => user.updateProfile({
                displayName: this.state.displayName
            }))
            .catch(err => this.setState({errorMessage: err.message})
        );

        firebase.auth().onAuthStateChanged(user => {
            if(this.state.currentUser) {
                this.props.history.push(constants.routes.main);
            } 
        });
    }

    render() {
        return(
            <div>
                <HeaderBar />
                <div className="container">
                    <h1>Sign Up</h1>
                    <form onSubmit={evt => this.handleSignUp(evt)}>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input 
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="enter your email address"
                                value={this.state.email}
                                onInput={(evt) => this.setState({email: evt.target.value})}
                            />                        
                        </div>                    
                        <div className="form-group">
                            <label htmlFor="password">Password (minimum of 6 characters): </label>
                            <input 
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="enter your password"
                                value={this.state.password}
                                onInput={(evt) => this.setState({password: evt.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordConfirm">Please re-enter your password: </label>
                            <input 
                                id="passwordConfirm"
                                type="password"
                                className="form-control"
                                placeholder="confirm your password"
                                value={this.state.passwordConfirm}
                                onInput={(evt) => this.setState({passwordConfirm: evt.target.value})}
                            />                        
                        </div>
                        <hr></hr>
                        <div className="form-group">
                            <label htmlFor="displayName">Display Name: </label>
                            <input 
                                id="displayName" 
                                type="text" 
                                className="form-control" 
                                placeholder="enter the name you would like displayed" 
                                value={this.state.displayName}
                                onInput={evt => this.setState({displayName: evt.target.value})}
                            />
                        </div> 
                        <div className="form-group">
                            <label htmlFor="zipcode">Zipcode: </label>
                            <input 
                                id="zipcode" 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter your zipcode" 
                                value={this.state.zipcode}
                                onInput={evt => this.setState({zipcode: evt.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-default">
                                Sign Up
                            </button>
                        </div>
                    </form>
                    <p> Already have an account? <Link to={constants.routes.signin}> Sign in! </Link> </p>
                </div>
            </div>
        );
    }
}    