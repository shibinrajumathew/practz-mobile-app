/* @flow */
import {  StackActions, NavigationActions } from 'react-navigation';
import {noBack} from './Functions';
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
      AsyncStorage.multiGet(['UserType']).then((data) => {
        let user = data[0][1];
        if (user !== null) {
          //redirect to Dash & donot show splash screen again on back
          noBack(this.props,'Dash');
        } else {
          this.props.navigation.navigate('Login');
        }

      });


    }, 500);
  }


  // componentWillUnmount() {
  //
  //   clearTimeout(this.timeoutHandle);
  // }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.logoContainer}>
        {}
        <Image source={require('./Assets/images/download.png')}
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
    width: (Dimensions.get('screen').width),
    height: (Dimensions.get('screen').height),

  },
  logoContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
