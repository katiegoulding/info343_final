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
        console.log(this.state.zipcode);
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(user => user.updateProfile({
                displayName: this.state.displayName,
                photoURL: this.state.zipcode,
            }))
            .catch(err => this.setState({errorMessage: err.message})
        );

        firebase.auth().onAuthStateChanged(user => {
            if(this.state.currentUser) {
                window.location.href = constants.routes.main;
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