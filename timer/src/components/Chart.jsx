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
                        legend: {
                            position: "bottom"
                        },
                        responsive: true,
                        height: "750px",
                        title:{
                            display: true,
                            text:"Shower Water Use",
                            fontSize: 25
                        },
                    }}
                />
            </div>
        );
    }
}