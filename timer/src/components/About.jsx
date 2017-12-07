import React from "react";
import constants from "./constants";
import HeaderBar from "./HeaderBar";
import lowFlow from '../images/lowFlow.jpg';
import highFlow from '../images/highFlow.jpeg';

export default class About extends React.Component {
    render() {
        return(
            <div>
                <HeaderBar />
                <div className="container">
                    <h1>Showerheads:</h1>
                    <div className="d-flex">
                        <div>
                            <h2>Low Flow</h2>
                            <img src={lowFlow} width="100" height="100" alt="low flow shower head"/>
                            <p>In our calculations to determine the total gallon usage
                                per low flow shower, we follow the EPA WaterSense standard of 
                                a low flow shower head. To be a earn the WaterSense label,
                                a showerhead must deomstrate that it uses no more than 2.0
                                gallons per minute.
                            </p>
                        </div>
                        <div>
                            <h2>Standard</h2>
                            <img src={highFlow} width="100" height="100" alt="high flow shower head"/> 
                            <p>In calculating the total gallons usage for a standard showerhead,
                                we used the EPA's statistic that standard showerheads use 2.5 
                                gallons of water per minute.

                                If you are unsure which showerhead to select before beginning the 
                                timer, go ahead and select standard. If your showerhead is labeled
                                with the gallons per minute, and it is 2.0 gpm or less, than select 
                                the low flow.
                            </p>
                        </div>
                    </div>
                    <div>
                        <h1>More Information</h1>
                        <p>If you are curious, check out these links:
                            <li><a href = "https://www.epa.gov/watersense/showerheads">EPA: Showerheads</a></li>
                            <li><a href = "http://www.ecy.wa.gov/programs/wr/ws/wtrcnsv.html">Washington Department of Ecology: Water Conservation</a></li>
                            <li><a href = "http://www.seattle.gov/util/MyServices/Rates/WaterRates/ResidentialRates/index.htm">King County Water Rates</a></li>
                        </p>
                    </div>

                </div>
            </div>
        );
    }
}