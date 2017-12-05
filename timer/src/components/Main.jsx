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
                labels: [],
                datasets:[
                  {
                    label:'Gallons',
                    waterData:[],
                    backgroundColor:[
                        'rgba(54, 162, 235, 0.6)'
                    ]
                  }
                ]
            },
        }
    }

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

            firebase.database().ref("zipcode/" + (this.state.currentUser.photoURL) + "/" + (this.state.currentUser.uid) + "/usage").once('value').then(snapshot => {
                let data = [];
                let showers = snapshot.val();
                if(showers !== null) {
                    Object.keys(showers).forEach(key => {
                        data.push(showers[key].totalWaterUsed);
                    })
                } 
                console.log(this.state.userData.datasets[0].waterData)
                console.log(data);
                let tempUserData = this.state.userData;
                tempUserData.datasets[0].waterData = data;
                this.setState({tempUserData: data});   
            }) 
        });        
    }

    componentWillUnmount() {     
    }

    render() { 
        console.log(this.state.userData.datasets[0].label);
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
                    {console.log(this.state.userData.datasets[0].waterData)}
                    {console.log(this.state.tempUserData)}
                    <p>In Main.jsx {(this.state.userData.datasets[0].waterData) }</p>
                   
                    <Chart totalGallons={this.state.tempUserData}/>
                    <Chart />

                    <hr/>
                    <h3>Your neighborhood's usage</h3>
                </div>
            </div>
        );
    }
}    