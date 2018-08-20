import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  FlatList,
  Button,
  StyleSheet,
  AsyncStorage,
  Alert,
  TextInput
} from 'react-native';
import URL from './Url';
import RadioButton from 'radio-button-react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-ionicons';
import styles from './Assets/Style';
import IconBadge from 'react-native-icon-badge';
import RNMaterialLetterIcon from 'react-native-material-letter-icon';
export default class AccountSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      HOME:URL.HOME,
      ACCOUNT_SETTINGS:URL.ACCOUNT_SETTINGS,
      UPDATE:URL.UPDATE,
      names:"",
      usernames:"",
      dobs:"",
      gender:null,
      telephones1:"",
      addressLines1:"",
      addressLines2:"",
      postCodes:"",
      districts:"",
      state:"",
      country:"",
    }
  }
  handleOnPress(gender){
    this.setState({gender:gender})
  }
  update(){
    fetch(this.state.HOME+this.state.UPDATE, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain,',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, reload'
    },
      body: JSON.stringify({
        "name":this.state.names,
        "addressLine1":this.state.addressLines1,
        "addressLine2":this.state.addressLines2,
        "telephone1":this.state.telephones1,
        "postCode":this.state.postCodes,
        "district":this.state.districts,
        "state":this.state.states,
        "country":this.state.countrys,
        "gender":this.state.gender,
        "dob":this.state.dobs,
        "organizationName":null,
        "designation":null,
        "nickName":null
    })
  })
    .then(response => response.json())
    .then(response=> {
      if (response.messages[0]=="Updated successfully"){
        Alert.alert("update sucessfull");
      }
      else{
        Alert.alert("update unsucessful")
      }
  });
}
  componentWillMount() {
    AsyncStorage.multiGet(['userId']).then((data) => {
      let user = data[0][1];
      classthis.setState({
        userId:user,
      });
      fetch(this.state.HOME+this.state.ACCOUNT_SETTINGS+data[0][1])
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          names:responseJson.data.name,
          usernames:responseJson.data.username,
          dobs:responseJson.data.attributes.dob,
          gender:responseJson.data.attributes.gender,
          telephones1:responseJson.data.addresses[0].telephone1,
          addressLines1:responseJson.data.addresses[0].addressLine1,
          addressLines2:responseJson.data.addresses[0].addressLine2,
          postCodes:responseJson.data.addresses[0].postCode,
          districts:responseJson.data.addresses[0].district,
          states:responseJson.data.addresses[0].state,
          countrys:responseJson.data.addresses[0].country,
            });
        });
    });
  }
  static navigationOptions = ({ navigation  }) => {
    const {state} = navigation;
    return {title:" Account Settings",
    headerTitleStyle:{
      color:'#5e3f8c',
      textAlign: 'center',
    },
    };
  }
  render() {
    return(
      <ScrollView style={[styles.white]}>
        <Text style={[styles.margins,styles.brownFont,{fontSize:20}]}>Personal Details</Text>
        <View style={[styles.pink,{marginTop:10}]}>
          <View style={[styles.flexrow,styles.margins]}>
            <View elevation={2} style={styles.profileView}>
              <RNMaterialLetterIcon
                size={100}
                letterSize={28}
                letter={(this.state.names).charAt(0).toUpperCase()}
                shapeColor={"#FF9800"}
                />
              <Text style={[styles.lightTitle]}>{(this.state.names).charAt(0)}</Text>

              {/* <Image source={require('./Assets/users_images/1.jpg')} style={[styles.profileDP]} /> */}
            </View>

            <View style={{flex:3}}>
              <TextInput
                style={styles.blackFont, stylish.mymargin }
                value={this.state.names}
                onChangeText={(text) => this.setState({ names: text })}/>
              <Text style={[,styles.margins]}></Text>
              <Text style={[styles.blackFont, stylish.mymargin]}>{this.state.usernames}</Text>
              <Text style={[,styles.margins,styles.line]}></Text>
            </View>
         </View>
         <DatePicker
           style={{width: 400,marginTop:10}}
           date={this.state.dobs}
           mode="date"
           format="DD-MM-YYYY"
           minDate="01-01-1975"
           maxDate="01-01-2015"
           confirmBtnText="Confirm"
           cancelBtnText="Cancel"
           customStyles={{
            dateIcon: {
              position: 'absolute',
              right: 2,
            },
            dateInput: {
              borderWidth: 0,
              alignItems: "flex-start",
              justifyContent: "flex-start",
              marginLeft:15,
              marginTop:40
            }
          }}
          onDateChange={(date) => {this.setState({dobs: date})}}
        />
         <Text style={[,styles.margins,styles.line]}></Text>
         <Text style={[,styles.margins]}></Text>
         <View style={[styles.flexrow,styles.margins, {marginTop:15,marginBottom:10}]}>
           <RadioButton currentValue={this.state.gender} value="male" onPress={this.handleOnPress.bind(this)}>
             <Text>male</Text>
           </RadioButton>
           <Text style ={{marginLeft:10}}></Text>
           <RadioButton currentValue={this.state.gender} value="female" onPress={this.handleOnPress.bind(this)}>
             <Text>female</Text>
           </RadioButton>
         </View>
        </View>
        <Text style={[styles.brownFont,styles.margins,{fontSize:20}]}>Contact Info</Text>
          <View style={[styles.pink,{marginTop:10}]}>
            <TextInput
              style={styles.blackFont, stylish.mymargin}
              value={this.state.telephones1}
              onChangeText={(text) =>this.setState({ telephones1: text })}/>
            <Text style={[,styles.margins]}></Text>
            <TextInput
              style={styles.blackFont, stylish.mymargin }
              value={this.state.addressLines1}
              onChangeText={(text) =>this.setState({ addressLines1: text })}/>
            <Text style={[,styles.margins]}></Text>
            <TextInput
              style={styles.blackFont, stylish.mymargin }
              value={this.state.addressLines2}
              onChangeText={(text) =>this.setState({ addressLines2: text })}/>
            <Text style={[,styles.margins]}></Text>
            <TextInput
              style={styles.blackFont, stylish.mymargin }
              value={this.state.postCodes}
              onChangeText={(text) =>this.setState({ postCodes: text })}/>
            <Text style={[,styles.margins]}></Text>
            <TextInput
              style={styles.blackFont, stylish.mymargin }
              value={this.state.districts}
              onChangeText={(text) =>this.setState({ districts: text })}/>
            <Text style={[,styles.margins]}></Text>
            <TextInput
              style={styles.blackFont, stylish.mymargin}
              value={this.state.states}
              onChangeText={(text) =>this.setState({ states: text })}/>
            <Text style={[,styles.margins]}></Text>
            <TextInput
              style={styles.blackFont, stylish.mymargin }
              value={this.state.countrys}
              onChangeText={(text) =>this.setState({ countrys: text })}/>
            <Text style={[,styles.margins]}></Text>
            </View>
            <TouchableOpacity style={[styles.violet,styles.submitButton,{marginBottom:20,marginRight:20}]} onPress={() => this.update()}>
              <Text style={{ fontWeight: '500' ,fontSize:20,  alignSelf: 'center',color:'white'}}>update</Text>
            </TouchableOpacity>
      </ScrollView>
    );
  }
}
const stylish = StyleSheet.create({
 mymargin:{
   marginTop: 20,
   marginLeft: 20,
   fontSize:15
 }});
