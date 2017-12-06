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
            chartData: {
                labels: [],
                datasets:[
                  {
                    label:'Gallons',
                    data:[],
                    backgroundColor:[
                        'rgba(54, 162, 235, 0.6)'
                    ]
                  }
                ]
            }, 
            currentUser: ""
        }
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
                let totalWaterUsed = [];
                let dateTime = [];
                let showers = snapshot.val();
                if(showers !== null) {
                    Object.keys(showers).forEach(key => {
                        totalWaterUsed.push(showers[key].totalWaterUsed);
                        let formattedDate = key[0] + key[1] + "-" + key[2] + key[3] + " " + key[4] + key[5] + ":" + key[6] + key[7];
                        dateTime.push(formattedDate);
                    })
                } 
                let tempchartData = this.state.chartData;
                tempchartData.datasets[0].data = totalWaterUsed;
                this.setState({tempchartData: totalWaterUsed});  

                let tempchartLabel = this.state.chartData;
                tempchartData.labels = dateTime;
                this.setState({tempchartLabel: dateTime}); 
            }) 
        });        
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
                                  
                    <Chart chartData={this.state.chartData}/>
                    
                    <hr/>
                    <h3>Your neighborhood's usage</h3>
                </div>
            </div>
        );
    }
}    