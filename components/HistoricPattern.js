import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  AsyncStorage
} from 'react-native';
import Chart from 'react-native-chartjs';
var values=[];
var chartConfiguration = {
    type: 'bar',
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data:'',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      maintainAspectRatio : false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            suggestedMax:100
          }
        }]
      }
    }
};
export default class HistoricPattern extends Component<Props> {
  constructor(props) {
  super(props);
  this.state = {
    HOME:URL.HOME,
    HISTORIC_PATTERN:URL.HISTORIC_PATTERN,
    datas:"",
  }
  }
  componentWillMount() {
    this.setState({
      chartConfiguration:chartConfiguration
    });
    console.log("data on new variable:",chartConfiguration.data.datasets.data);
    //  console.log("response data",this.state.HOME+this.state.HISTORIC_PATTERN)
    fetch('https://demo.practz.com/practz/ilearn/v1/reports/graphs')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        data:responseJson.data
      });
      console.log("responsearrays",this.state.data);
      var index = 0;
      Object.keys(this.state.data).forEach((key)=> {
      console.log("key ",key);
      console.log("index",index);
      //console.log("value ",this.state.data[key]);
      var values=[];
      var mapData = this.state.data[key];
      for (var i = 0; i < mapData.length; i++) {
        console.log("percentage ",mapData[i].percentage);
        //values[index][i].push([mapData[i].percentage])
        //values[index][i] = mapData[i].percentage

        //.log("values",values[index][i]);
        values.push(mapData[i].percentage);

      }

      graph();
        chartConfiguration.data.datasets.data=values;

        console.log("array values",values);
        index++;
      });

    });
  }
  render() {

    return(
       <View style = {{ flex : 1 }}>
        <Chart chartConfiguration = {
         this.state.chartConfiguration
         }
       defaultFontSize={20}/>
        </View>
    );
    }
}
