import React from "react";
import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/databse";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
            email: "",
            password: "",
            passwordConfirm: "",
        }
    }

    handleSignUp(evt) {
        evt.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch(err => this.setState({errorMessage: err.message})
        );
    }

    render() {
        return(
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

                    <div className="form-group">
                        <button type="submit" className="btn btn-default">
                            Sign Up
                        </button>
                    </div>
                </form>
                {/* Wrap "Sign in!" in a Link */}
                <p>Already have an account? <strong>Sign in!</strong></p>
            </div>
        );
    }
}    