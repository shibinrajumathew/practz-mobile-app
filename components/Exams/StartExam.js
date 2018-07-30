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
      HOME:URL.HOME,
      START_EXAM:URL.START_EXAM,
      PROGRESS:URL.PROGRESS,
      EXAM_DETAILS:URL.EXAM_DETAILS,
      ANSWER_STATUS:URL.ANSWER_STATUS,
      REVIEW:URL.REVIEW,
      SUBMIT_ANSWER:URL.SUBMIT_ANSWER,
      value: 99,//large size for reset/clear selection
      rmMin:1,
      rmSec:1,
      minus:0,
      picTick:'../Assets/images/tick.png',
      qno:1,
      qpid:0,
      qid:0,
      qindex:0,
      selectedAnswer:null,
      qStatus:null,
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
    console.log("the selected radio value:",value);
    this.setState({value:value})
  }

  clearRadio(){
    this.setState({value:99})
  }

  componentWillMount() {
    this.getData();
  }

  prevQuestion(qpId){
    if(this.state.qno>1){
      this.setState({
        examPage:'prev',
        value:99,
      });
      this.getData(qpId);

    }
  }

  nextQuestion(qpId){
    console.log("qpid",qpId);
    if(this.state.qStatus=="UNANSWERED"){
      if(this.state.qid==0){

      }else{
        console.log("entered submit ans");
        this.submitAnswer();
      }



    }else{
      this.setState({
        value:99,
      });
    }
    if(this.state.qno<totalQNo){
      this.setState({
        examPage:'next',
      });
      this.getData(qpId);

    }

  }

  reviewQuestion(qpId,qNo){
    this.setState({
      value:99,
      examPage:'review',
      qindex:qNo,
    });
    this.getData(qpId);
  }
  submitAnswer(){
    AsyncStorage.multiGet(['organizationId','userId']).then((data) => {

      fetch(this.state.HOME+this.state.SUBMIT_ANSWER, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain,',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "chosenAnswer":''+this.state.value+'',
          "markedForReview":false,
          "organizationId":data[0][1],
          "questionId":this.state.qid,
          "questionPaperId":this.state.qpid,
          // "remainingMinutes":"520",
          "remainingMinutes":this.state.rmMin,
          "remainingSeconds":this.state.rmSec,
          "userId":data[1][1],


        })
      })
      .then(response => response.json())
      .then(responseSubmit=> {
        console.log("value of question:",this.state.qid);
        console.log("value of qpaper:",this.state.qpid);
        console.log("resp from submitButton:",responseSubmit);
        this.setState({
          "qid":0,
          value:99,

        })

      })
    });
  }
  getData(qpidFn){
    AsyncStorage.multiGet(['organizationId','userId']).then((data) => {
      let examApi=this.state.examPage;

      //get qpid
      fetch(this.state.HOME+this.state.EXAM_DETAILS+'esid='+this.props.navigation.state.params.eid)
      .then(response=> response.json())
      .then(resqpid=> {//exam status
        fetch(this.state.HOME+this.state.ANSWER_STATUS+'orgid='+data[0][1]+'&qpid='+resqpid.data.qpId+'&userId='+data[1][1]+'')
        .then(response=> response.json())
        .then(resobj=> {this.setState({progressData:resobj.data})});
        this.setState({qpid:resqpid.data.qpId});
      });

      //get exam count
      fetch(this.state.HOME+this.state.PROGRESS+data[1][1]+'/progress?orgId='+data[0][1])
      .then(response=> response.json())
      .then(resobj=> {
        questionNo=resobj.data.attendedQuestionsCount+1;
        totalQNo=resobj.data.totalQuestionsCount;
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
      }else if(examApi=="review"){
        API=this.state.HOME+this.state.REVIEW+data[1][1]+'?idx='+this.state.qindex+'&orgid='+data[0][1]+'&qpid='+qpidFn;
      }
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
          if(responseobj.data.questionStatus=="ANSWERED"){
            this.setState({
              value:responseobj.data.submittedAnswer,
            })
          }
          this.setState({
            qid:responseobj.data.questionId,
            quest: optnresult,
            qStatus:responseobj.data.questionStatus,
            optn:responseobj.data.options,
            minus:1,
            qno:responseobj.data.currentIndex+1,
            rmMin:responseobj.data.remainingMinutes,
            rmSec:responseobj.data.remainingSeconds
          })
        }


      });


      //ends session
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
        this.setState({
          rmSec:0,
          rmMin:0,
        })
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
            <RadioButton currentValue={this.state.value} value={exam.toString()} onPress={this.handleOnPress.bind(this)}>
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
              <TouchableOpacity onPress={() =>  this.reviewQuestion(this.state.qpid,exam.questionIndex)}  style={[styles.textInsideCircle]}>
                <Text  style={[styles.lightFont,styles.tickedNumberColor]} >{exam.questionIndex+1}</Text>
              </TouchableOpacity>
            </View>
            : (exam.status=="MARKED_FOR_REVIEW"?
            <View  style={[styles.questionForReview]}>
              <TouchableOpacity onPress={() =>  this.reviewQuestion(this.state.qpid,exam.questionIndex)}  style={[styles.textInsideCircle]}>
                <Text  style={[styles.lightFont,styles.whiteFont]} >{exam.questionIndex+1}</Text>
              </TouchableOpacity>
            </View>
            :
            <View  style={[styles.questionUnattended]}>
              <TouchableOpacity onPress={() =>  this.reviewQuestion(this.state.qpid,exam.questionIndex)}  style={[styles.textInsideCircle]}>
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
