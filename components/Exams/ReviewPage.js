/* @flow */
import React, { Component } from 'react';
import styles from '../Assets/Style';
import TimerMixin from 'react-timer-mixin';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  Button,
  BackHandler,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import URL from './../Url';
import {handleBackButton} from './../Functions';

class Exam extends Component {
  constructor() {
    super();
    let API;
    let questionNo;
    let totalQNo;
    this.state = {
      HOME:URL.HOME,
      REVIEW_EXAM:URL.REVIEW_EXAM,
      PROGRESS:URL.PROGRESS,
      questionsReview:[
        { '': '','':'' },
        { '': '','':'' },
        ]
    }
  }
  handleButtonClick = ()=>{
    this.forceUpdate();
  }
  getData(){
    AsyncStorage.multiGet(['organizationId','userId']).then((data) => {
      API=this.state.HOME+this.state.REVIEW_EXAM+data[1][1]+'?orgid='+data[0][1]+'&qpid='+this.props.qpid;
      fetch(API,{
        headers: {
                'Accept': 'application/json, text/plain,',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
              }
      })
      .then(response =>  response.json())
      .then(responseobj => {
        console.log("response from getData");
        this.setState({
          questionsReview:responseobj.data
        });
      })
    })
  }

  componentWillMount(){
    this.getData();
    BackHandler.addEventListener('hardwareBackPress', () => {
     handleBackButton();
     return true;
    });
  }
  componentDidMount(){
    this.interval = setInterval(() => {
        this.getData();
    }, 5000);

    BackHandler.addEventListener('hardwareBackPress', () => {
     handleBackButton();
     return true;
    });
  }
  componentWillUnmount () {
    //to save memory we've to clear interval
    this.interval && clearInterval(this.interval);
    this.interval = false;
  }

  // shouldComponentUpdate() {
  //   this.getData();
  //   return false;
  // }

  render () {
    let AnsCount=0;
    let UnAnsCount=0;
    let reviewCount=0;
    const hintImgWidth=Dimensions.get('window').width-90;
    const propName=this.props.name;
    this.state.questionsReview.map((value,index)=>{
      value.status=="ANSWERED"?
        AnsCount++
      :
      value.status=="UNANSWERED"?
        UnAnsCount++
      :
      value.status=="MARKED_FOR_REVIEW"?
        reviewCount++
      :null
    })

    objAns= this.state.questionsReview.map((value,index)=>{
      const regex = /(<([^>]+)>|&nbsp;)/ig;
      let recValue=(value.questionText)+'';
      let recStatus=(value.status)+'';
      const questionTrim = recValue.replace(regex, ' ');
      return(
        this.props.name=="ANSWERED"?
            (recStatus=="ANSWERED"?
                <View key={index.toString()} style={[styles.examBox, styles.flexcol]}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("SecondExam",{qpid:this.props.navigation.state.params.qpid,qindex:value.questionIndex,examPage:"fromReview",eid:this.props.navigation.state.params.eid,getData:this.handleButtonClick.bind(this)})} style={[styles.flexrow]}>
                  <Text style={[styles.topTitle]}>Q{value.questionIndex+1}</Text>
                  <Text style={[styles.lightFont, styles.blackFont]} >{questionTrim}</Text>
                </TouchableOpacity>
                {
                  value.hint!=null?
                    <Text style={[styles.lightFont]}>hint(s):{this.state.hint}</Text>
                  :null
                }
                {
                  value.imageFilePath!=null?
                    <Image
                      resizeMode="contain"
                      source={{uri: ''+value.imageFilePath+''}}
                      style={{flex:1, width: hintImgWidth, height: hintImgWidth}}
                    />
                  :null
                }
              </View>
            :null)
         :
         this.props.name=="UNANSWERED"?
             (recStatus=="UNANSWERED"?
               <View key={index.toString()} style={[styles.examBox, styles.flexcol]}>
                   <TouchableOpacity onPress={() => this.props.navigation.navigate("SecondExam",{qpid:this.props.navigation.state.params.qpid,qindex:value.questionIndex,examPage:"fromReview",eid:this.props.navigation.state.params.eid,getData:this.getData.bind(this)})} style={[styles.flexrow]}>
                     <Text style={[styles.topTitle]}>Q{value.questionIndex+1}</Text>
                     <Text style={[styles.lightFont, styles.blackFont]} >{questionTrim}</Text>
                    </TouchableOpacity>
                 {
                  value.hint!=null?
                    <Text style={[styles.lightFont]}>hint(s):{this.state.hint}</Text>
                  :null
                 }
                 {
                  value.imageFilePath!=null?
                    <Image
                      resizeMode="contain"
                      source={{uri: ''+value.imageFilePath+''}}
                      style={{flex:1, width: hintImgWidth, height: hintImgWidth}}
                    />
                  :null
                 }
                </View>
            :null)
        :
        this.props.name=="MARKED_FOR_REVIEW"?
            (recStatus=="MARKED_FOR_REVIEW"?
              <View key={index.toString()} style={[styles.examBox, styles.flexcol]}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate("SecondExam",{qpid:this.props.navigation.state.params.qpid,qindex:value.questionIndex,examPage:"fromReview",eid:this.props.navigation.state.params.eid,getData:this.getData.bind(this)})} style={[styles.flexrow]}>
                  <Text style={[styles.topTitle]}>Q{value.questionIndex+1}</Text>
                  <Text style={[styles.lightFont, styles.blackFont]} >{questionTrim}</Text>
                  </TouchableOpacity>
                {
                 value.hint!=null?
                    <Text style={[styles.lightFont]}>hint(s):{this.state.hint}</Text>
                 :null
               }
               {
                 value.imageFilePath!=null?
                   <Image
                     resizeMode="contain"
                     source={{uri: ''+value.imageFilePath+''}}
                     style={{flex:1, width: hintImgWidth, height: hintImgWidth}}
                   />
                  :null
               }
              </View>
            :null)
        :null
      )
    });

    return (
      <View>
          <View>
            {
              this.props.name=="ANSWERED"?
                <View style={[styles.examBox, styles.flexcol, styles.green]}>
                  <Text style={[styles.whiteFont,styles.boldFont]}>Answered:{AnsCount}</Text>
                </View>
              :
              this.props.name=="UNANSWERED"?
                <View style={[styles.examBox, styles.flexcol, styles.red]}>
                  <Text style={[styles.whiteFont,styles.boldFont]}>Not Answered:{UnAnsCount}</Text>
                </View>
              :
                this.props.name=="MARKED_FOR_REVIEW"?
                <View style={[styles.examBox, styles.flexcol, styles.lightBlue]}>
                  <Text style={[styles.whiteFont,styles.boldFont]}>Marked for review:{reviewCount}</Text>
                </View>
              :null
            }
            {objAns}
          </View>
      </View>
    );
  }
}

