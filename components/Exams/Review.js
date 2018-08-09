/* @flow */
import React, { Component } from 'react';
import styles from '../Assets/Style';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation';
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
import URL from './../Url';

class Exam extends Component {
  constructor() {
    super();
    let API;
    let questionNo;
    let totalQNo;
    this.state = {
      HOME:URL.HOME,
      REVIEW_EXAM:URL.REVIEW_EXAM,
      questionsReview:[
            "Holi",
            "Vishu",
            "Ugadi",
            "Vishuva Sankranti"
        ]
    }
  }

  // componentWillMount(){
  //   AsyncStorage.multiGet(['organizationId','userId']).then((data) => {
  //     API=this.state.HOME+this.state.REVIEW_EXAM+data[1][1]+'?orgid='+data[0][1]+'&qpid='+this.props.qpid;
  //     fetch(API,{
  //       headers: {
  //               'Accept': 'application/json, text/plain,',
  //               'Content-Type': 'application/json',
  //               'Cache-Control': 'no-cache'
  //             }
  //           })
  //     .then(response =>  response.json())
  //     .then(responseobj => {
  //       this.setState({
  //         questionsReview:[
  //             { 'a': 'z','b':'x' },
  //             { 'c': 'r','d':'s' },
  //         ]
  //       });
  //       console.log(responseobj.data);
  //     })
  //   })
  // }

  render () {
    console.log("qrevie:",this.state.questionsReview);

    objAns= this.state.questionsReview.map((exam,index) =>{
      return(
        <View>
            <Text> {exam.toString()}</Text>
        </View>
      );
    });
//     objQR= this.state.questionsReview.map((exam,index) =>{
//       return(
//         <View>
//           <Text>{exam.toString()}</Text>
//       {/* {
//         this.props.name=="ANSWERED"?
//           <View>
//             <View style={[styles.examBox, styles.flexcol, styles.green]}>
//               <Text style={[styles.whiteFont,styles.boldFont]}>Answered:5</Text>
//             </View>
//             <View style={[styles.examBox, styles.flexcol]}>
//               <TouchableOpacity onPress={() => this.props.navigation.navigate("StartExam",{qpid:this.props.qpid,qindex:this.state.qindex,examPage:"Review",eid:this.props.eid})} style={[styles.flexrow]}>
//                 <Text style={[styles.topTitle]}>Q12{this.props.eid}</Text>
//                 <Text style={[styles.lightFont, styles.blackFont]} >{exam.questionText}</Text>
//               </TouchableOpacity>
//               {
//                 this.state.hint!=null?
//                 <Text style={[styles.lightFont]}>hint(s):{this.state.hint}</Text>
//                 :
//                 <Text></Text>
//               }
//               {
//                 this.state.imageFilePath!=null?
//                 <Image
//                   resizeMode="contain"
//                   source={{uri: ''+this.state.imageFilePath+''}}
//                   style={{flex:1, width: Dimensions.get('window').width-90, height: Dimensions.get('window').width-90}}
//                 />
//                 :
//                 <Text>ff</Text>
//               }
//             </View>
//           </View>
//         :
//         <View style={[styles.examBox, styles.flexcol, styles.red]}>
//           <Text style={[styles.whiteFont,styles.boldFont]}>Not Answered:5</Text>
//         </View>
//       } */}
//   </View> )
// });
    return (
      <View>
      {objAns}
      </View>
    );
  }
}

class Clock extends Component {
  render () {
    let img=require('../Assets/images/tick.png');
    let img_timmer=require('../Assets/images/timmer.png');
    return (
          <View style={[styles.timmingBox,styles.flexrow,styles.lightBlue]}>
            <Image style={[styles.timmer]} source={img_timmer}/>
            <View style={{padding: 10}}>
              <Text style={[styles.heavyFont,styles.boldFont, styles.whiteFont]} >{this.props.Min} mins {this.props.Sec}</Text>
            </View>
          </View>
    );
  }
}

class Answered extends Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 4}}>
          <View>
            <Clock Min={15} Sec={30}/>
            <Exam name="ANSWERED" eid={this.props.navigation.state.params.eid} qpid={this.props.navigation.state.params.qpid}/>
          </View>
        </ScrollView>
          <TouchableOpacity style={[styles.submitButton,styles.flexrow]}><Text style={[styles.whiteFont]}>Submit Exam </Text></TouchableOpacity>
        </View>
    );
  }
}

class NotAnswered extends Component {
  render () {

    return (
      <View style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 4}}>
          <View>
            <Clock Min={25} Sec={30}/>
            <Exam name="UNANSWERED" eid={this.props.navigation.state.params.eid} qpid={this.props.navigation.state.params.qpid}/>
          </View>
        </ScrollView>
          <TouchableOpacity style={[styles.submitButton,styles.flexrow]}><Text style={[styles.whiteFont]}>Submit Exam</Text></TouchableOpacity>
      </View>
    );
  }
}





export default createMaterialTopTabNavigator(
  {
    'Answered': Answered,
    'Not Answered': NotAnswered,
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
