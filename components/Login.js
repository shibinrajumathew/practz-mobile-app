/* Login page for practz no sign up
*  Author: shibin
*/
import React, { Component } from 'react';
import {noBack,handleBackButton} from './Functions';
import styles from './Assets/Style';
import URL from './Url';
import {
  View,
  ScrollView,
  Image,
  TextInput,
  Picker,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  NetInfo,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import Load from "react-native-loading-gif";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      home:URL.HOME,
      api_authentication:URL.AUTHENTICATION,
      api_user:URL.USER,
      emailid: '',
      pass: '',
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

  isAuthenticated() {
    //start gif load
    this.refs.Load.OpenLoad();
    //authentication
    fetch(this.state.home+'/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain,',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "username": this.state.emailid,
        "password": this.state.pass,
        "appId": "ILEARN",
        "domainName": "demo.practz.com"
        })
      })
      .then(response => response.json())
      .then(response=> {
        //close gif
        //fetch orgnization details
        if(response.success){
          fetch(this.state.home+this.state.api_authentication)
            .then(responseAu => responseAu.json())
            .then(responseAu=> {
              //fetch user details
              fetch(this.state.home+this.state.api_user+response.data.principal.userId)
                .then(responseUsr => responseUsr.json())
                .then(responseUsr=> {
                  //set session
                  AsyncStorage.multiSet([
                    ["userId",response.data.principal.userId],
                    ["organizationId",response.data.principal.organizationId],
                    ["parentOrganizationId",response.data.principal.parentOrganizationId],
                    ["organizationEmail",responseAu.data.organizationEmail],
                    ["organizationDisplayName",responseAu.data.organizationDisplayName],
                    ["UserType",responseUsr.data.type],
                    ["authority", response.data.accessRights],
                    ["liveTemplate",responseAu.data.liveTemplate],
                    ["logourl",responseAu.data.logoUrl],
                    ["appId",responseUsr.data.appId],
                    ["password",this.state.pass,],
                    ["username",this.state.emailid],
                    ["name",responseUsr.data.name],
                  ]);
            this.refs.Load.CloseLoad();
            noBack(this.props,'Dash');
            });
            });
        }else{
          Alert.alert("Wrong username or password");
          this.refs.Load.CloseLoad();
          }
      }).catch((error) => {console.error(error);});
  }

  componentDidMount() {
    //internet connection check
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.setState({ btn: false })
      }else {
        Alert.alert("Net info alert", "Please connnect to internet for further app use");
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView behavior="padding" style={styles.Login_container}>
        <View style={styles.logoContainer}>
          <Image source={require('./Assets/images/logo2.png')}
            style={styles.Login_img}
          />
          <Text style={{
            color: 'white',
            fontSize: 12,
          }}>digitalising education
        </Text>
        </View>
        <View style={styles.tabForm}>
          <View style={styles.selectedInnerTabForm}>
            <Text style={[styles.Login_signIn]}>Sign in</Text>
          </View>
        </View>
        <View style={styles.Login_form}>
          <TextInput
            style={styles.Login_input}
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({ emailid: text })}
            placeholder="Email ID"
          />
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.Login_input}
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ pass: text })}
            placeholder="Password"
          />
          <TouchableOpacity
            onPress={() => this.isAuthenticated()}
            title="Home" style={styles.Login_buttonContainer}
            >
            <Text style={styles.Login_buttonText}>Let me in</Text>
          </TouchableOpacity>
          <View style={[styles.Login_forgotPass]}>
            <Text style={[styles.whiteFont]}  >Forgot password ?</Text>
          </View>
        </View>
        <Load ref="Load"></Load>
      </ScrollView>
    );
  }
}
