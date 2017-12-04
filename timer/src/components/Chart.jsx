import React from "react";
// import firebase from "firebase/app";
// import 'firebase/auth';
// import 'firebase/database';
// import { Link } from "react-router-dom";
// import constants from './constants'
import {Bar, Line} from 'react-chartjs-2';

export default class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                datasets:[
                  {
                    label:'Gallons',
                    data:[
                      24,
                      48,
                      10,
                      12,
                      10,
                      30
                    ],
                    backgroundColor:[
                      'rgba(255, 99, 132, 0.6)'
                    ]
                  }
                ]
            }
        }
    }

    render() {
        return(
            <div>
                <Line
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
}