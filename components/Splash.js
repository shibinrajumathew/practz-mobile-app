/* @flow */
import {  StackActions, NavigationActions } from 'react-navigation';
import {noBack,sessionDestroy} from './Functions';
import styles from './Assets/Style';
import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  TextInput,
  AsyncStorage,
  StyleSheet,
  Dimensions,
  NetInfo,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import URL from './Url';


export default class Login extends Component {
  constructor() {
    //inherit parent props
    super();
    //create dynamic variables
    this.state = {
      home:URL.HOME,
      api_user:URL.USER,
    }
  }

  static navigationOptions = {
    title: 'Please Login',
    headerStyle: {
      display: 'none',
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      display: 'none',
    },
  };

  componentDidMount() {
    //internet connection check
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.setState({ btn: false })
      }else {
        Alert.alert("Net info alert", "Please connnect to internet for further app use");
      }
    });

    this.timeoutHandle = setTimeout(() => {
      AsyncStorage.multiGet(['UserType','userId']).then((data) => {
        let user = data[0][1];
        let UserId = data[1][1];
        if (user !== null) {
          fetch(this.state.home+this.state.api_user+UserId)
            .then(responseUsr => responseUsr.json())
            .then(responseUsr=> {
              if(responseUsr==401){
                sessionDestroy();
                noBack(this.props,'Login');
              }else{
                //redirect to Dash & donot show splash screen again on back
                noBack(this.props,'Dash');
              }
            })
        }else {
            noBack(this.props,'Login');
            this.props.navigation.navigate('Login');
          }
      });
    }, 3000);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.Splash_logoContainer}>
        <Image source={require('./Assets/images/download.png')}
          style={styles.Splash_img}
        />
      </View>
    );
  }
}
