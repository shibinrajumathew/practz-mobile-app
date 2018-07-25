/* @flow */
import Icon from 'react-native-ionicons';
import React, { Component } from 'react';
import styles from '../Assets/Style';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  FlatList,
  Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import URL from './../Url';


export default class ExamDetails extends Component {
  constructor() {
    super();
    classthis=this;
    this.state = {
      HOME:URL.HOME,
      EXAM_DETAILS:URL.EXAM_DETAILS,
      data: [
        { 'key': 'On clicking the \'Start Exam\' button, the timer will start and you can answer the questions within the allocated time.' },
        { 'key': 'If you need to review any question, then tick the \'Mark for Review\' checkbox. These questions will be highlighted in the Review Page.' },
        { 'key': 'Click on the \'Review Page\' button to see all the questions and its statuses. Clicking on the question number will take you directly to that question.' },
        { 'key': 'The system will automatically finish this Test after the allocated time.' },
        { 'key': 'If you are able to complete the Test before the allocated time, you can press the \'Submit Exam\' button in the review page to finish & exit this Test.' },
        { 'key': 'All the finished exams will be listed in the \'Attempted Exams\' section of your home page.' },
        { 'key': 'In case of any unfortunate events like network failure or system crash, you can resume this test from the Exams in progress section of your home page.' },
      ],
      "examName": " ",
       "duration": 0,
       "negMarkingEnabled": true,
       "negMarkPercentage": 0,
       "totalQuestions": 0,
       "totalMarks": 0
    }

  }
  componentWillMount() {
    console.log("inside landing will mount");
    fetch(this.state.HOME+this.state.EXAM_DETAILS+'esid='+this.props.navigation.state.params.eid+'')
    .then(response =>  response.json())
    .then(responseobj => {
    //   if(responseobj==401){
    //   logout();
    //   this.props.navigation.navigate('Loign');
    // }else{
    //     this.setState({
    //     attempted:responseobj.data,
    //   });
    // }


    if((responseobj.data)=== undefined ||(responseobj.data.length<1)){
      this.setState({
        status:'No active exams available now. Please check later.',
        view:'',
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
        status:'Available exams',
        view:'View all',
        duration:responseobj.data.duration,
        totalQuestions:responseobj.data.totalQuestions,
        negMarkPercentage:responseobj.data.negMarkPercentage,
      });
    }
    console.log("available exam count",responseobj);
    });



  }
  static navigationOptions = {
    title: "Exam Instructions",
    headerTitleStyle:{
      color:'#5e3f8c',
      textAlign: 'center',
    },
};
  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 4 }}>
          <View style={[styles.examBox, styles.flexrow]}>
            <View style={[styles.flexcol, styles.innerTextBox]} >
              <Text style={[styles.topTitle, styles.blackFont]}>{this.props.navigation.state.params.qname}</Text>
              <Text style={[styles.lightFont, styles.blackFont]} >{this.props.navigation.state.params.eprod}</Text>
              <Text style={[styles.lightFont]} >No of Questions <Text style={[styles.count]}>{this.state.totalQuestions} </Text>Time Allocated <Text style={[styles.count]}>{this.state.duration} Min</Text></Text>

              <View style={[styles.flexrow]}>
                <Text style={[styles.lightFont]} >Negative mark </Text>
                <View style={[styles.negativeButton, styles.orange]} >
                  <Text style={[styles.whiteFont]}>{this.state.negMarkPercentage}%</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{padding: 5}}>
            <Text style={[styles.topTitle]}>Instructions</Text>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => <Text style={[styles.lightFont]} > {'\u2022'}  {item.key}</Text>}
              keyExtractor={(item, index) => index.toString()}
            />
            <Text style={[styles.lightFont, styles.blackFont]} >Question Colors</Text>
            <View style={[styles.flexrow]}>
              <View style={[styles.questionUnattended]}></View><Text style={[styles.lightFont]} > Unattended </Text>
              <View style={[styles.questionForReview]}></View><Text style={[styles.lightFont]}> Marked for review </Text>
              <View ><Icon name='ios-checkmark-circle' size={20} color='#8BC34A' /></View><Text style={[styles.lightFont]}> Attended</Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={[styles.submitButton]} onPress={() => this.props.navigation.navigate('StartExam',{eid:this.props.navigation.state.params.eid,examPage:'startQuiz'})}><Text style={[styles.lightFont, styles.whiteFont]} > Start Exam</Text></TouchableOpacity>
      </View>
    );
  }
}
