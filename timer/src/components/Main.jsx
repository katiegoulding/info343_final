import React from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Link } from "react-router-dom";
import constants from './constants';
<<<<<<< HEAD
import Chart from './Chart';
import ReactMapboxGl from "react-mapbox-gl";
import BarChart from './BarChart';
import HeaderBar4 from './HeaderBar4';
=======
import HeaderBar3 from './HeaderBar3';
import Chart from './Chart';
import BarChart from './BarChart';
import UserComparisonChart from './UserComparisonChart';
>>>>>>> 02f642d190bd6c1192dab1c7c852047d2ce86a5f

const seattleCoordinates = [-122.3321, 47.6062];

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: [],
                datasets:[
                  {
                    label:'Amount of Water (Gallons)',
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
                    label:'Time (minutes)',
                    data:[],
                    backgroundColor:[
                    ]
                  }
                ]
            },
            comparisonData: {
                labels: ['May', 'June', 'July', 'August', 'September', 'November'],
                datasets:[{
                    label: "You",
					borderColor: 'rgba(153, 102, 255)',
					backgroundColor: 'rgba(137, 232, 148, .6)',
					data: [2, 4, 2, 1, 5, 10]
				}, {
					label: "Anonymous User #1",
					borderColor: 'rgba(255, 159, 64)',
					backgroundColor: 'rgba(120, 213, 227, .6)',
					data: [6, 7, 5, 10, 5, 2]
				}, {
					label: "Anonymous User #2",
					borderColor: 'rgba(255, 99, 132)',
					backgroundColor: 'rgba(190, 214, 97, 0.6)'                    ,
					data: [1, 2, 4, 1, 3, 1]
				}]
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
                        totalTime.push(showers[key].showerLength / 60);
                        let formattedDate = key[0] + key[1] + "-" + key[2] + key[3] + " " + key[4] + key[5] + ":" + key[6] + key[7];
                        dateTime.push(formattedDate);
                    })
                } 
                
                //Create cumulative sum of gallons used per user
                for(let i = 0; i < totalWaterUsed.length; i++) {
                    this.state.cumSum += totalWaterUsed[i]
                }
                //@ $0.01/gallon, multiply total gallons by cost to get total cost
                //Fudged cost to $0.30/gallon
                this.state.cumSum = (this.state.cumSum * .30).toFixed(2);
            
                let tempchartData = this.state.chartData;
                tempchartData.datasets[0].data = totalWaterUsed;
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
                console.log(this.state.timerData) 
            }) 
        });       
    }

    render() { 
        return(
            <div>
<<<<<<< HEAD
                <HeaderBar4 currentUser={this.state.currentUser} />
                <div className="container pl-1">
                    <div id="welcome" className="text-center">
                        <p id="welcomeHeader">Hello {this.state.currentUser.displayName}!</p>
                    </div>

                    <hr/>
                    <h3>Your Recent Usage</h3>
                    <div id="myChart">       
                        <Chart chartData={this.state.chartData}/>
                        <br></br>
                        <br></br>
                        <BarChart chartData={this.state.timerData}/>
                    </div>
                    <hr/>

                    <h3>Your Neighborhood's Usage</h3>
                    <div id="myChart">
                        <Map id='map' style='mapbox://styles/mapbox/light-v9' center= {seattleCoordinates} containerStyle={{width: '400px', height: '300px'}}/>
                    </div>
=======
                <HeaderBar3 currentUser={this.state.currentUser} />
                <div className="container">
                    <div id="welcome">
                        <h1>Welcome, {this.state.currentUser.displayName}</h1>
                    </div>

                    <Link to={constants.routes.timer}><button className="btn btn-info">Take a shower</button></Link>

                    <div>
                        <h3>You have spent ${ !(this.state.cumSum) ? null : this.state.cumSum } </h3>
                    </div>

                    <hr/>
                                  
                    <Chart chartData={this.state.chartData} />

                    <BarChart chartData={this.state.timerData} style="height: 400px"/>

                    <UserComparisonChart chartData={this.state.comparisonData}/>
>>>>>>> 02f642d190bd6c1192dab1c7c852047d2ce86a5f
                </div>
            </div>
        );
    }
}    