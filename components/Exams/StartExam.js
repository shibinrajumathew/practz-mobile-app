/* @flow */
import Icon from 'react-native-ionicons';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import React, { Component } from 'react';
import RadioButton from 'radio-button-react-native';
import styles from '../Assests/Style';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  FlatList,
  Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native';


export default class StartExam extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      qno:3,
      test:[{'a':'0','b':'1','c':'2'}],
      quest:'Which software launched by Union Home Minister Rajnath Singh to do speedy disposal of appeals/Complaints?',
      data: [
        { 'key': 'Quando analisa','index':0 },
        { 'key': 'Modelo de texto','index':1 },
        { 'key': 'Parte sofreu alteraes','index':2 },
        { 'key': 'Todos os geradores','index':3 },
      ],

    }

  }
  static navigationOptions = {

  headerRight:(<View  style={{marginRight: 10,flexDirection: 'row',}}>
    <Text>3/10 </Text>
    <ProgressBarAnimated
                width={ Dimensions.get('screen').width/1.4}
                height={20}
                value={80}
                backgroundColorOnComplete="#6CC644"
                backgroundColor='#CEC76F'
              />
              <Text> :</Text>
            </View>),
};

handleOnPress(value){
    this.setState({value:value})
}
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 4 }}>
          <View>
            <Text style={[styles.topTitle]}>Q{this.state.qno}</Text>

            <Text style={[styles.lightFont, styles.blackFont]} >{this.state.quest}</Text>
            <View style={[styles.flexrow]}>
              <View style={[styles.questionUnattended]}></View><Text style={[styles.lightFont]} > Unattended </Text>
              <View style={[styles.questionForReview]}></View><Text style={[styles.lightFont]}> Attended </Text>
              <View ><Icon name='ios-checkmark-circle' size={20} color='#8BC34A' /></View><Text style={[styles.lightFont]}> Marked for review</Text>
            </View>



          </View>
          <View style={[styles.examBox, styles.flexcol]}>

            <View style={{borderBottomWidth: 1,padding: 10,borderColor: '#cbcbcb', height: 50}}>
            <RadioButton currentValue={this.state.value} value={this.state.data[0].index} onPress={this.handleOnPress.bind(this)}>
            <Text>  {this.state.data[0].key}</Text>
            </RadioButton>
          </View>
          <View style={{borderBottomWidth: 1,padding: 10,borderColor: '#cbcbcb', height: 50}}>
            <RadioButton currentValue={this.state.value} value={this.state.data[1].index} onPress={this.handleOnPress.bind(this)}>
            <Text>  {this.state.data[1].key}</Text>
            </RadioButton>
            </View>
            <View style={{borderBottomWidth: 1,padding: 10,borderColor: '#cbcbcb', height: 50}}>
            <RadioButton currentValue={this.state.value} value={this.state.data[2].index} onPress={this.handleOnPress.bind(this)}>
            <Text>  {this.state.data[2].key}</Text>
            </RadioButton>
          </View>
            <View style={{borderBottomWidth: 1,padding: 10,borderColor: '#cbcbcb', height: 50}}>
            <RadioButton currentValue={this.state.value} value={this.state.data[3].index} onPress={this.handleOnPress.bind(this)}>
            <Text>  {this.state.data[3].key}</Text>
            </RadioButton>
          </View>

          </View>
        </ScrollView>
        <View style={[styles.submitButton]}>
        <Text style={[styles.lightFont, styles.whiteFont]} > Start Exam</Text>
        </View>
      </View>


    );
  }
}
