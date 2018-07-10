/* @flow */

import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Image,
  TextInput,
  AsyncStorage,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';


export default class Login extends Component {
  constructor() {
    //inherit parent props
    super();
    //create dynamic variables
    this.state = {
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
    this.timeoutHandle = setTimeout(() => {
      AsyncStorage.multiGet(['authority']).then((data) => {
        let user = data[0][1];
        if (user !== null) {
          this.props.navigation.navigate('Dash');
        } else {
          this.props.navigation.navigate('Login');
        }

      });


    }, 50);
  }


  componentWillUnmount() {

    clearTimeout(this.timeoutHandle);
  }
  render() {


    const { navigate } = this.props.navigation;
    return (
      <View style={styles.logoContainer}>
        {}
        <Image source={require('./Assests/images/download.png')}
          style={styles.img}
        />

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5e3f8c',
  },
  img: {
    width: (Dimensions.get('window').width),
    height: (Dimensions.get('window').height),

  },
  logoContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
