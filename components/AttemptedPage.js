import ProgressBarAnimated from 'react-native-progress-bar-animated';
import React, { Component } from 'react';
import URL from './Url';
import styles from './Assets/Style';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

export class AttemptedPage extends React.Component {
  constructor() {
    //inherit parent props
    super();
    classthis=this;
    //create dynamic variables
    this.state = {
      HOME:URL.HOME,
      ATTENDED_EXAM_PROGRESS:URL.ATTENDED_EXAM_PROGRESS,
      userId:'0',
      progress: 50,
      progressWithOnComplete: 0,
      progressCustomized: 0,

      attempted: [
        {'examName':'exam1','percentage':100,'totalExamMarks':13,'totalMarks':4,'attendedDate':'15 July 11:59 pm'},
        {'examName':'exam2','percentage':30,'totalExamMarks':13,'totalMarks':4,'attendedDate':'15 July 11:59 pm'},
        {'examName':'exam3','percentage':45,'totalExamMarks':13,'totalMarks':4,'attendedDate':'15 July 11:59 pm'}
      ]
    }
  }
  // increase = (key, value) => {
  //   this.setState({
  //     [key]: this.state[key] + value,
  //   });
  // }
  //             "attendedDate": "28-Jun-2018 05:59 PM",
  //             "examName": "Bank section qp",
  //             "percentage": 31,
  //             "totalExamMarks": 13,
  //             "totalMarks": 4

    componentDidMount() {
      AsyncStorage.multiGet(['userId']).then((data) => {
        let user = data[0][1];

        classthis.setState({
          userId:user,
        });

      });

      fetch(classthis.state.HOME+classthis.state.ATTENDED_EXAM_PROGRESS+'GwTemplateId=exam&limit=10&sortBy=createdDate&sortDirection=desc&userId='+this.state.userId+'')
      //get status and append with data and return as one object
      .then(response =>  response.json())
      .then(responseobj => {
        for(let x of responseobj.data){
          this.setState({
            attempted:responseobj.data[0],
          });
        }
        // this.setState({
        //   attempted:responseobj.data[0],
        // });
        console.log("attemped:",responseobj.data);
      });
  }

  render() {
    const barWidth = Dimensions.get('screen').width - 30;
    const progressCustomStyles = {
      backgroundColor: 'red',
      borderRadius: 0,
      borderColor: 'orange',
    };


     let attemptedList = this.state.attempted.map(function(exam){
       let bgcolor;

       if(exam.percentage<30){
        let bgcolor='#E57373';
       }else{
        let bgcolor='#956FCE';
       }

       return(
         <View key={(exam, index) => index.toString()} style={[styles.announcementBox, styles.flexrow]}>
           <View style={[styles.flexcol, styles.innerTextBox]} >
             <Text style={[styles.heavyFont,styles.boldFont,styles.blackFont]}>{exam.examName}</Text>

            {exam.percentage == 100?
              <View>
              <Text style={[styles.lightFont,styles.percentage],{color: '#6CC644'}} >{exam.percentage}%</Text>
              <ProgressBarAnimated
              width={barWidth}
              value={exam.percentage}
              backgroundColorOnComplete="#6CC644"
              backgroundColor="#6CC644"
            />
            </View>
              :(exam.percentage <= 30 ?
                <View>
                <Text style={[styles.lightFont,styles.percentage],{color: '#E57373'}} >{exam.percentage}%</Text>
              <ProgressBarAnimated
              width={barWidth}
              value={exam.percentage}
              backgroundColorOnComplete="#6CC644"
              backgroundColor="#E57373"
            />
            </View>
            :
            <View>
            <Text style={[styles.lightFont,styles.percentage],{color: '#956FCE'}} >{exam.percentage}%</Text>
              <ProgressBarAnimated
              width={barWidth}
              value={exam.percentage}
              backgroundColorOnComplete="#6CC644"
              backgroundColor="#956FCE"
            />
          </View>)
           }
            <View style={[styles.flexrow]} >
             <Text style={[styles.lightFont]} >Questions <Text style={[styles.count]}>{exam.totalExamMarks} </Text>Total Marks
              <Text style={[styles.count]}> {exam.totalMarks}/{exam.totalExamMarks} </Text></Text>
              </View>
             <View style={[styles.flexrow]}>
              <Text>Submitted on:{exam.attendedDate}</Text>
             </View>
           </View>
           <View style={[styles.sideBotton, styles.brightBlue]} >
             <Text style={[styles.bookFont,styles.whiteFont]} >Science & Tech </Text>
           </View>
         </View>
       );
     });

    return (
      <ScrollView style={[styles.container, styles.flexcol]} >
        <View style={[styles.flexrow, styles.availableBox]}>
          <Text style={[styles.boldFont,styles.blackFont,styles.lightFont],{ flex: 3 }}>,Attempted Exams</Text>
        </View>
        {attemptedList}
      </ScrollView>
    );
  }
}
