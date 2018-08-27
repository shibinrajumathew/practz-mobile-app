/* @flow */
import Icon from 'react-native-ionicons';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import React, { Component } from 'react';
import RadioButton from 'radio-button-react-native';
import styles from '../Assets/Style';
import TimerMixin from 'react-timer-mixin';
import ImageOverlay from "react-native-image-overlay";
import CheckBox from 'react-native-check-box';
import {handleBackButton} from './../Functions';
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
  BackHandler,
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
      buttonDisable:true,
      value: null,//large size for reset/clear selection
      imageFilePath:null,
      hint:null,
      checked:false,
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
          "questionIndex":0,
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

  clearRadio(qpId,qId){
    this.setState({value:null})
    this.submitAnswer(qpId,qId);
  }

  componentWillMount() {
    this.getData();
    BackHandler.addEventListener('hardwareBackPress', () => {
     this.submitAnswer(this.state.qpid,this.state.qid);
     handleBackButton();
     return true;
    });
  }

  prevQuestion(qpId,qId){
    this.setState({buttonDisable:true})
    if(this.state.qno >1){
      this.setState({examPage:'prev'});
      this.submitAnswer(qpId,qId);
    }
  }

  nextQuestion(qpId,qId){
    this.setState({buttonDisable:true})
    if(this.state.qno<totalQNo){
      this.setState({examPage:'next'});
    }
    this.submitAnswer(qpId,qId);
  }

  reviewQuestion(qpId,qNo){
    this.setState({
      value:null,
      examPage:'review',
      qindex:qNo,
    });
    this.getData(qpId);
  }

  goToReview(qpId,qId){
    this.setState({
      buttonDisable:true,
      examPage:'gotoreview',
    })

    this.submitAnswer(qpId,qId);
  }

  submitAnswer(qpId,qId){

    AsyncStorage.multiGet(['organizationId','userId']).then((data) => {
      console.log("chosenAnswer",''+this.state.value+'');
      console.log("markedForReview",this.state.checked);
      console.log("organizationId",data[0][1]);
      console.log("questionId",qId);
      console.log("questionPaperId",qpId);
      console.log("remainingMinutes",this.state.rmMin);
      console.log("remainingSeconds",this.state.rmSec);
      console.log("userId",data[1][1]);

      fetch(this.state.HOME+this.state.SUBMIT_ANSWER, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain,',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, reload'
        },
        body: JSON.stringify({
          "chosenAnswer":this.state.value,
          "markedForReview":this.state.checked,
          "organizationId":data[0][1],
          "questionId":qId,
          "questionPaperId":qpId,
          "remainingMinutes":this.state.rmMin,
          "remainingSeconds":this.state.rmSec,
          "userId":data[1][1],
        })
      })
      .then(response => response.json())
      .then(responseSubmit=> {
        this.setState({
          "qid":0,
          value:null,
          checked:false,
        })
        if(this.state.examPage=='gotoreview'){
        return(
          this.props.navigation.state.params.getData(),
          console.log("props:",this.props),
          console.log("props state",this.props.navigation.state.params),
          this.props.navigation.navigate("ReviewPage",{qpid:qpId,eid:this.props.navigation.state.params.eid,rmMin:this.state.rmMin,rmSec:this.state.rmSec})

      )
        }else{
          this.getData(qpId);
        }
      })
    });
  }

  getData(qpidFn){
    AsyncStorage.multiGet(['organizationId','userId']).then((data) => {
      let examApi=this.state.examPage;

      //get qpid [only for first load, need session thus written here]
      fetch(this.state.HOME+this.state.EXAM_DETAILS+'esid='+this.props.navigation.state.params.eid,{
        headers: {
                'Accept': 'application/json, text/plain,',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
              }
            })
      .then(response=> response.json())
      .then(resqpid=> {
        //exam status
        fetch(this.state.HOME+this.state.ANSWER_STATUS+'orgid='+data[0][1]+'&qpid='+resqpid.data.qpId+'&userId='+data[1][1]+'',{
          headers: {
                  'Accept': 'application/json, text/plain,',
                  'Content-Type': 'application/json',
                  'Cache-Control': 'no-cache'
                }
              })
        .then(response=> response.json())
        .then(resobj=> {this.setState({progressData:resobj.data})});
        this.setState({qpid:resqpid.data.qpId});
      });
      //get exam count
      fetch(this.state.HOME+this.state.PROGRESS+data[1][1]+'/progress?orgId='+data[0][1],{
        headers: {
                'Accept': 'application/json, text/plain,',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
              }
            })
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
      if(this.props.navigation.state.params.examPage=="fromReview"){
        API=this.state.HOME+this.state.REVIEW+data[1][1]+'?idx='+this.props.navigation.state.params.qindex+'&orgid='+data[0][1]+'&qpid='+this.props.navigation.state.params.qpid;
        this.props.navigation.state.params.examPage=null;
      }else {
        if(examApi=="startQuiz"){
            //first time question fetch
          API=this.state.HOME+this.state.START_EXAM+'startQuiz/'+data[1][1]+'?esid='+this.props.navigation.state.params.eid+'&orgid='+data[0][1];
        }else if(examApi=="next"){
          API=this.state.HOME+this.state.START_EXAM+'next/question/'+data[1][1]+'?orgid='+data[0][1]+'&qpid='+qpidFn;
        }else if(examApi=="prev"){
          API=this.state.HOME+this.state.START_EXAM+'previous/question/'+data[1][1]+'?orgid='+data[0][1]+'&qpid='+qpidFn;
        }else if(examApi=="review"){
          API=this.state.HOME+this.state.REVIEW+data[1][1]+'?idx='+this.state.qindex+'&orgid='+data[0][1]+'&qpid='+qpidFn;
        }
      }

      fetch(API,{
        headers: {
                'Accept': 'application/json, text/plain,',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
              }
            })
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
          const regex = /(<([^>]+)>|&nbsp;)/ig;
          const optnresult = ''+responseobj.data.text.replace(regex, ' ')+'';

          if(examApi=="startQuiz"){
            this.setState({
              rmMin:responseobj.data.remainingMinutes,
              rmSec:responseobj.data.remainingSeconds
            })
          }
          this.setState({
            value:responseobj.data.submittedAnswer,
            buttonDisable:false,
            qid:responseobj.data.questionId,
            quest: optnresult,
            imageFilePath:responseobj.data.imageFilePath,
            hint:responseobj.data.hint,
            qStatus:responseobj.data.questionStatus,
            optn:responseobj.data.options,
            minus:1,
            qno:responseobj.data.currentIndex+1,
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
        //exit from exam on timeout
        this.props.navigation.navigate("ReviewPage",{qpid:this.state.qpid,eid:this.props.navigation.state.params.eid});
      }
    }, 1000);
  }

  componentWillUnmount () {
    //to save memory we've to clear interval
    this.interval && clearInterval(this.interval);
    this.interval = false;
    BackHandler.addEventListener('hardwareBackPress', () => {
     this.submitAnswer(this.state.qpid,this.state.qid);
     handleBackButton();
     return true;
    });
  }

  static navigationOptions = ({ navigation  }) => {
    const {state} = navigation;
    return {
      headerLeft:null,
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

    onClick(data){
      if(data==false){
        this.setState({checked:true})
      }else{
        this.setState({checked:false})
      }
    }

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
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 4}}>
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
          {
            this.state.hint!=null?
            <Text style={[styles.lightFont]}>hint(s):this.state.hint</Text>
            :
            <Text></Text>
          }
          {
            this.state.imageFilePath!=null?
            <Image
              resizeMode="contain"
              source={{uri: ''+this.state.imageFilePath+''}}
              style={{flex:1, width: Dimensions.get('window').width-90, height: Dimensions.get('window').width-90}}
            />
          :
          <Text> </Text>
        }
          {objAns}
          <View style={[styles.flexrow]}>
            <CheckBox
             style={[styles.buttonContainer]}
            onClick={()=>this.onClick(this.state.checked)}
            isChecked={this.state.checked}
            leftText={"Mark For Review"}
            checkBoxColor="#4d90fe"
            />
            <TouchableOpacity disabled={this.state.buttonDisable} style={[styles.buttonContainer, styles.brightBlue]} onPress={() => this.goToReview(this.state.qpid,this.state.qid)} ><Text style={styles.buttonText} >Go to Review page</Text></TouchableOpacity>
          </View>
        </View>
        <View style={[styles.flexrow]}>
          <ScrollView horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{flex:1,marginTop: 10, marginBottom: 10}}>
            <View>
              <Icon name="ios-arrow-dropleft" size={22}/>
            </View>
            {progressNum}
            <View>
              <Icon name="ios-arrow-dropright" size={22}/>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <View style={[styles.submitButton,styles.flexrow]}>
      {
        1 < this.state.qno ?
          <TouchableOpacity disabled={this.state.buttonDisable} onPress={() =>  this.prevQuestion(this.state.qpid,this.state.qid)}  style={[styles.questionButton,styles.white]}><Text style={[styles.violetFont]}>Previous</Text></TouchableOpacity>
        :
          <TouchableOpacity disabled={this.state.buttonDisable}
          onPress={() => this.goToReview(this.state.qpid,this.state.qid)}
          style={[styles.questionButton,styles.white]}><Text style={[styles.violetFont]}>Review</Text></TouchableOpacity>
      }
          <TouchableOpacity disabled={this.state.buttonDisable} onPress={() => this.clearRadio(this.state.qpid,this.state.qid)} style={[styles.questionButton]}  ><Text style={[styles.whiteFont]}>Clear</Text></TouchableOpacity>
      {
        this.state.qno < this.props.navigation.state.params.tqno ?
          <TouchableOpacity disabled={this.state.buttonDisable} onPress={() => this.nextQuestion(this.state.qpid,this.state.qid)} style={[styles.questionButton,styles.white]}><Text style={[styles.violetFont]}>Next</Text></TouchableOpacity>
        :
          <TouchableOpacity disabled={this.state.buttonDisable} onPress={() => this.goToReview(this.state.qpid,this.state.qid)}
          style={[styles.questionButton,styles.white]}><Text style={[styles.violetFont]}>Review</Text></TouchableOpacity>
      }
      </View>
    </View>
  );
}
}
