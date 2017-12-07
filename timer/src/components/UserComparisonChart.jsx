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
                        maintainAspectRatio: false,
                        responsive: true,
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