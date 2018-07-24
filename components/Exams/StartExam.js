/* @flow */
import Icon from 'react-native-ionicons';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import React, { Component } from 'react';
import RadioButton from 'radio-button-react-native';
import styles from '../Assets/Style';
import TimerMixin from 'react-timer-mixin';
import ImageOverlay from "react-native-image-overlay";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  ToolbarAndroid,
  Alert,
  FlatList,
  Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import URL from './../Url';

export default class StartExam extends Component {
  constructor() {
    super();
    this.state = {
      HOME:URL.HOME,
      START_EXAM:URL.START_EXAM,
      PROGRESS:URL.PROGRESS,
      EXAM_DETAILS:URL.EXAM_DETAILS,
      ANSWER_STATUS:URL.ANSWER_STATUS,
      value: 0,
      rmMin:1,
      rmSec:1,
      minus:0,
      picTick:'../Assets/images/tick.png',
      qno:0,
      progressData: [
              {
                  "percentageCompleted": 0,
                  "id":"",
                  "questionPaperName": "",
              }
          ],
      quest:'',
      optn: [
        { 'key': '','index':1 },
        { 'key': '','index':2 },
        { 'key': '','index':3 },
        { 'key': '','index':4 },
      ],

    }

  }
  //for the timmer
  mixins: [TimerMixin];


  handleOnPress(value){
      this.setState({value:value})
  }

  clearRadio(){
    this.setState({value:0})
    console.log('value is:',this.state.value);
  }

  componentWillMount() {

  AsyncStorage.multiGet(['organizationId','userId']).then((data) => {
    //get exam count
    fetch(this.state.HOME+this.state.PROGRESS+data[1][1]+'/progress?orgId='+data[0][1])
    .then(response=> response.json())
    .then(resobj=> {
      this.setState({
        qno:resobj.data.attendedQuestionsCount,
        total_qno:resobj.data.totalQuestionsCount,
      })
      //for top bar data
      const {setParams} = this.props.navigation;
      setParams({qno: resobj.data.attendedQuestionsCount,tqno:resobj.data.totalQuestionsCount});
    });
    //first time question fetch
  fetch(this.state.HOME+this.state.START_EXAM+data[1][1]+'?esid='+this.props.navigation.state.params.eid+'&orgid='+data[0][1])
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
      checkFlag:1,
      view:'',
      qno:0,
      quest:'inside no data',
      optn: [
        { 'key': '','index':1 },
        { 'key': '','index':2 },
        { 'key': '','index':3 },
        { 'key': '','index':4 },
      ],
      eid:0,
      eprod:'',
      qname:'',
      exp:'',
    });
  }else{
  const regex = /(<([^>]+)>)/ig;
  const optnresult = responseobj.data.text.replace(regex, '');
  this.setState({
    quest: optnresult,
    optn:responseobj.data.options,
    minus:1,
    rmMin:responseobj.data.remainingMinutes,
    rmSec:responseobj.data.remainingSeconds
  })
}
  });
//get qpid
fetch(this.state.HOME+this.state.EXAM_DETAILS+'esid='+this.props.navigation.state.params.eid)
.then(response=> response.json())
.then(resqpid=> {//exam status
    fetch(this.state.HOME+this.state.ANSWER_STATUS+'orgid='+data[0][1]+'&qpid='+resqpid.data.qpId+'&userId='+data[1][1]+'')
    .then(response=> response.json())
    .then(resobj=> {this.setState({progressData:resobj.data})});
    });

});
}

componentDidMount(){
  this.interval = setInterval(() => {
    if(this.state.rmSec==0){
      this.setState({
        rmSec:59,
        rmMin:this.state.rmMin-this.state.minus,
      })
    }else{
      this.setState({
        rmSec:this.state.rmSec-this.state.minus
      })
    }

    if(this.state.rmMin==0){
      //exit from exam
    }


  }, 1000);
}

