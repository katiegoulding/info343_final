import React from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import { Link } from "react-router-dom";
import constants from './constants'
import HeaderBar from './HeaderBar'
// Thank you to Seoh Char for the CodePen timer: https://codepen.io/seoh/pen/PPZYQy?editors=0110

const formattedSeconds = (sec) =>
Math.floor(sec / 60) +
  ':' +
('0' + sec % 60).slice(-2)

const formattedResults = (sec) =>
Math.floor(sec / 60) +
' minutes and ' +
("" + sec % 60).slice(-2)

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          secondsElapsed: 0, 
          lastClearedIncrementer: null,
          lowFlowShowerHead: false,
          regularShowerHead: true,
          totalWaterUsed: 0,
          currentUser: null,
          reset: false,
          secondsShowered: 0,
          toggleLowFlow: "",
          toggleRegular: "",
          selectedLowFlow: "",
          selectedRegular: "",
          date: firebase.database.ServerValue.TIMESTAMP,                      
        };
        this.incrementer = null;
    }  

    yesLowFlow(evt) {
        //evt.preventDefault();        
        if(this.state.secondsElapsed === 0) {
            this.setState({
                lowFlowShowerHead: true,
                regularShowerHead: false,
                toggleLowFlow: " active",
                toggleRegular: " disabled"
            })
        }
    }

    yesRegular(evt) {
        //evt.preventDefault();        
        if(this.state.secondsElapsed === 0) {
            this.setState({
                lowFlowShowerHead: false,
                regularShowerHead: true,
                toggleLowFlow: " disabled",
                toggleRegular: " active"
            })
        }
    }

    handleStartClick() {
        //preventDefault();        
        if (this.state.toggleLowFlow === " active") {
            this.setState({
                toggleLowFlow: " disabled",
                toggleRegular: " disabled",
                selectedLowFlow: " btn-info",
                selectedRegular: ""
            })
        } else if (this.state.toggleRegular === " active") {
            this.setState({
                toggleLowFlow: " disabled",
                toggleRegular: " disabled",
                selectedLowFlow: "",
                selectedRegular: " btn-info"
            })
        }
        this.incrementer = setInterval( () =>
          this.setState({
            secondsElapsed: this.state.secondsElapsed + 1,
            reset: false,
          })
        , 1000);      
    }

    handleResetClick() {
        //preventDefault();        
        this.setState({
            toggleLowFlow: "",
            toggleRegular: "",
            selectedLowFlow: "",
            selectedRegular: "",
            secondsShowered: this.state.secondsElapsed,
            reset: true
        })

        let waterMultiplier;
        if(this.state.lowFlowShowerHead) {
            waterMultiplier = (1.0 / 30.0);
        } else {
            waterMultiplier = (2.5 / 60.0);
        }

        this.setState({
            totalWaterUsed: Number(Math.round((this.state.secondsElapsed * waterMultiplier) * 100) / 100)
        }); 
        
        clearInterval(this.incrementer);
        this.setState({
            secondsElapsed: 0,
        });

        let month = new Date().getMonth() + 1;
        let date = new Date().getDate();       
        let hours = new Date().getHours();        
        let mins = new Date().getMinutes();
        if(mins < 10) {
            mins = "0" + mins
        } 
        if(hours < 10) {
            hours = "0" + hours
        }
        if(date < 10) {
            date = "0" + date
        }
        if(month < 10) {
            month = "0" + month
        }
        let dateStamp = month + "" + date + "" + hours + "" + mins;     
        firebase.database().ref("zipcode/" + (this.state.currentUser.photoURL) + "/" + (this.state.currentUser.uid) + "/usage/" + dateStamp + "/")
        .set({ 
            showerLength: this.state.secondsElapsed,
            totalWaterUsed: Number(Math.round((this.state.secondsElapsed * waterMultiplier) * 100) / 100),     
        }); 
    }

    handleStopClick() {
        //preventDefault();        
        clearInterval(this.incrementer);
        this.setState({
          lastClearedIncrementer: this.incrementer
        });        
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
        this.authUnsub();
    }

    render() {
        return (
            <div>
                <HeaderBar currentUser={this.state.currentUser}/>
                <div className="container">
                    <div>
                        <h1>Shower Timer</h1>
                        <h3>Set the water flow</h3>
                        <div className="btn-group btn-group-lg" role="group" data-toggle="buttons" aria-label="Choose Showerhead">
                            <button type="button" className={"btn btn-secondary" + this.state.toggleRegular + this.state.selectedRegular} onClick={evt => this.yesRegular(evt)}>Standard</button>
                            <button type="button" className={"btn btn-secondary" + this.state.toggleLowFlow + this.state.selectedLowFlow} onClick={evt => this.yesLowFlow(evt)}>Low-Flow</button>
                        </div>
                    </div>

                    <div className="stopwatch">
                        <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
                        {( !(this.state.toggleLowFlow && this.state.toggleRegular) ? null :
                        (this.state.secondsElapsed === 0 ||
                            this.incrementer === this.state.lastClearedIncrementer
                            ? <button className="btn btn-dark" onClick={this.handleStartClick.bind(this)}>Start</button>
                            : <div><button className="btn btn-danger" onClick={this.handleStopClick.bind(this)}>Pause</button>
                             <button className="btn btn-warning" onClick={this.handleResetClick.bind(this)}>I'm Done Showering!</button></div>
                        )
                        )}
                    
                        {(this.state.secondsElapsed !== 0 &&
                            this.incrementer === this.state.lastClearedIncrementer
                            ? <button className="btn btn-warning" onClick={this.handleResetClick.bind(this)}>I'm Done Showering!</button>
                            : null
                        )}
                    </div>

                    <div>
                        {( this.state.reset === true  ?
                            <div>
                                <h3>Results:</h3> 
                                <p>You used approximately { this.state.totalWaterUsed } gallons of water using a {( this.state.lowFlowShowerHead ? "low " : "standard " )}flow shower head </p>
                                {( this.state.secondsShowered < 60 ? 
                                    <p>You showered for {this.state.secondsShowered} seconds. </p>
                                  : <p>You showered for {formattedResults(this.state.secondsShowered)} seconds</p> )}
                            </div>
                            : null)}    
                    </div>
                    <Link to={constants.routes.main}><button className="btn btn-info">Back to My Data</button></Link>
                </div>
            </div>
        );
    }
} 