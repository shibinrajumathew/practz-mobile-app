/* Login page for practz no sign up 
*  Author: shibin
*/
import React, { Component } from 'react';
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

export default class Login extends Component {
  constructor(){
    super();
    this.state={
      emailid:'',
      pass:'',
    }
  }

  static navigationOptions = {
    title:'Please Login',
    headerStyle:{
    display:'none',},
    headerTitleStyle: {
    fontWeight:'bold',
    display:'none',
  },

  };


checkUser(){
  console.log("onCheck user:");
  fetch('https://ideal.dev.practz.com/practz/login', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain,',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "username" :"orgadmin1@mozanta.com",
    "password":"practz",
    "appId":"ILEARN",
    "domainName":"ideal.dev.practz.com"
  })
})
  .then(response =>  response.json())
  .then(responseobj => {
    this.setState({

    });
    console.log("return----login status:",responseobj.success);


    // this.props.navigation.navigate(this.reDirect());
  })
  .catch((error) => {
      console.error(error);
    });
}

//redirect function for future need
//reDirect(){
//  //body to reDirect
//}

componentDidMount() {
  //internet connection check
  NetInfo.isConnected.fetch().then(isConnected => {
  console.log('First, is ' + (isConnected ? 'online' : 'offline'));
  if ( isConnected )
  {
        this.setState({btn: false})
  }
  else
  {
    Alert.alert("Net info alert","Please connnect to internet for further app use");

  }
});


//Get session for future use do not rewrite
// AsyncStorage.multiGet(['user', 'role_no']).then((data) => {
//     let user = data[0][1];
//
//     let role_no = data[1][1];
// //navigate('Admin')
//     if (role_no !== null)
//     {
//       this.setState({xtest:data[1][1]});
//       this.props.navigation.navigate(this.reDirect());
//
//
//     }
//
// });

}

  render() {


      const { navigate } = this.props.navigation;
    return (
      <ScrollView behavior="padding"  style={styles.container}>
        <View style={styles.logoContainer}>
        <Image source={require('./img/logo2.png')}
        style={styles.img}
      />
      <Text style={{
            color: 'white',
            fontSize:12,
          }}>digitalising education
        </Text>
      </View>
      <View style={styles.tabForm}>
        <View style={styles.selectedInnerTabForm}>
          <Text style={{
              color: '#8bc34a',
              fontWeight: '500',
              fontSize:12,
            }}>Sign in
          </Text>
        </View>
        <View style={styles.innerTabForm}>
          <Text style={{
              color: 'white',
              fontWeight: '500',
              fontSize:12,
            }}>Sign Up
          </Text>
        </View>
      </View>
      <View style={styles.myForm}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          onChangeText={(text) => this.setState({emailid:text})}
          placeholder="Email ID"
        />
        <TextInput
          underlineColorAndroid="transparent"
          style={styles.input}
          onChangeText={(text) => this.setState({pass:text})}
          placeholder="Password"
        />

        <TouchableOpacity
          onPress={() => this.checkUser()}
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
  </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36076b',
  },
 img:{
   width: (Dimensions.get('window').width/2),
   height: (Dimensions.get('window').height)/6,
   resizeMode: 'contain',

 },
  logoContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20,
  },
  tabForm: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20,
    marginLeft: 8,
    flexDirection: 'row',
  },
  innerTabForm: {
    width: Dimensions.get('window').width/2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20,
    marginLeft: 5,
    paddingBottom:15,
    flexDirection: 'row',
  },
  selectedInnerTabForm: {
    width: Dimensions.get('window').width/3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20,
    marginLeft: 5,
    paddingBottom:15,
    flexDirection: 'row',
    borderColor:'#8bc34a',
    borderBottomWidth: 5,
  },
  myForm: {
      flex:1.5,
      marginTop:20,
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
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  buttonContainer:{
    backgroundColor: '#be36e7',
    paddingVertical: 25,

  },
  buttonText:{
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',

  }
});
