/* @flow */

import React, { Component } from 'react';
import styles from './Assets/Style';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  BackHandler,
  Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import URL from './Url';

export class LandingPage extends Component {
  constructor(){
    super();
    // const { navigate } = this.props.navigation;
    classthis=this;
  this.state={
    HOME:URL.HOME,
    AVAILABLE_EXAM:URL.AVAILABLE_EXAM,
    status:'',
    view:'',
    eid:0,
    eprod:'',
    qname:'',
    exp:'',
    checkFlag:0,
    availableExamList:[
      {
          "questionPaperName": "",
          "examProductName": "",
          "expiryDate": "",
          attributes:{
            questionPaperName:""
          }
      }
  ]
  }
  }

    componentWillMount() {
      console.log("inside landing will mount");
      AsyncStorage.multiGet(['userId']).then((data) => {
      fetch(this.state.HOME+this.state.AVAILABLE_EXAM+'userId='+data[0][1]+'')
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
          availableExamList:[
            {
                "questionPaperName": "",
                "examProductName": "",
                "expiryDate": "",
                "attributes": {
                "questionPaperName": "",
                "examPublisherName": "",
                "qpSections": [],
                "republishStatus": ''
           },
            }
        ],
        eid:0,
        eprod:'',
        qname:'',
        exp:'',
        });
      }else{
        this.setState({
          checkFlag:2,
          status:'Available exams',
          view:'View all',
          availableExamList:responseobj.data,
        });
      }
      });


  });
}
componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
}



handleBackButton() {
    return BackHandler.exitApp();
}
  render() {
    {
    this.state.checkFlag==1||this.state.checkFlag==0
    ? examList = this.state.availableExamList.map((exam) => {
     return(<View key={(exam, index) => index.toString()} ></View>);
   })
    :
    examList = this.state.availableExamList.map((exam) => {
     return(
       <View key={(exam, index) => index.toString()} >
         <TouchableOpacity style={[styles.announcementBox, styles.flexrow]}
           onPress={() => this.props.navigation.navigate('ExamDetails',{eid:exam.id,eprod:exam.examProductName,qname:exam.attributes.questionPaperName,exp:exam.expiryDate})} >
           <View style={[styles.flexcol, styles.innerTextBox]} >
             <Text style={[styles.topTitle]}>{exam.attributes.questionPaperName}</Text>
             <Text style={[styles.lightFont]} >{exam.examProductName}</Text>
             <View style={[styles.flexrow]}>
               <Text style={[styles.totalWidth]}>Ends on {exam.expiryDate}</Text>
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

      <View>
        <View style={styles.flexrow}>
          <View style={[styles.topBox, styles.blue]}>
            <Text style={{ color: '#ffffff' }}>practice realtime at your convenience!</Text>
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Nurse Model Exams</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>	&#8377;</Text>
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}> 350</Text>

              <Text style={{ color: '#ffffff', marginLeft: 50, }}> 10 Q&A</Text>
            </View>
          </View>
          <View style={[styles.topBox, styles.red]}>
            <Text style={{ color: '#ffffff' }}>practice realtime at your convenience!</Text>
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Nurse Model Exams</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>	&#8377;</Text>
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}> 350</Text>
              <Text style={{ color: '#ffffff', marginLeft: 50, }}> 10 Q&A</Text>
            </View>
          </View>
        </View>

        <View style={[styles.announcementBox, styles.flexrow]}>
          <View >
            <Image style={{ marginTop: 10 }} source={require('./Assets/images/announcements.png')}
            />
          </View>
          <View style={[styles.flexcol, styles.innerTextBox]} >
            <Text style={[styles.heavyFont,styles.boldFont,styles.blackFont]}>Take a free test</Text>
            <Text style={[styles.lightFont]} >Lorem ipsum dolor sit amet, consectetur adipisci</Text>
            <View style={[styles.flexrow]}>
              <Text style={[styles.endFont]}>TRY NOW</Text>
            </View>
          </View>
        </View>
        <View style={[styles.flexrow, styles.availableBox]}>
          <Text style={{ fontWeight: 'bold', color: '#000', flex: 3 }}>{this.state.status}</Text>
          <Text style={{ color: '#676262', flex: 1, }}>{this.state.view}</Text>
        </View>

        {examList}

      </View>

    );
  }
}
