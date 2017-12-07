import React from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Link } from "react-router-dom";
import constants from './constants';
import HeaderBar from './HeaderBar';
import Chart from './Chart';
import BarChart from './BarChart';
import ReactMapboxGl from "react-mapbox-gl";

const seattleCoordinates = [-122.3321, 47.6062];

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
            timerData: {
                labels: [],
                datasets:[
                  {
                    label:'Time (seconds)',
                    data:[],
                    backgroundColor:[
                        'rgba(54, 162, 235, 0.6)'
                    ]
                  }
                ]
            },
            currentUser: "",
            cumSum: null,
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
                let totalTime = [];
                let dateTime = [];
                let showers = snapshot.val();
                if(showers !== null) {
                    Object.keys(showers).forEach(key => {
                        totalWaterUsed.push(showers[key].totalWaterUsed);
                        totalTime.push(showers[key].showerLength);
                        let formattedDate = key[0] + key[1] + "-" + key[2] + key[3] + " " + key[4] + key[5] + ":" + key[6] + key[7];
                        dateTime.push(formattedDate);
                    })
                } 
                let tempchartData = this.state.chartData;
                //Create cumulative sum of gallons used per user
                for(let i = 0; i < totalWaterUsed.length; i++) {
                    this.state.cumSum += totalWaterUsed[i]
                }
                //@ $0.01/gallon, multiply total gallons by cost to get total cost
                //Fudged cost to $0.30/gallon
                this.state.cumSum = (this.state.cumSum * .30).toFixed(2);
                
                this.setState({tempchartData: totalWaterUsed});  

                let tempchartLabel = this.state.chartData;
                tempchartData.labels = dateTime;
                this.setState({tempchartLabel: dateTime}); 

                let tempTimerChartLabel = this.state.timerData;
                tempTimerChartLabel.labels = dateTime;
                this.setState({tempTimerChartLabel: dateTime}); 

                let tempTimerChart = this.state.timerData;
                tempTimerChart.datasets[0].data = totalTime;
                this.setState({tempTimerChart: totalTime});
            }) 
        });     
        
    }

    render() { 
        const Map = ReactMapboxGl({
            accessToken: 'pk.eyJ1IjoiY2Fyb3dhIiwiYSI6ImNqYW1ybTRvbTM1bTIzMW5xcXBjbjhwdngifQ.Wnchz3M1nnaXsifYVvGHAg'
        });
        
        return(
            <div>
                <HeaderBar currentUser={this.state.currentUser} />
                <div className="container">
                    <div id="welcome">
                        <h1>Welcome {this.state.currentUser.displayName}</h1>
                    </div>

                    <Link to={constants.routes.timer}><button className="btn btn-info">Take a shower</button></Link>

                    <div>
                        <h3>You have spent ${this.state.cumSum} </h3>
                    </div>

                    <hr/>
                    <h3>Your recent usage</h3>
                                  
                    <Chart chartData={this.state.chartData}/>
                    <BarChart chartData={this.state.timerData}/>
                    <hr/>
                    <h3>Your neighborhood's usage</h3>
                    <Map id='map' style='mapbox://styles/mapbox/light-v9' center= {seattleCoordinates} containerStyle={{width: '400px', height: '300px'}}/>
                </div>
            </div>
        );
    }
}    