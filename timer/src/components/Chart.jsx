import React from "react";
// import firebase from "firebase/app";
// import 'firebase/auth';
// import 'firebase/database';
// import { Link } from "react-router-dom";
// import constants from './constants'
import {Line} from 'react-chartjs-2';

export default class Chart extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                datasets:[
                  {
                    label:'Gallons',
                    data: this.props.totalGallons,
                    backgroundColor:[
                        'rgba(54, 162, 235, 0.6)'
                    ]
                  }
                ]
            }
        }
    }

    render() {
        // outputs chart obj? -- its unclear to me what it is but can confirm that when
        // I set 'data: this.props.totalGallons' on line 18 that it is not successful.
        // Maybe should try setState like done in Main?
        {console.log(this.state.chartData.datasets[0].data)} 

        // success! console has the array of total gallons passed from main
        {console.log(this.props.totalGallons)}

        return(
            <div>
                <p>In Chart.jsx {this.props.totalGallons} </p>
                
                <Line
                    data={(this.state.chartData)}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
}