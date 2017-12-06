import React from "react";
// import firebase from "firebase/app";
// import 'firebase/auth';
// import 'firebase/database';
// import { Link } from "react-router-dom";
// import constants from './constants'
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
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
}