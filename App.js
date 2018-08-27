import React, { Component } from 'react';
import IconBadge from 'react-native-icon-badge';
import Icon from 'react-native-ionicons';
import {Text,View,Image} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Splash from './components/Splash';
import Login from './components/Login';
import Dash from './components/Home';
import AccountSetting from './components/AccountSetting';
import HistoricPattern from './components/HistoricPattern';
import MyOrders from './components/MyOrders';
import AvailableExams from './components/AvailableExams';
import InvoicePage from './components/InvoicePage';
import ChangePassword from './components/ChangePassword';
import ExamDetails from './components/Exams/ExamDetails';
import StartExam from './components/Exams/StartExam';
import SecondExam from './components/Exams/SecondExam';
import ReviewPage from './components/Exams/ReviewPage';

//author hari import starts here
import NoteDetails from './components/NoteDetails';
import AttemptedExamDetails from './components/AttemptedExamDetails';
export const Practz = createStackNavigator({
//author shibin navigation starts here
  Home: { screen: Splash },
  Login:{ screen: Login},
  AccountSetting:{ screen: AccountSetting},
  HistoricPattern:{ screen: HistoricPattern},
  MyOrders:{ screen: MyOrders},
  ChangePassword:{ screen: ChangePassword},
  StartExam:{ screen: StartExam},
  SecondExam:{ screen: SecondExam},
  ReviewPage:{
    screen: ReviewPage,
    navigationOptions: {
      headerLeft:null,
      title: 'Review Exam',
      headerTitleStyle:{
        color:'#5e3f8c',
        textAlign: 'center',
        flex:1,
      },
    },
  },
  ExamDetails:{ screen: ExamDetails},
  AvailableExams:{ screen: AvailableExams},
  Dash:{ screen: Dash,
    navigationOptions: {
      headerLeft:null,
      //for notification & search
      // headerRight:(
      // <View style={{flex: 1, flexDirection: 'row'}}><Icon name={'ios-search'} style={{marginRight: 20,color:'#5e3f8c',}} />
      // <IconBadge
      //   MainElement={<Icon name={'ios-notifications'} style={{width:30,height:30,marginRight:20,color:'#5e3f8c',}} />}
      //   BadgeElement={<Text style={{color:'#FFFFFF',fontSize: 12}}>5</Text>}
      //   IconBadgeStyle={{width:18,height:18,marginBottom:10,borderWidth:1,marginRight:20,borderColor:'white',backgroundColor: '#F44336'}}
      //   // Hidden={this.state.BadgeCount==0}
      //  />
      // </View>),
      title: 'Practz',
      headerTitleStyle:{
        color:'#5e3f8c',
        textAlign: 'center',
        flex:1,
      },
    },
  },
  //author hari navigation starts here
  NoteDetails:{ screen:NoteDetails},
  AttemptedExamDetails:{ screen: AttemptedExamDetails},
  InvoicePage:{ screen: InvoicePage},
});

//nothing to change
export default class App extends Component<{}> {
  render() {
    return (
      <Practz />
    );
  }
}
