import React, { Component } from 'react';
import Icon from 'react-native-ionicons';
import {
  Platform,StyleSheet,Text,View,Image,Button,KeyboardAvoidingView,Dimensions
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Splash from './components/Splash';
import Login from './components/Login';
import Dash from './components/Home';


export const SimpleApp = StackNavigator({

  Home: { screen: Splash },
  Login:{ screen: Login},
  Dash:{ screen: Dash,
    navigationOptions: {
      headerLeft:null,
      headerRight:(
        <View style={{flex: 1, flexDirection: 'row'}}><Icon name={'ios-search'} style={{marginRight: 20,color:'#5e3f8c',}} />
      <Icon name={'ios-notifications'} style={{marginRight: 20,color:'#5e3f8c',}} /></View>),
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
