/* Login page for practz no sign up
*  Author: shibin
*/
import React, { Component } from 'react';
import {noBack} from './Functions';
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
    console.log("onCheck user:");
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
                  console.log("Inside login:");
                  console.log("userId:",response.data.principal.userId);
                  console.log("organizationId:",response.data.principal.parentOrganizationId);
                  console.log("parentOrganizationId:",response.data.principal.organizationId);
                  console.log("organizationEmail:",responseAu.data.organizationEmail);
                  console.log("organizationDisplayName,:",responseAu.data.organizationDisplayName);
                  console.log("UserType:",responseUsr.data.type);
                  console.log("liveTemplate",responseAu.data.liveTemplate);
                  console.log("logourl",responseAu.data.logoUrl);
                  console.log("appId",responseUsr.data.appId);
                  console.log("authority:",response.data.accessRights);
                  console.log("Inside login: end");
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
                    // ["signUpEnabled"],
                    // ["homePageEnabled"],
                    // ["telephone1",responseUsr.data.telephone1],
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
      console.log('First, is ' + (isConnected ? 'online' : 'offline'));
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
      <ScrollView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('./Assets/images/logo2.png')}
            style={styles.img}
          />
          <Text style={{
            color: 'white',
            fontSize: 12,
          }}>digitalising education
        </Text>
        </View>
        <View style={styles.tabForm}>
          <View style={styles.selectedInnerTabForm}>
            <Text style={{
              color: '#8bc34a',
              fontWeight: '500',
              fontSize: 12,
            }}>Sign in
          </Text>
          </View>
          <View style={styles.innerTabForm}>
            <Text style={{
              color: 'white',
              fontWeight: '500',
              fontSize: 12,
            }}>Sign Up
          </Text>
          </View>
        </View>
        <View style={styles.myForm}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            onChangeText={(text) => this.setState({ emailid: text })}
            placeholder="Email ID"
          />
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.input}
            onChangeText={(text) => this.setState({ pass: text })}
            placeholder="Password"
          />
          <TouchableOpacity
            onPress={() => this.isAuthenticated()}
            title="Home" style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}  >Let me in</Text>
          </TouchableOpacity>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
            <Text style={{
              color: 'white',
            }}  >Forgot password ?</Text>
          </View>
        </View>
        <Load ref="Load"></Load>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36076b',
  },
  img: {
    width: (Dimensions.get('window').width / 2),
    height: (Dimensions.get('window').height) / 6,
    resizeMode: 'contain',
  },
  logoContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  tabForm: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 8,
    flexDirection: 'row',
  },
  innerTabForm: {
    width: Dimensions.get('window').width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 5,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  selectedInnerTabForm: {
    width: Dimensions.get('window').width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 5,
    paddingBottom: 15,
    flexDirection: 'row',
    borderColor: '#8bc34a',
    borderBottomWidth: 5,
  },
  myForm: {
    flex: 1.5,
    marginTop: 20,
    padding: 20,
  },
  formTitle: {
    flex: 2,
    fontSize: 22,
    textAlign: 'center',
    color: 'black',
  },
  input: {
    height: 60,
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: '#be36e7',
    paddingVertical: 25,

  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',

  }
});
