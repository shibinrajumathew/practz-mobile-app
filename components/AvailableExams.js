import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
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
      eid:"",
      eprod:"",
      qname:"",
      checkFlag:0,
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
    AsyncStorage.multiGet(['userId']).then((data) => {
      let user = data[0][1];
      classthis.setState({
        userId:user,
        checkFlag:this.props.navigation.state.params.checkFlag,
        
      });
      console.log("response data",this.state.HOME+this.state.AVAILABLE_EXAMS+data[0][1]);
      fetch(this.state.HOME+this.state.AVAILABLE_EXAMS+data[0][1])
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          availableExamList:responseJson.data
        });
      });
    });
  }
  static navigationOptions = {
    title: "All Available Exams",
    headerTitleStyle:{
      color:'#5e3f8c',
      textAlign: 'center',
    },
  };
  render() {
    var examList = this.state.availableExamList.map((exam)=>{
      return (<View key={(exam, index) => index.toString()} >
        {(this.state.checkFlag==0 || this.state.checkFlag==1)?
          <TouchableOpacity style={[styles.announcementBox]}
            disable={true} >
            <View style={[styles.flexrow]}>
              <View style={{flex: 2}} >
                <Text style={[styles.title,styles.margins]}>{exam.attributes.questionPaperName}</Text>
              </View>
              <View style={[styles.sideBotton, styles.brightBlue]} >
                <Text style={[styles.bookFont,styles.whiteFont]} >Science & Tech </Text>
              </View>
            </View>
            <Text style={[stylish.myview]}>Staff Board Exam </Text>
            <Text style={[stylish.myview]}>No of Question <Text style={[styles.count]}> {exam.totalExamMarks}  </Text><Text style={[stylish.myview]}>        Time Allocated<Text style={[styles.count]}>  {exam.duration} </Text></Text></Text>
            <Text style={[stylish.container]}>End on {exam.expiryDate}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity style={[styles.announcementBox]}
            onPress={() => this.props.navigation.navigate('ExamDetails',{eid:exam.id,eprod:exam.examProductName,qname:exam.attributes.questionPaperName})} >
            <View style={[styles.flexrow]}>
              <View style={{flex: 2}} >
                <Text style={[styles.title,styles.margins]}>{exam.attributes.questionPaperName}</Text>
              </View>
              <View style={[styles.sideBotton, styles.brightBlue]} >
                <Text style={[styles.bookFont,styles.whiteFont]} >Science & Tech </Text>
              </View>
            </View>
            <Text style={[stylish.myview]}>Staff Board Exam </Text>
            <Text style={[stylish.myview]}>No of Question <Text style={[styles.count]}> {exam.totalExamMarks}  </Text><Text style={[stylish.myview]}>        Time Allocated<Text style={[styles.count]}>  {exam.duration} </Text></Text></Text>
            <Text style={[stylish.container]}>End on {exam.expiryDate}</Text>
          </TouchableOpacity>
        }

      </View>);
    })
    return (
      <ScrollView style={{backgroundColor:'#FFFFFF',}}>
        <Text style={{fontSize:15,color:'#000000',marginLeft:50,marginTop:15,marginBottom:10}}>Available Exams</Text>
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
    marginTop:7,
    marginBottom:10
  }
});
