import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  ScrollView
} from 'react-native';
import URL from './Url';
import styles from './Assets/Style';
export default class AvailableExams extends Component<Props> {
  constructor() {
       super()
       this.state = {
        HOME:URL.HOME,
        AVAILABLE_EXAMS:URL.AVAILABLE_EXAMS,
        availableExamList:[
          {
            "questionPaperName": "",
            "totalExamMarks":"",
            "expiryDate": "",
            "duration":"",
            "attributes": {
              "questionPaperName": "",
            },
          }
        ]
    }
  }
  componentWillMount() {
    AsyncStorage.multiGet(['Id']).then((data) => {
      let user = data[0][1];
      classthis.setState({
        userId:user,
      });
      fetch('https://demo.practz.com/practz/ilearn/v1/questions/active-exams/?GwTemplateId=exam&userId=5901479f14f5ea0001865aa2')
      .then((response) => response.json())
      .then((responseJson) => { 
        this.setState({
          availableExamList:responseJson.data
        });
      });
    });
  }
         
      
  render() {
     var examList = this.state.availableExamList.map(function(exam){
      return (<View key={(question, index) => index.toString()} >
       <View style={[styles.announcementBox]}>
   <View style={[styles.flexrow]}>
        <View style={{flex: 2}} >
      <Text style={[styles.title,styles.margins]}>{exam.attributes.questionPaperName}</Text></View>
      <View style={[styles.sideBotton, styles.brightBlue]} >
                <Text style={[styles.bookFont,styles.whiteFont]} >Science & Tech </Text>
              </View>
      </View>
      <Text style={[stylish.myview]}>Staff Board Exam </Text>
    
     
     <Text style={[stylish.myview]}>No of Question
      <Text style={[styles.count]}> {exam.totalExamMarks}  </Text>
            <Text style={[stylish.myview]}>        Time Allocated
<Text style={[styles.count]}>  {exam.duration} </Text>
</Text>
</Text>
  <Text style={[stylish.container]}>End on {exam.expiryDate}</Text>
   
          </View>
          </View>);
           })

    return (

      <ScrollView style={{backgroundColor:'#FFFFFF',}}>
      <Text style={{fontSize:15,color:'#000000',marginLeft:50}}>Available Exams</Text>
      {examList}
      </ScrollView>
    );
    }
}
const stylish = StyleSheet.create({
  myview: {

    marginLeft: 15,
    fontSize:10,
    marginTop:4,
    color:'black'
  },
  
  container: {
    color:'#000000',
    marginLeft:15,
    fontSize:7,
    marginTop:7
    ,marginBottom:10
    
  }

    });
