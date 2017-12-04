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

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          secondsElapsed: 0, 
          lastClearedIncrementer: null,
          waterSaverShowerHead: false,
          regularShowerHead: true,
          totalWaterUsed: 0
        };
        this.incrementer = null;
    }  

    //Button toggle not really working!
    yesLowFlow(evt) {
        this.setState({
            waterSaverShowerHead: true,
            regularShowerHead: false
        })
    }

    //Button toggle not really working!
    yesRegular(evt) {
        this.setState({
            waterSaverShowerHead: false,
            regularShowerHead: true
        })
    }

    handleStartClick() {
        this.incrementer = setInterval( () =>
          this.setState({
            secondsElapsed: this.state.secondsElapsed + 1
          })
        , 1000);
    }

    handleResetClick() {
        clearInterval(this.incrementer);
        this.setState({
          secondsElapsed: 0,
          laps: []
        });
    }

    handleStopClick() {
        clearInterval(this.incrementer);
        this.setState({
          lastClearedIncrementer: this.incrementer
        });

        //get amount of time:
        let waterMultiplier = 0;
        console.log(this.state.secondsElapsed);
        if(this.state.waterSaverShowerHead) {
            waterMultiplier = .5;
        } else {
            waterMultiplier = 1;
        }

        //make sure time is converted to minutes:
        this.setState({
            totalWaterUsed: (this.state.secondsElapsed * waterMultiplier)
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
            console.log(this.state.currentUser) 
            
        }); 
    }

    componentWillUnmount() {
        this.authUnsub();
    }

    render() {
        return (
            <div>
                <HeaderBar />
                <div className="container">
                    <div>
                        <h1>Shower Timer</h1>
                        <h3>Set the water flow</h3>

                        <div className="btn-group btn-group-lg" role="group" data-toggle="buttons" aria-label="Choose Showerhead">
                            <button type="button" className="btn btn-secondary active" onClick={evt => this.yesRegular(evt)}>Regular</button>
                            <button type="button" className="btn btn-secondary" onClick={evt => this.yesLowFlow(evt)}>Low-Flow</button>
                        </div>
                    </div>

                    <div className="stopwatch">
                        <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
                
                        {(this.state.secondsElapsed === 0 ||
                            this.incrementer === this.state.lastClearedIncrementer
                            ? <button className="btn btn-dark" onClick={this.handleStartClick.bind(this)}>start</button>
                            : <button className="btn btn-danger" onClick={this.handleStopClick.bind(this)}>pause</button> 
                        )}
                    
                        {(this.state.secondsElapsed !== 0 &&
                            this.incrementer === this.state.lastClearedIncrementer
                            ? <button className="btn btn-warning" onClick={this.handleResetClick.bind(this)}>clear</button>
                            : null
                        )}
                    </div>

                    <div>
                        {/* <h3>Results:</h3> 
                            <p>You used x gallons</p>
                            <p>You showered for x minutes</p>
                        */}
                    </div>
                </div>
            </div>
        );
    }
} 