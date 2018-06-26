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
  constructor(){
    //inherit parent props
    super();
    //create dynamic variables
    this.state={
    }
  }

  static navigationOptions = {
    title:'Please Login',
  //   title: (<Image source={require('./images/pro_logo_ins.png')}
  //
  // /> ),
  headerStyle:{
    display:'none',},
  headerTitleStyle: {
    // marginLeft:'auto',
    // marginRight:'auto',
    fontWeight:'bold',
    display:'none',
  },

  };


componentDidMount() {
  this.timeoutHandle = setTimeout(()=>{
                  this.props.navigation.navigate('Login');
         }, 5000);
}


componentWillUnmount() {

         clearTimeout(this.timeoutHandle);
}
  render() {


      const { navigate } = this.props.navigation;
    return (
        <View style={styles.logoContainer}>
          {}
        <Image source={require('./img/download.png')}
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
 img:{
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
