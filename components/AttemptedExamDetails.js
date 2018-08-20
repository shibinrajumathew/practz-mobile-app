import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  Dimensions,
  Image
} from 'react-native';
import URL from './Url';
import Icon from 'react-native-ionicons';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import styles from './Assets/Style';
const barWidth = Dimensions.get('screen').width - 30;
export default class AttemptedExamDetails extends Component {
  constructor(props) {
    super(props)
      classthis=this;
      this.state = {
        HOME:URL.HOME,
        ATTEMPTED_EXAM_DETAILS:URL.ATTEMPTED_EXAM_DETAILS,
        correctAnswersCounts:0,
        partialAnswersCounts: 0,
        wrongAnswersCounts: 0,
        unattendedCounts: 0,
        timeTakens: "",
        totalMarkss: 0,
        examNames: "test",
        durations:0,
        percentages:0,
        totalQuestionss: 0,
        totalExamMarkss:0,
        questionss:[
         {
           "questionIndexs": 0,
           "submittedAnswer": "",
           "correctAnswer": "",
           "questionText":""
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
         //console.log("response data",this.state.HOME+this.state.ATTEMPTED_EXAM_DETAILS+this.props.navigation.state.params.eid+'?GwTemplateId=exam');
        fetch(this.state.HOME+this.state.ATTEMPTED_EXAM_DETAILS+this.props.navigation.state.params.eid+'?GwTemplateId=exam')
        .then((response) => response.json())
        .then((responseJson) => {
        //console.log("response from url",responseJson);
       //const regex = /(<([^>]+)>)/ig;
       // const result = responseJson.data.questions.replace(regex, '');
          const {setParams} = this.props.navigation;
          setParams({examNames: responseJson.data.examName});
          this.setState({
            correctAnswersCounts: responseJson.data.correctAnswersCount,
            partialAnswersCounts:  responseJson.data.partialAnswersCount,
            wrongAnswersCounts:  responseJson.data. wrongAnswersCount,
            unattendedCounts: responseJson.data.unattendedCount,
            timeTakens:  responseJson.data.timeTaken,
            totalMarkss:  responseJson.data.totalMarks,
            durations:responseJson.data.duration,
            examNames: responseJson.data.examName,
            percentages:responseJson.data.percentage,
            totalQuestionss:responseJson.data.totalQuestions,
            totalExamMarkss:responseJson.data.totalExamMarks,
            questionss:responseJson.data.questions
        //console.log("response image",responseJson.data.images[0].url  );
        //console.log("response data",this.state.HOME+this.state.NOTE_DETAILS+data[0][1]+'/detailed');
          });
        });
     });
   }
    static navigationOptions = ({ navigation  }) => {
      const {state} = navigation;
      return {title: state.params.examNames,
      headerTitleStyle:{
        color:'#5e3f8c',
        textAlign: 'center',
      },
    };
  }
  render() {
    var questionList = this.state.questionss.map(function(question){
      const regex = /(<([^>]+)>)/ig;
      const result = question.questionText.replace(regex, '');
      return (<View key={(question, index) => index.toString()} >
        <View style={[styles.announcementBox]}>
          <View style={[styles.flexrow]}>
            <View style={{flex:1}}>
              <Text style={[styles.boldFont]}>{question.questionIndex}</Text>
            </View>
            <View style={{flex:9}}>
              <Text style={{color:'#413333',lineHeight:20}}>  {result}  </Text>
                 <View style={[styles.flexrow]}>
                    <View style={{flex:2}}>
                      <Text style={{color:'#000000'}}>ChosenAnswer</Text>
                    </View>
                    <View style={{flex:3}}>
                       <Text style={{color:'#000000',fontWeight:'bold'}}>{question.submittedAnswer}</Text>
                    </View>

               </View>
              <View style={[styles.flexrow]}>
                <View style={{flex:2}}>
                  <Text style={{color:'#000000'}}>Correct Answer</Text>
                </View>
                <View style={{flex:3}}>
                  <Text style={{color:'#000000',fontWeight:'bold'}}>{question.correctAnswer}</Text>
                </View>
              </View>
          </View>
      </View>
  </View>
 </View>);
})
return (
  <ScrollView style={{backgroundColor:'#FFFFFF'}}  showsVerticalScrollIndicator={false}>
    <View style={[styles.announcementbox,styles.grey]}>
      <View style={[styles.flexrow]}>
        <View style={{ flex:1}} >
          <Text style={[styles.heavyFont,styles.boldFont,styles.blackFont,styles.margins]}>{this.state.examNames}</Text>
        </View>
        <View style={[styles.sideBotton, styles.brightBlue,styles.margins]} >
          <Text style={[styles.bookFont,styles.whiteFont]}>Science and Tech</Text>
        </View>
      </View>
      <Text style={[styles.margins,styles.lightFont,stylish.mymargin]}> Staff Board Exam</Text>
      <View style={[styles.line]}/>
        <View style={[styles.flexrow]}>
          <View style={{flex:6}}>
            <Text style={[stylish.font]}>Total Questions</Text>
            <Text style={[stylish.font]}>Time Taken</Text>
            <Text style={[stylish.font]}>Total Marks</Text>
            <Text style={[styles.lightFont,styles.percentage,styles.margins,styles.count]}>{this.state.percentages}%</Text>
            <View style={{marginLeft:15,marginRight:15}}><ProgressBarAnimated
              width={barWidth}
              value={this.state.percentages}
              backgroundColorOnComplete="#6CC644"
              backgroundColor="#956FCE"/>
            </View>
          </View>
          <View style={{flex:3}}>
            <Text style={[stylish.fontcolor]}>{this.state.totalQuestionss} </Text>
            <Text style={[stylish.fontcolor]}>{this.state.timeTakens} </Text>
            <Text style={[stylish.fontcolor]}>{this.state.totalMarkss}/{this.state.totalExamMarkss} </Text>
          </View>
          <View style={[stylish.allotedview]}>
            <Text style ={{color:'#FFFFFF',fontSize:10,alignSelf:'center'}}>Alloted: {this.state.durations}</Text>
          </View>
        </View>
      </View>
      <View style={[styles.flexrow,styles.margins]}>
        <View style={{flex:4,marginLeft:15}}>
          <Text style={[styles.violetFont]}>correct</Text>
        </View>
        <View style={[stylish.box,styles.lightgreen]}>
          <Text style={[styles.whiteFont]}> {this.state.correctAnswersCounts}</Text>
        </View>
        <View style={{flex:3}}>
          <Text style={[styles.violetFont]}>wrong</Text>
        </View>
        <View style={[stylish.box,styles.red]}>
          <Text style={[styles.whiteFont]}> {this.state.wrongAnswersCounts}</Text>
        </View>
        <View style={{flex:5}}>
          <Text style={[styles.violetFont]}>unattended </Text>
        </View>
        <View style={[stylish.box]}>
         <Text >{this.state.unattendedCounts}</Text>
        </View>
      </View>
    <View styles={[styles.line]}/>
      {questionList}
  </ScrollView>
  );
  }
}
 const stylish = StyleSheet.create({
  mymargin:{
    marginTop:2
  },
  font:{
    fontSize:15,
    marginTop:5,
    marginLeft:15,
    color: '#000'
  },
  fontcolor:{
    fontSize:15,
    marginTop:5,
    color:'#956FCE',
  },
  allotedview:{
    flex:4,
    backgroundColor:'#CEC76F',
    borderWidth: .5,
    borderColor: '#7C7676',
    marginTop:35,
    marginBottom:100,
    marginRight:60,
    borderRadius:2,
    marginLeft:30
  },
  box:{
    borderWidth: .5,
    borderColor: '#707070',
    borderRadius:3,
    flex:2,
    marginBottom:10,
    marginRight:30,
    alignItems:'center'
  }
});
