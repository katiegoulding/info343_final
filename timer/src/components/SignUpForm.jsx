import React from "react";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import constants from "./constants";
import "firebase/auth";
import "firebase/database";
import "./style.css";
import HeaderBar2 from './HeaderBar2';

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
            gender: "",
            age: "",
            validZips: [98126, 98133, 98136, 98134, 98144, 98146, 98148, 98155, 98154, 98164, 98166, 98168, 98177, 98178, 98190, 98188, 98198, 98195, 98199, 98224, 98251, 98288, 98354, 98001, 98003, 98002, 98005, 98004, 98007, 98006, 98009, 98008, 98011, 98010, 98014, 98019, 98022, 98024, 98023, 98025, 98028, 98027, 98030, 98029, 98032, 98031, 98034, 98033, 98038, 98040, 98039, 98042, 98045, 98047, 98051, 98050, 98053, 98052, 98055, 98057, 98056, 98059, 98058, 98064, 98068, 98065, 98070, 98072, 98075, 98074, 98077, 98083, 98092, 98101, 98103, 98102, 98105, 98104, 98107, 98106, 98109, 98108, 98112, 98115, 98114, 98117, 98116, 98119, 98118, 98122, 98121, 98125]
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
        if(this.state.password !== this.state.passwordConfirm) {
            this.setState({errorMessage: "Please make sure your passwords match"}) 
        } else if (!this.state.displayName) { 
            this.setState({errorMessage: "Please enter a display name" })
        } else if (this.state.validZips.indexOf(Number(this.state.zipcode)) < 0) {
            this.setState({errorMessage: "Please enter a zip code in King County"})
        } else {
             firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => user.updateProfile({
                displayName: this.state.displayName,
                photoURL: this.state.zipcode,
            }))
            .catch(err => this.setState({errorMessage: err.message})
        );
        }
        firebase.auth().onAuthStateChanged(user => {
            if(this.state.currentUser) {
                window.location.href = constants.routes.main;
            } 
        });
    }

    render() {
        return(
            <div>
                <HeaderBar2 />
                {
                    this.state.errorMessage ?
                    <div className="alert alert-danger text-center">{this.state.errorMessage}</div> :
                    undefined
                }
                <div className="container text-center" id="SignInForm">
                    <p id="signInHeader"><span>Sign up</span></p>
                    <form onSubmit={evt => this.handleSignUp(evt)}>
                        <div id="inputSignin1" className="form-group">
                            <input 
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Email address"
                                value={this.state.email}
                                onInput={(evt) => this.setState({email: evt.target.value})}
                            />                        
                        </div>                    
                        <div id="inputSignin2" className="form-group">
                            <input 
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={this.state.password}
                                onInput={(evt) => this.setState({password: evt.target.value})}
                            />
                        </div>
                        <div id="inputSignin2" className="form-group">
                            <input 
                                id="passwordConfirm"
                                type="password"
                                className="form-control"
                                placeholder="Confirm password"
                                value={this.state.passwordConfirm}
                                onInput={(evt) => this.setState({passwordConfirm: evt.target.value})}
                            />                        
                        </div>
                        {
                            this.state.password === this.state.passwordConfirm ? null : 
                            <p className="text-danger text-left"><small>Need to match the password</small></p>
                        }
                        <div id="inputSignin2" className="form-group">
                            <input 
                                id="displayName" 
                                type="text" 
                                className="form-control" 
                                placeholder="What should we call you?" 
                                value={this.state.displayName}
                                onInput={evt => this.setState({displayName: evt.target.value})}
                            />
                        </div> 
                        <div className="form-group">
                            <input 
                                id="zipcode" 
                                type="text" 
                                className="form-control" 
                                placeholder="Zipcode" 
                                value={this.state.zipcode}
                                onInput={evt => this.setState({zipcode: evt.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                id="gender" 
                                type="text" 
                                className="form-control" 
                                placeholder="Gender you identify with" 
                                value={this.state.gender}
                                onInput={evt => this.setState({gender: evt.target.value})}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                id="age" 
                                type="number"
                                inputMode="numeric" 
                                className="form-control" 
                                placeholder="Age" 
                                value={this.state.age}
                                onInput={evt => this.setState({age: evt.target.value})}
                            />
                        </div>
                        <div id="agreePolicyDiv2">
                            <p id="agreePolicy">If you click "Sign up", you agree to Splish's Terms & Conditions and Privacy Policy.</p>
                        </div>
                        <div id="inputSignin3"className="form-group">
                            
                            <button id="signupBtn" type="submit" className="btn btn-default" 
                            disabled={((this.state.password === this.state.passwordConfirm) && 
                                this.state.email !== "" && this.state.displayName !== "" && this.state.zipcode !== "")? false : true}>
                                Sign up
                            </button>
                        </div>
                    </form>
                    <p id="linktoSignup"> Already have an account? <Link to={constants.routes.signin} id="signinLink"> Sign in! </Link> </p>
                </div>
            </div>
        );
    }
}    