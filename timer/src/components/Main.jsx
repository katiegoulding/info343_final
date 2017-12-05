import React from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Link } from "react-router-dom";
import constants from './constants';
import HeaderBar from './HeaderBar';
import Chart from './Chart';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: "",
            messagesSnapshot: undefined,
        }
    }

    componentWillMount() {
        let mainRef = firebase.database().ref("zipcode/");
        mainRef.on('value', function(snapshot) {
            snapshot.forEach(user => {
                let childData = user.val();
                console.log(childData);                               
            })
        })
        //console.log(mainRef.child('/' + ))
        // firebase.database().ref("zipcode/" + (this.state.currentUser.photoURL) + "/" + (this.state.currentUser.uid)).on("value",
        //     snapshot => this.setState({messagesSnapshot: snapshot})
        // );
    }

    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({
                currentUser: user, 
            });
            if(this.state.currentUser === null) {
                this.props.history.push(constants.routes.home);
            }
            let zipRef = firebase.database().ref("zipcode/" + (this.state.currentUser.photoURL));
            // zipRef.push({ 
            //     userID: this.state.currentUser.uid, 
            //     debugging: "stillWorking?"
            // }); 
        });          
    }

    componentWillUnmount() {       
        firebase.database().ref("zipcode/" + (this.state.currentUser.photoURL) + "/" + (this.state.currentUser.uid)).off("value");        
        this.authUnsub();
    }

    render() {
        return(
            <div>
                <HeaderBar currentUser={this.state.currentUser} />
                <div className="container">
                    <div id="welcome">
                        <h1>Welcome {this.state.currentUser.displayName}</h1>
                    </div>

                    <Link to={constants.routes.timer}><button className="btn btn-info">Take a shower</button></Link>

                    <hr/>
                    <h3>Your recent usage</h3>
                    <Chart />
                    <Chart />

                    <hr/>
                    <h3>Your neighborhood's usage</h3>
                </div>
            </div>
        );
    }
}    