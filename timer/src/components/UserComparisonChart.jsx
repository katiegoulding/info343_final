import React from "react";
import {Line} from 'react-chartjs-2';

export default class Chart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.chartData,
        }
    }
    
    render() {      
        return(
            <div>               
                <Line
                    data={this.state.chartData}
                    options={{
                        responsive: true,
                        height: "750px",
                        legend: {
                            position: "bottom"
                        },
                        title:{
                            display:true,
                            text:"Average Shower Length in Recent Months",
                            fontSize: 25
                        },
                        scales: {
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }}
                />
            </div>
        );
    }
}