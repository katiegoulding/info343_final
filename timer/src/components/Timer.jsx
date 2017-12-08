import React from "react";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import constants from './constants';
import HeaderBar3 from './HeaderBar3';
import "./style.css";

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
          pause: false,
          GPM: 0,
          timeEntered: 0,
        };
        this.incrementer = null;
    }  

    yesLowFlow(evt) {
        evt.preventDefault();        
        if(this.state.secondsElapsed === 0) {
            this.setState({
                lowFlowShowerHead: true,
                regularShowerHead: false,
                toggleLowFlow: "lowFlow",
                toggleRegular: "",
                GPM: (2).toFixed(1),
            })
        }
    }

    yesRegular(evt) {
        evt.preventDefault();        
        if(this.state.secondsElapsed === 0) {
            this.setState({
                lowFlowShowerHead: false,
                regularShowerHead: true,
                toggleLowFlow: "",
                toggleRegular: "regularFlow",
                GPM: 2.5,
            })
        }
    }

    handleStartClick() {
        //preventDefault();   
        //UGHHHH... the onChange evt is one off -- once typed into, the box is never
        //null or "", just holds last number entered and therefore unable
        //to make the default "standard" shower head toggle look clicked when
        //a user deletes an inputted gpm     
        if (this.state.toggleLowFlow === "" && this.state.toggleRegular === "") {
            this.setState({toggleRegular: ""})            
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
        } else if (this.state.GPM > 0) {
            waterMultiplier = (this.state.GPM  /  60.0);
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
          lastClearedIncrementer: this.incrementer,
          pause: true
        });        
    }

    enterGPM(evt) {
        evt.preventDefault();
        this.setState({ 
            toggleLowFlow: "",
            toggleRegular: "", 
        })       
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
                    <div id="cardTop" className="pt-4">
                            <h1 id="timeElapsed"className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
                            <p>What kind of showerhead do you have?</p>
                            <div className="btn-group" role="group" data-toggle="buttons" aria-label="Choose Showerhead">
                                <button id={"switch-left" + this.state.toggleLowFlow} type="button" onClick={evt => this.yesLowFlow(evt)}>Low-Flow</button>
                                <button id={"switch-right" + this.state.toggleRegular} type="button" onClick={evt => this.yesRegular(evt)}>Regular</button>
                            </div>
                           
                    </div>
                    <form className="p-4" onChange={evt => this.enterGPM(evt)}>
                        Or enter the gallons per minute your shower head produces.
                        <input type="text" 
                            className="form-control text-center"
                            value={this.state.GPM}
                            onChange={evt => this.setState({GPM: evt.target.value})} 
                        />
                    </form>
                    <div id="timerBtn" className="card-body">
                        <div className="d-flex justify-content-around">
                            {( (this.state.GPM === 0 && this.state.toggleLowFlow === "" && this.state.toggleRegular === "") ? <button id="startBtn2" disabled>START</button> :
                            (this.state.secondsElapsed === 0 ||
                                this.incrementer === this.state.lastClearedIncrementer
                                ? <button id="startBtn" onClick={this.handleStartClick.bind(this)}>START</button>
                                : <div className="w-100 d-flex justify-content-around"><button id="pauseBtn" onClick={this.handleStopClick.bind(this)}>PAUSE</button>
                                <button id="doneBtn" onClick={this.handleResetClick.bind(this)}>DONE</button></div>
                            )
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
                        <div className="alert alert-primary" role="alert">
                            <p id="resultHeader"><span>Result</span></p> 
                            {( this.state.secondsShowered < 60 ? 
                                <p>You showered for <strong>{this.state.secondsShowered} seconds. </strong></p>
                                : <p>You showered for <strong>{formattedResults(this.state.secondsShowered)} seconds</strong></p> 
                            )}
                            <p>You used approximately <strong>{ this.state.totalWaterUsed } gallons of water</strong></p>
                        </div>
                    : null)} 
                </div>

            </div>
        );
    }
} 