static navigationOptions = ({ navigation  }) => {
        const {state} = navigation;
        return {
                headerRight: (
                  <View  style={{marginRight: 10,flexDirection: 'row',}}>
                  <Text>{state.params.qno}/{state.params.tqno} </Text>
                  <ProgressBarAnimated
                              width={ Dimensions.get('screen').width/1.4}
                              height={20}
                              value={((state.params.qno/state.params.tqno)*100)}
                              backgroundColorOnComplete="#6CC644"
                              backgroundColor='#CEC76F'
                            />
                  </View>)
            }
    };

  render() {
    let img=require('../Assets/images/tick.png');
    let img_timmer=require('../Assets/images/timmer.png');
    objAns= this.state.optn.map((exam,index) =>{
      return(
        <View  key={index.toString()} style={[styles.answers]}>
        <RadioButton key={index.toString()} currentValue={this.state.value} value={index+1} onPress={this.handleOnPress.bind(this)}>
        <Text key={index.toString()}>  {exam[0]}</Text>
        </RadioButton>
      </View>
      );
    });
    progressNum = this.state.progressData.map((exam) => {
     return(
      <View style={[styles.flexrow]}>
         {exam.status == "ANSWERED" ?
            <View style={[styles.questionAttended]}>
              <Image style={[styles.tickedNumber]} source={img}/>
              <View style={[styles.textInsideCircle]}>
                <Text style={[styles.lightFont,styles.tickedNumberColor]} >{exam.questionIndex+1}</Text>
              </View>
            </View>
           : (exam.status=="MARKED_FOR_REVIEW"?
           <View style={[styles.questionForReview]}>
             <View style={[styles.textInsideCircle]}>
               <Text style={[styles.lightFont,styles.whiteFont]} >{exam.questionIndex+1}</Text>
             </View>
           </View>
           :
           <View style={[styles.questionUnattended]}>
             <View style={[styles.textInsideCircle]}>
               <Text style={[styles.lightFont]} >{exam.questionIndex+1}</Text>
             </View>
           </View>
         )
           }
       </View>
     )
   });

 //1 seconds
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4 }}>
          <View style={[styles.timmingBox,styles.flexrow,styles.lightBlue]}>
              <Image style={[styles.timmer]} source={img_timmer}/>
              <View style={{padding: 10}}>
            <Text style={[styles.heavyFont,styles.boldFont, styles.whiteFont]} >{this.state.rmMin} mins {this.state.rmSec} sec</Text>
            </View>
          </View>
        {/* {question & ans starts here} */}
          <View style={[styles.questionBox,styles.flexrow]}>
            <Text style={[styles.topTitle]}>Q{this.state.qno+1}. </Text>
            <Text style={[styles.lightFont, styles.blackFont]} >{this.state.quest}</Text>
          </View>
          <View style={[styles.examBox, styles.flexcol]}>
            {objAns}
          </View>
          <ScrollView horizontal={true} style={{flex:1,marginTop: 10}}>
              {progressNum}
          </ScrollView>
          <View style={[styles.flexrow]}>
            <TouchableOpacity ><Text style={[styles.whiteFont]}>Mark For Review</Text></TouchableOpacity>
            <TouchableOpacity ><Text style={[styles.whiteFont]}>Go to Review page</Text></TouchableOpacity>
          </View>
        </View>
        <View style={[styles.submitButton,styles.flexrow]}>
          <TouchableOpacity style={[styles.questionButton]}><Text style={[styles.whiteFont]}>Previous</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.questionButton]} onPress={this.clearRadio.bind(this)}><Text style={[styles.whiteFont]}>Clear</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('StartExam',{eid:this.props.navigation.state.params.eid,api:'startQuiz'})} style={[styles.questionButton,styles.white]}><Text style={[styles.violetFont]}>Next</Text></TouchableOpacity>
        </View>
      </View>


    );
  }
}
