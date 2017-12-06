import React from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import constants from './constants';
import HeaderBar3 from './HeaderBar3';
import { Link } from "react-router-dom";
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
          selectedRegular: "",
          pause: false
        };
        this.incrementer = null;
    }  

    //Button toggle not really working!
    yesLowFlow(evt) {
        if(this.state.secondsElapsed === 0) {
            this.setState({
                waterSaverShowerHead: true,
                regularShowerHead: false,
                toggleLowFlow: "lowFlow",
                toggleRegular: ""
            })
        }
    }

    //Button toggle not really working!
    yesRegular(evt) {
        if(this.state.secondsElapsed === 0) {
            this.setState({
                waterSaverShowerHead: false,
                regularShowerHead: true,
                toggleLowFlow: "",
                toggleRegular: "regularFlow"
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
          lastClearedIncrementer: this.incrementer,
          pause: true
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
                <HeaderBar3 currentUser={this.state.currentUser}/>
                <div id="timer" className="card border-light">
                    <div id="cardTop">
                            <h1 id="timeElapsed"className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
                            <div className="btn-group" role="group" data-toggle="buttons" aria-label="Choose Showerhead">
                                <button id={"switch-left" + this.state.toggleLowFlow} type="button" onClick={evt => this.yesLowFlow(evt)}>Low-Flow</button>
                                <button id={"switch-right" + this.state.toggleRegular} type="button" onClick={evt => this.yesRegular(evt)}>Regular</button>
                            </div>
                    </div>
                    <div id="timerBtn" className="card-body">
                        <div className="d-flex justify-content-around">
                            {(this.state.secondsElapsed === 0 ||
                                this.incrementer === this.state.lastClearedIncrementer
                                ? <button id="startBtn" onClick={this.handleStartClick.bind(this)}>START</button>
                                : <div className="w-100 d-flex justify-content-around"><button id="pauseBtn" onClick={this.handleStopClick.bind(this)}>PAUSE</button>
                                <button id="doneBtn" onClick={this.handleResetClick.bind(this)}>DONE</button></div>
                            )}

                            {(this.state.secondsElapsed !== 0 &&
                                    this.incrementer === this.state.lastClearedIncrementer
                                    ? <button id="doneBtn" onClick={this.handleResetClick.bind(this)}>DONE</button>
                                    : null
                            )}
                        </div>
                    </div>
                </div>
                <br></br>
                <div id="result">
                    {( this.state.reset === true  ?
                        <div class="alert alert-primary" role="alert">
                            <p id="resultHeader"><span>Result</span></p> 
                            {/* correct gallons report */}
                            <p>You used approximately { this.state.totalWaterUsed } gallons of water</p>
                            {( this.state.secondsShowered < 60 ? 
                                <p>You showered for {this.state.secondsShowered} seconds. </p>
                                : <p>You showered for {formattedResults(this.state.secondsShowered)} seconds</p> )}
                        </div>
                    : null)} 
                </div>

            </div>
        );
    }
} 