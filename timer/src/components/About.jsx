import React from "react";
import constants from "./constants";
import HeaderBar3 from "./HeaderBar3";
import lowFlow from '../images/lowFlow.jpg';
import highFlow from '../images/highFlow.jpeg';
import firebase from "firebase/app";

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          currentUser: null
        };
        this.incrementer = null;
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
        return(
            <div>
                <HeaderBar3 currentUser={this.state.currentUser}/>
                <div className="container pl-1">
                    <div id="welcome" className="text-center"> 
                        <p id="welcomeHeader1" className="m-0 p-0">All About</p>
                        <p id="welcomeHeader" className="m-0 p-0">Showerheads</p>
                    </div>
                    
                    <hr/>
                        <div id="ShowerheadGrid" className="d-flex justify-content-between">
                            <div className="d-flex">
                                <div className="card h-100" id="aboutShowerhead">
                                    <img className="card-img-top" src={lowFlow} alt="low flow shower head"/>
                                    <div className="card-body">
                                        <h3 className="card-title">Low Flow</h3>
                                        <p className="card-text">In our calculations to determine the total gallon usage
                                            per low flow shower, we follow the EPA WaterSense standard of 
                                            a low flow shower head. To be a earn the WaterSense label,
                                            a showerhead must deomstrate that it uses no more than 2.0
                                            gallons per minute.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex">
                                <div className="card h-100" id="aboutShowerhead">
                                    <img className="card-img-top" src={highFlow} alt="low flow shower head"/>
                                    <div className="card-body"  id="showerheadDis">
                                        <h3 className="card-title">Standard</h3>
                                        <p className="card-text">In calculating the total gallons usage for a standard showerhead,
                                        we used the EPA's statistic that standard showerheads use 2.5 
                                        gallons of water per minute.

                                        If you are unsure which showerhead to select before beginning the 
                                        timer, go ahead and select standard. If your showerhead is labeled
                                        with the gallons per minute, and it is 2.0 gpm or less, than select 
                                        the low flow.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="alert alert-info mt-5 mb-5" id="moreInfo" role="alert">
                                <p><strong>If you are curious, check out these links for more information:</strong></p>
                                <div>
                                    <p><a href = "https://www.epa.gov/watersense/showerheads">EPA: Showerheads</a></p>
                                    <p><a href = "http://www.ecy.wa.gov/programs/wr/ws/wtrcnsv.html">Washington Department of Ecology: Water Conservation</a></p>
                                    <p><a href = "http://www.seattle.gov/util/MyServices/Rates/WaterRates/ResidentialRates/index.htm">King County Water Rates</a></p>
                                </div>
                                    
                        </div>
                    </div>
                
            </div>
        );
    }
}