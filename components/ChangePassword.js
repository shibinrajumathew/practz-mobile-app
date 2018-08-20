import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import URL from './Url';
import styles from './Assets/Style';
export default class ChangePassword extends Component {
  constructor(props){
    super(props)
    classthis=this;
    this.state={
      HOME:URL.HOME,
      CHANGE_PASSWORD:URL.CHANGE_PASSWORD,
      password:"",
      pass:"",
      newPass:"",
      ConfirmPass:""
    }
  }
  changePassword(){
    if(this.state.newPass==this.state.ConfirmPass) {
      fetch(this.state.HOME+this.state.CHANGE_PASSWORD, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain,',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, reload'
      },
        body: JSON.stringify({
        "currentPassword":this.state.pass,
        "newPassword":this.state.newPass,
        "id":this.state.userId
        })
      })
      .then(response => response.json())
      .then(response=> {
        if ((response.data)==true){
          Alert.alert("update sucessfull");
        }else{
          Alert.alert("incorrect password")
        }
    });

  }else {
      Alert.alert("password does not match")
    }
  }
  componentWillMount() {
    AsyncStorage.multiGet(['userId']).then((data) => {
      let user = data[0][1];
      classthis.setState({
        userId:user,
      });
  console.log("userid",this.state.userId);
    });
  }
  static navigationOptions = ({ navigation  }) => {
    const {state} = navigation;
    return {title:" Change Password",
    headerTitleStyle:{
      color:'#5e3f8c',
      textAlign: 'center',
    },
    };
  }
  render(){
    return(
      <ScrollView style={[styles.white]}>
        <Text style={{marginTop:15}}/>
        <TextInput
          style={styles.blackFont,styles.margins}
          placeholder="current password"
          onChangeText={(text) => this.setState({pass:text})}
        />
        <Text style={[]}></Text>
        <TextInput
          style={styles.blackFont,styles.margins}
          placeholder="new password"
          onChangeText={(text) => this.setState({newPass:text})}
        />
        <Text style={[]}></Text>
        <TextInput
          style={styles.blackFont,styles.margins}
          placeholder="confirm password"
          onChangeText={(text) => this.setState({ConfirmPass:text})}
        />
        <Text style={[]}></Text>
          <Text style={[styles.margins]}></Text>
          <TouchableOpacity style={[styles.violet,styles.submitButton,{marginBottom:20,marginRight:20}]} onPress={() => this.changePassword()}>
            <Text style={{ fontWeight: '500' ,fontSize:20,  alignSelf: 'center',color:'white'}}>Change Password</Text>
          </TouchableOpacity>
      </ScrollView>
    )
  }
}
