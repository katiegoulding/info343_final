import React from "react";
import { Link } from "react-router-dom";
import constants from "./constants";
import HeaderBar from "./HeaderBar";
import TimeShowersVector from "../images/Time-Showers-Vector1.svg";
import SaveMoneyVector from "../images/Save-Money-Vector1.svg";
import RealAnalyticsVector from "../images/Real-Analytics-Vector1.svg";
//import ActivePic from "../images/active pic.png";
//import InActivePic from "../images/Inactive pic.png";
//import BackgroundVector from "../images/Background-Vector.svg";

import MatthewPic from "../images/Matthew_Pic.jpg";
import KatiePic from "../images/Katie_Pic.jpg";
import AugustPic from "../images/August_Pic.jpg";
import AmandaPic from "../images/Amanda_Pic.jpg";

export default class Homepage extends React.Component {
    render() {
        return(
            
            <div>
                
                <HeaderBar />
                <section id="hero">
                    <div className="container">
                        <h1>Every Drop Counts.</h1>
                        
                        <div href="#whatWeDo" className="learnMoreBtn"> {/*id=nav*/}
                        {/*<a href="#whatWeDo">1</a>*/}
                        <button className="btn btn-success"><a href="#whatWeDo">Learn more</a></button> 
                        </div>
                        {/*<button className="btn btn-default"> <Link to={constants.routes.signup}> Sign Up </Link> </button>*/}
                        <p> Be part of the change. Sign up <Link to={constants.routes.signup}><span id="now">now</span></Link>!</p> 
                    </div>
                </section>
                <section id="blue-divider">
                </section>
                <section id="learn_more">
                    <h3> <a name="whatWeDo">What we do</a></h3>
                    <div id="underline"></div>
                    <div className="container">
                         <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="explanation">
                                    <img src={TimeShowersVector} alt=""/>
                                    <h2>Time Showers</h2>
                                    <p>Log your shower usage, by using our built in timer to know exactly how much water you’re using</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="explanation">
                                    <img src={SaveMoneyVector} alt=""/>
                                    <h2>Save Money</h2>
                                    <p>Know how much water you’re using so you can save on your monthly water bill.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <div className="explanation">
                                    <img src={RealAnalyticsVector} alt=""/>
                                    <h2>Real Analytics</h2>
                                    <p>Compare your usage over time and against others to really understand your water usage.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="blue-divider">
                </section>
                <section id="team">
                    <div className="container">
                        <h3><a name="TheTeam">The Team</a></h3>
                        <div id="underline"></div>
                        <div id="teamDescription">
                            <h4>We are a close team of dedicated developers and designers based out of Seattle. We are passionate about solving problems for people by providing them with applications they can use in their daily lives.</h4>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                    <div className="people_card">
                                        <img src={AugustPic} alt=""/>
                                        <h2>August Carow</h2>
                                        <p>Back–End Development</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                    <div className="people_card">
                                        <img src={MatthewPic} alt=""/>
                                        <h2>Matthew Farmer</h2>
                                        <p>Front–End Development</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                    <div className="people_card">
                                        <img src={KatiePic} alt=""/>
                                        <h2>Katie Goulding</h2>
                                        <p>Back–End Development</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                                    <div className="people_card">
                                        <img src={AmandaPic} alt=""/>
                                        <h2>Amanda Shen</h2>
                                        <p>Front–End Development</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="contact">
                    <div className="container">
                        <h2><a name="Contact">Questions or comments?< a href="mailto:support@splish.com">Let us know!</a></a></h2>
                        <p>Copyright © 2017</p>
                        <p>All Rights Reserved</p>
                        <p>Splish LLC</p>
                    </div>
                </section>
                {/*
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
                <script type="text/javascript" src="animate.js"></script>
                */}
                
                <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js" type="text/javascript"></script> 
            <   script src="jquery.localscroll.js" type="text/javascript"></script> 
                <script src="jquery.animate.js" type="text/javascript"></script> 
            </div>
            
        );
    }
}