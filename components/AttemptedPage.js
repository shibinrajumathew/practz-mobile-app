import ProgressBarAnimated from 'react-native-progress-bar-animated';
import React, { Component } from 'react';
import URL from './Url';
import {logout} from './Functions';
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
    let attemptedList;
    classthis=this;
    //create dynamic variables
    this.state = {
      HOME:URL.HOME,
      ATTENDED_EXAM_PROGRESS:URL.ATTENDED_EXAM_PROGRESS,
      userId:'0',
      progress: 50,
      progressWithOnComplete: 0,
      progressCustomized: 0,
      checkFlag:0,

      attempted: [
        {
            "departmentName": "",
            "securityLevel": "",
            "attendedDate": "",
            "examName": "",
            "percentage": 0,
            "examId": "",
            "totalExamMarks": 0,
            "totalMarks": 0
        }
    ]
    }
  }

componentWillMount() {
      AsyncStorage.multiGet(['userId']).then((data) => {
        let user = data[0][1];
        classthis.setState({
          userId:user,
        });

      fetch(this.state.HOME+this.state.ATTENDED_EXAM_PROGRESS+'GwTemplateId=exam&limit=10&sortBy=createdDate&sortDirection=desc&userId='+data[0][1]+'')
      .then(response =>  response.json())
      .then(responseobj => {
        if(responseobj==401){
          this.setState({
            attempted: [
              {
                  "departmentName": "",
                  "securityLevel": "",
                  "attendedDate": "",
                  "examName": "",
                  "percentage": 0,
                  "examId": "",
                  "totalExamMarks": 0,
                  "totalMarks": 0
              }
          ]
        });
        logout();
        this.props.navigation.navigate('Loign');
      }else{
        if(responseobj.data.length<1){
          this.setState({
            status:'No active exams available now. Please check later.',
            view:'',
            checkFlag:1,
            availableExamList:[
              {
                  "questionPaperName": "",
                  "examProductName": "",
                  "expiryDate": "",
              }
          ]
          });
        }else{
          this.setState({
            checkFlag:2,
          attempted:responseobj.data,
        });
        }

      }
      });
        });
  }

  render() {
    const barWidth = Dimensions.get('screen').width - 30;
    const progressCustomStyles = {
      backgroundColor: 'red',
      borderRadius: 0,
      borderColor: 'orange',
    };
    {
    this.state.checkFlag==1||this.state.checkFlag==0
    ? attemptedList = this.state.attempted.map((exam) => {
     return(<View key={(exam, index) => index.toString()} ></View>);
   })
    :
    attemptedList = this.state.attempted.map((exam) => {
     let bgcolor;
     // console.log("attemped:",this.state.attempted);
     if(exam.percentage<30){
      let bgcolor='#E57373';
     }else{
      let bgcolor='#956FCE';
     }

     return(
       <View key={(exam, index) => index.toString()}>
          <TouchableOpacity style={[styles.announcementBox, styles.flexrow]}
            onPress={() => this.props.navigation.navigate('AttemptedExamDetails',{eid:exam.examId})}>
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
           <View style={[styles.flexrow,styles.attemptedBox]}>
            <Text>Submitted on:{exam.attendedDate}</Text>
           </View>
         </View>
         <View style={[styles.sideBotton, styles.brightBlue]} >
           <Text style={[styles.bookFont,styles.whiteFont]} >Science & Tech </Text>
         </View>
         </TouchableOpacity>
       </View>
     );
   });
 }
    return (
      <ScrollView style={[styles.container, styles.flexcol]} >
        <View style={[styles.flexrow, styles.availableBox]}>
          <Text style={[styles.boldFont,styles.blackFont,styles.lightFont],{ flex: 3 }}>Attempted Exams</Text>
        </View>
        {attemptedList}
      </ScrollView>
    );
  }
}