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
      <KeyboardAvoidingView behavior="padding"  style={styles.container}>
        <View style={styles.logoContainer}>
          {}
        <Image source={require('./img/download.png')}
        style={styles.img}
      />

      </View>





  </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  myForm: {
    flex:1.5,
    marginTop:10,
    padding: 20,
  },
  formTitle:{
    flex:2,
    fontSize: 22,
    textAlign: 'center',
    color: 'black',
  },
  input:{
    height: 60,
    padding: 20,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
  },
  buttonContainer:{
    backgroundColor: '#5c8a8a',
    paddingVertical: 25,

  },
  buttonText:{
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',

  }
});
