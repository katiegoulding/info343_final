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
            userData: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                datasets:[
                  {
                    label:'Gallons',
                    data:[
                      24,
                      48,
                      10,
                      12,
                      10,
                      30
                    ],
                    backgroundColor:[
                        'rgba(54, 162, 235, 0.6)'
                    ]
                  }
                ]
            }
        }
    }
    // this.setState({userData: snapshot.val()});
    // this.state.userData.forEach(shower => {
    //     console.log("shower session :D");
    //     console.log(shower);

    componentWillMount() {
    }
    
    componentDidMount() {
        this.authUnsub = firebase.auth().onAuthStateChanged(user => {
            this.setState({
                currentUser: user, 
            });
            if(this.state.currentUser === null) {
                this.props.history.push(constants.routes.home);
            } 
        });  
    }

    componentWillUnmount() {     
    }

    render() {
        firebase.database().ref("zipcode/" + (this.state.currentUser.photoURL) + "/" + (this.state.currentUser.uid) + "/usage").once('value').then(snapshot => {
            console.log(snapshot.val());
        })  
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