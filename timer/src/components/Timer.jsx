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
          laps: [],
          lastClearedIncrementer: null
        };
        this.incrementer = null;
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
                <HeaderBar />
                <div className="container">
                    <div>
                        <h1>Shower Timer</h1>
                        <h3>Set the water flow</h3>

                        <div className="btn-group btn-group-lg" role="group" aria-label="Choose Showerhead">
                            <button type="button" className="btn btn-secondary">Regular</button>
                            <button type="button" className="btn btn-secondary">Low-Flow</button>
                        </div>
                    </div>

                    <div className="stopwatch">
                        <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
                
                        {(this.state.secondsElapsed === 0 ||
                            this.incrementer === this.state.lastClearedIncrementer
                            ? <button className="btn btn-dark" onClick={this.handleStartClick.bind(this)}>start</button>
                            : <button className="btn btn-danger" onClick={this.handleStopClick.bind(this)}>stop</button>
                        )}
                    
                        {(this.state.secondsElapsed !== 0 &&
                            this.incrementer === this.state.lastClearedIncrementer
                            ? <button className="btn btn-warning" onClick={this.handleResetClick.bind(this)}>reset</button>
                            : null
                        )}
            
                    </div>
                </div>
            </div>
        );
    }
} 