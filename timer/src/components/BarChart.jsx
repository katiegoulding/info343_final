import React from "react";
import {Bar} from 'react-chartjs-2';

export default class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.chartData,
        }
    }
    
    render() {      
        return(
            <div>               
                <Bar
                    data={this.state.chartData}
                    options={{
                        legend: {
                            position: "bottom"
                        },
                        responsive: true,
                        height: "750px",
                        title:{
                            display:true,
                            text:"Shower Duration",
                            fontSize: 25,
                            fontFamily: "Avenir Next",
                        },
                        legened: {position: "right"},
                    }}
                />
            </div>
        );
    }
}