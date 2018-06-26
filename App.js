import React, { Component } from 'react';
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
  Dash:{ screen: Dash},


});
export default class App extends Component<{}> {
  render() {
    return (
      <SimpleApp />

    );
  }
}
