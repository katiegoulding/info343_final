import React from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
// import { Link } from "react-router-dom";
import constants from './constants'
import HeaderBar from './HeaderBar'
// Thank you to Seoh Char for the CodePen timer: https://codepen.io/seoh/pen/PPZYQy?editors=0110

// TO DO:
// Determine what happens when you click start without selecting a shower head
// Push data after timer completes
// Make calculations work
// Findings:
// Using secondsElapsed instead of seconds showered works, and slice(-2) capped the *string* to 2 decimal places!

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
          waterSaverShowerHead: false,
          regularShowerHead: true,
          totalWaterUsed: 0,
          currentUser: null,
          reset: false,
          secondsShowered: 0,
          toggleLowFlow: "",
          toggleRegular: "",
          selectedLowFlow: "",
          selectedRegular: ""
        };
        this.incrementer = null;
    }  

    //Button toggle not really working!
    yesLowFlow(evt) {
        if(this.state.secondsElapsed === 0) {
            this.setState({
                waterSaverShowerHead: true,
                regularShowerHead: false,
                toggleLowFlow: " active",
                toggleRegular: " disabled"
            })
        }
    }

    //Button toggle not really working!
    yesRegular(evt) {
        if(this.state.secondsElapsed === 0) {
            this.setState({
                waterSaverShowerHead: false,
                regularShowerHead: true,
                toggleLowFlow: " disabled",
                toggleRegular: " active"
            })
        }
    }

    handleStartClick() {
        if(this.state.toggleLowFlow === " active") {
            this.setState({
                toggleLowFlow: " disabled",
                toggleRegular: " disabled",
                selectedLowFlow: " btn-info",
                selectedRegular: ""
            })
        } else if (this.state.toggleRegular === " active"){
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
        this.setState({
            toggleLowFlow: "",
            toggleRegular: "",
            selectedLowFlow: "",
            selectedRegular: "",
            secondsShowered: this.state.secondsElapsed,
            reset: true
        })

        let waterMultiplier;
        if(this.state.waterSaverShowerHead) {
            waterMultiplier = (1.0 / 30.0);
        } else {
            waterMultiplier = (2.5 / 60.0);
        }

        this.setState({
            //might be too few decimals
            totalWaterUsed: Math.round(((this.state.secondsElapsed * waterMultiplier) * 100) / 100)
        }); 
        
        //Push to Firebase here?

        clearInterval(this.incrementer);
        this.setState({
            secondsElapsed: 0,
        });
    }

    handleStopClick() {
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
                            <button type="button" className={"btn btn-secondary" + this.state.toggleRegular + this.state.selectedRegular} onClick={evt => this.yesRegular(evt)}>Regular</button>
                            <button type="button" className={"btn btn-secondary" + this.state.toggleLowFlow + this.state.selectedLowFlow} onClick={evt => this.yesLowFlow(evt)}>Low-Flow</button>
                        </div>
                    </div>

                    <div className="stopwatch">
                        <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
                
                        {(this.state.secondsElapsed === 0 ||
                            this.incrementer === this.state.lastClearedIncrementer
                            ? <button className="btn btn-dark" onClick={this.handleStartClick.bind(this)}>Start</button>
                            : <div><button className="btn btn-danger" onClick={this.handleStopClick.bind(this)}>Pause</button>
                             <button className="btn btn-warning" onClick={this.handleResetClick.bind(this)}>I'm Done Showering!</button></div>
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
                                {/* correct gallons report */}
                                <p>You used approximately { this.state.totalWaterUsed } gallons of water</p>
                                {( this.state.secondsShowered < 60 ? 
                                    <p>You showered for {this.state.secondsShowered} seconds. </p>
                                  : <p>You showered for {formattedResults(this.state.secondsShowered)} seconds</p> )}
                            </div>
                            : null)}    
                    </div>
                </div>
            </div>
        );
    }
} 