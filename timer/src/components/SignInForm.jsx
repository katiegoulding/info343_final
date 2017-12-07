import React from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Link } from "react-router-dom";
import constants from './constants';
import HeaderBar from './HeaderBar';
import "./style.css";
import HeaderBar2 from './HeaderBar2';

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

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({currentUser: user});
            console.log(this.state.currentUser);                   
        }); 
    }

    componentWillUnmount() {
        this.authUnsub();
    }

    handleSignIn(evt) {
        evt.preventDefault();  
        this.setState({errorMessage: undefined});      
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(err => this.setState({errorMessage: err.message}));        
        
        // More secure way to do this than an if statement?
        if(this.state.currentUser) {
            this.props.history.push(constants.routes.main);
        } 
    }

    render() {
        return(
            <div>
                <HeaderBar2 />
                <div className="container text-center pl-1" id="SignInForm">
                    <p id="signInHeader"><span>Log in</span></p>

                    <form onSubmit={evt => this.handleSignIn(evt)}>
                        <div id="inputSignin1" className="form-group">
                            <input id="email" type="email" className="form-control" placeholder="Email address" onInput={evt => this.setState({email: evt.target.value})}/>
                        </div>
                        <div id="inputSignin2" className="form-group">
                            <input id="password" type="password" className="form-control" placeholder="Password" onInput={evt => this.setState({password: evt.target.value})}/>
                        </div>
                        <div id="inputSignin3"className="form-group">
                            <button id="logInBtn" type="submit" className="btn btn-default" 
                            disabled={(this.state.email == "" || this.state.password == "")? true: false}>
                                Log in
                            </button>
                        </div>
                        <p id="linktoSignup">Don't have an account? <Link to={constants.routes.signup} id="signupLink">Sign up.</Link></p>
                    </form>
                    <div id="agreePolicyDiv">
                        <p id="agreePolicy">If you click "Log in", you agree to Splish's Terms & Conditions and Privacy Policy.</p>
                    </div>
                </div>
            </div>
        );
    }
}    