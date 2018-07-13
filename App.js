import React, { Component } from 'react';
import IconBadge from 'react-native-icon-badge';
import Icon from 'react-native-ionicons';
import {
  Platform,StyleSheet,Text,View,Image,Button,KeyboardAvoidingView,Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Splash from './components/Splash';
import Login from './components/Login';
import Dash from './components/Home';
import ExamDetails from './components/Exams/ExamDetails';
import StartExam from './components/Exams/StartExam';
import AvailableExams from './components/UI/AvailableExams';
import NoteDetails from './components/UI/NoteDetails';
import AttemptedExam from './components/UI/AttemptedExam';
import HistoricPattern from './components/UI/HistoricPattern';
export const SimpleApp = StackNavigator({

  Home: { screen: Splash },
  Login:{ screen: Login},
  StartExam:{ screen: StartExam},
  AvailableExams:{ screen:AvailableExams},
  NoteDetails:{ screen:NoteDetails},
  ExamDetails:{ screen: ExamDetails},
  AttemptedExam:{ screen: AttemptedExam},
  HistoricPattern:{ screen: HistoricPattern},
    navigationOptions: {
      title: 'Ca 22',
      headerTitleStyle:{
        color:'#5e3f8c',
        textAlign: 'center',
        flex:1,
      },
    },},
  Dash:{ screen: Dash,
    navigationOptions: {
      headerLeft:null,
      headerRight:(
      <View style={{flex: 1, flexDirection: 'row'}}><Icon name={'ios-search'} style={{marginRight: 20,color:'#5e3f8c',}} />
      <IconBadge
        MainElement={<Icon name={'ios-notifications'} style={{width:30,height:30,marginRight:20,color:'#5e3f8c',}} />}
        BadgeElement={<Text style={{color:'#FFFFFF',fontSize: 12}}>5</Text>}
        IconBadgeStyle={{width:18,height:18,marginBottom:10,borderWidth:1,marginRight:20,borderColor:'white',backgroundColor: '#F44336'}}
        // Hidden={this.state.BadgeCount==0}
       />
      </View>),
      title: 'Confidence',
      headerTitleStyle:{
        color:'#5e3f8c',
        textAlign: 'center',
        flex:1,
      },
    },
  },

});
export default class App extends Component<{}> {
  render() {
    return (
      <SimpleApp />

    );
  }
}
