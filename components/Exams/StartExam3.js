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
    let API;
    let questionNo;
    let totalQNo;
    this.state = {
      isMounted: false,
      HOME:URL.HOME,
      START_EXAM:URL.START_EXAM,
      PROGRESS:URL.PROGRESS,
      EXAM_DETAILS:URL.EXAM_DETAILS,
      ANSWER_STATUS:URL.ANSWER_STATUS,
      value: 99,//large size for reset/clear selection
      rmMin:1,
      rmSec:1,
      minus:0,
      picTick:'../Assets/images/tick.png',
      qno:1,
      progressData: [
              {
                  "percentageCompleted": 0,
                  "id":"",
                  "questionPaperName": "",
              }
          ],
      quest:'Please wait while question loading',
      optn: ["","","","",],
      examPage:'startQuiz',

    }

  }
  //for the timmer
  mixins: [TimerMixin];


  handleOnPress(value){
      this.setState({value:value})
  }

  clearRadio(){
    this.setState({value:99})
    console.log('value is:',this.state.value);
  }

  componentWillMount() {
    this.getData();
  }

  prevQuestion(qpId){
    if(this.state.qno>1){
      this.setState({
        examPage:'prev',
      });
      this.getData(qpId);

    }
  }

  nextQuestion(qpId){
      if(this.state.qno<totalQNo){
        this.setState({
          examPage:'next'
        });
        this.getData(qpId);

      }
  }

getData(qpidFn){
  AsyncStorage.multiGet(['organizationId','userId']).then((data) => {
    let examApi=this.state.examPage;

    //get exam count
    fetch(this.state.HOME+this.state.PROGRESS+data[1][1]+'/progress?orgId='+data[0][1])
    .then(response=> response.json())
    .then(resobj=> {
      questionNo=resobj.data.attendedQuestionsCount+1;
      totalQNo=resobj.data.totalQuestionsCount;
      console.log("qno",questionNo);
      this.setState({
        total_qno:resobj.data.totalQuestionsCount,
      })
      //for top bar data
      const {setParams} = this.props.navigation;
      setParams({qno: resobj.data.attendedQuestionsCount,tqno:resobj.data.totalQuestionsCount});
    });

    if(examApi=="startQuiz"){

      API=this.state.HOME+this.state.START_EXAM+'startQuiz/'+data[1][1]+'?esid='+this.props.navigation.state.params.eid+'&orgid='+data[0][1];
    }else if(examApi=="next"){
      API=this.state.HOME+this.state.START_EXAM+'next/question/'+data[1][1]+'?orgid='+data[0][1]+'&qpid='+qpidFn;
    }else if(examApi=="prev"){
      API=this.state.HOME+this.state.START_EXAM+'previous/question/'+data[1][1]+'?orgid='+data[0][1]+'&qpid='+qpidFn;
    }
  console.log("api from getData:",API);
  console.log("qpid:",qpidFn);
  //first time question fetch
  fetch(API)
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
      qno:1,
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
      qpid:'',
    });
  }else{
  const regex = /(<([^>]+)>)/ig;
  const optnresult = responseobj.data.text.replace(regex, '');
  this.setState({
    quest: optnresult,
    optn:responseobj.data.options,
    minus:1,
    qno:responseobj.data.currentIndex+1,
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
    this.setState({qpid:resqpid.data.qpId});
    });

//ends session
});

}
componentDidMount(){

  this.interval = setInterval(() => {
    if(this.state.rmSec==0){
      this.setState( { isMounted: true }, () => {
        this.setState({
          rmSec:59,
          rmMin:this.state.rmMin-this.state.minus,
        });

        })

    }else{
      this.setState( { isMounted: true }, () => {
        this.setState({
          rmSec:this.state.rmSec-this.state.minus,

        })
      })
    }

    if(this.state.rmMin==0){
      this.setState( { isMounted: true }, () => {
      this.setState({
        rmSec:0,
        rmMin:0,
      })}
      //exit from exam

    }


  }, 1000);
}
componentWillUnmount() {
       this.setState( { isMounted: false } )
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
        <RadioButton currentValue={this.state.value} value={index} onPress={this.handleOnPress.bind(this)}>
        <Text> {exam.toString()}</Text>
        </RadioButton>
      </View>
      );
    });
    progressNum = this.state.progressData.map((exam,index) => {
     return(
      <View  key={index.toString()}  style={[styles.flexrow]}>
         {exam.status == "ANSWERED" ?
            <View  style={[styles.questionAttended]}>
              <Image  style={[styles.tickedNumber]} source={img}/>
              <TouchableOpacity  style={[styles.textInsideCircle]}>
                <Text  style={[styles.lightFont,styles.tickedNumberColor]} >{exam.questionIndex+1}</Text>
              </TouchableOpacity>
            </View>
           : (exam.status=="MARKED_FOR_REVIEW"?
           <View  style={[styles.questionForReview]}>
             <TouchableOpacity  style={[styles.textInsideCircle]}>
               <Text  style={[styles.lightFont,styles.whiteFont]} >{exam.questionIndex+1}</Text>
             </TouchableOpacity>
           </View>
           :
           <View  style={[styles.questionUnattended]}>
             <TouchableOpacity  style={[styles.textInsideCircle]}>
               <Text  style={[styles.lightFont]} >{exam.questionIndex+1}</Text>
             </TouchableOpacity>
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
        <ScrollView style={{ flex: 4 }}>
          <View style={[styles.timmingBox,styles.flexrow,styles.lightBlue]}>
              <Image style={[styles.timmer]} source={img_timmer}/>
              <View style={{padding: 10}}>
            <Text style={[styles.heavyFont,styles.boldFont, styles.whiteFont]} >{this.state.rmMin} mins {this.state.rmSec} sec</Text>
            </View>
          </View>
        {/* {question & ans starts here} */}
          <View style={[styles.questionBox,styles.flexrow]}>
            <Text style={[styles.topTitle]}>Q{this.state.qno} </Text>
            <Text style={[styles.lightFont, styles.blackFont]} >{(this.state.quest).toString()}</Text>
          </View>
          <View style={[styles.examBox, styles.flexcol]}>
            {objAns}
            <View style={[styles.flexrow]}>
              <TouchableOpacity style={[styles.buttonContainer, styles.brightBlue]} ><Text style={styles.buttonText} >Mark For Review</Text></TouchableOpacity>
              <TouchableOpacity style={[styles.buttonContainer, styles.brightBlue]} ><Text style={styles.buttonText} >Go to Review page</Text></TouchableOpacity>
            </View>
          </View>
          <ScrollView horizontal={true} style={{flex:1,marginTop: 10}}>
              {progressNum}
          </ScrollView>

        </ScrollView>
        <View style={[styles.submitButton,styles.flexrow]}>
          <TouchableOpacity onPress={() =>  this.prevQuestion(this.state.qpid)}  style={[styles.questionButton]}><Text style={[styles.whiteFont]}>Previous</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.questionButton]} onPress={this.clearRadio.bind(this)}><Text style={[styles.whiteFont]}>Clear</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.nextQuestion(this.state.qpid)} style={[styles.questionButton,styles.white]}><Text style={[styles.violetFont]}>Next</Text></TouchableOpacity>
        </View>
      </View>


    );
  }
}