class Clock extends Component {
  constructor() {
    super();
    this.state = {
      rmMin:0,
      rmSec:0,
      minus:1,
    }
  }
  //for the timmer
  mixins: [TimerMixin];
  componentWillMount(){
    this.setState({
      rmMin:this.props.rmMin,
      rmSec:this.props.rmSec,
    })
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
        this.props.navigation.navigate("Review",{qpid:this.state.qpid,eid:this.props.navigation.state.params.eid});
      }
    }, 1000);
  }
  componentWillUnmount () {
    //to save memory we've to clear interval
    this.interval && clearInterval(this.interval);
    this.interval = false;
  }
  render () {
    let img_timmer=require('../Assets/images/timmer.png');
    return (
      <View style={[styles.timmingBox,styles.flexrow,styles.lightBlue]}>
        <Image style={[styles.timmer]} source={img_timmer}/>
        <View style={{padding: 10}}>
          <Text style={[styles.heavyFont,styles.boldFont, styles.whiteFont]} >{this.state.rmMin} mins {this.state.rmSec}</Text>
        </View>
      </View>
    );
  }
}

class Answered extends Component {
  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
     handleBackButton();
     return true;
    });
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
     handleBackButton();
     return true;
    });
  }
  render () {
    return (
      <View style={{ flex: 1 }} key="answered">
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 4}}>
          <View>
            <Clock navigation={this.props.navigation} rmMin={this.props.navigation.state.params.rmMin} rmSec={this.props.navigation.state.params.rmSec}/>
            <Exam name="ANSWERED" navigation={this.props.navigation} eid={this.props.navigation.state.params.eid} qpid={this.props.navigation.state.params.qpid}/>
          </View>
        </ScrollView>
        <TouchableOpacity style={[styles.submitButton,styles.flexrow]}>
          <Text style={[styles.whiteFont]}>Submit Exam </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class NotAnswered extends Component {
  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
     handleBackButton();
     return true;
    });
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
     handleBackButton();
     return true;
    });
  }
  render () {
    return (
      <View style={{ flex: 1 }} key="notanswered">
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 4}}>
          <View>
            <Clock navigation={this.props.navigation} rmMin={this.props.navigation.state.params.rmMin} rmSec={this.props.navigation.state.params.rmSec}/>
            <Exam name="UNANSWERED" navigation={this.props.navigation} eid={this.props.navigation.state.params.eid} qpid={this.props.navigation.state.params.qpid}/>
          </View>
        </ScrollView>
          <TouchableOpacity style={[styles.submitButton,styles.flexrow]}>
            <Text style={[styles.whiteFont]}>Submit Exam</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

class MarkedForReview extends Component {
  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
     handleBackButton();
     return true;
    });
  }
  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', () => {
     handleBackButton();
     return true;
    });
  }
  render () {
    return (
      <View style={{ flex: 1 }} key="markedforreview">
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 4}}>
          <View>
            <Clock navigation={this.props.navigation} rmMin={this.props.navigation.state.params.rmMin} rmSec={this.props.navigation.state.params.rmSec}/>
            <Exam name="MARKED_FOR_REVIEW" navigation={this.props.navigation} eid={this.props.navigation.state.params.eid} qpid={this.props.navigation.state.params.qpid}/>
          </View>
        </ScrollView>
          <TouchableOpacity style={[styles.submitButton,styles.flexrow]}>
            <Text style={[styles.whiteFont]}>Submit Exam</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

export default createMaterialTopTabNavigator(
  {
    'Answered': Answered,
    'Not Answered': NotAnswered,
    'Review': MarkedForReview,
  },
  {

    initialRouteName: 'Answered',
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,

    tabBarOptions: {
      showIcon: true ,
      activeTintColor: '#ffffff',
      inactiveTintColor: '#dff6f6',
      upperCaseLabel:false,
      allowFontScaling:false,
      tabStyle: {
        height: 50,
      },
      style: {
        backgroundColor:'#ffffff',
        height: 50,
      },
      labelStyle:{
        margin:0,
        fontSize:16,
        color:'#5E3F8C',
      },
      indicatorStyle:{
        backgroundColor:'#956FCE',
        height:3,
      }
     }
  }
);
