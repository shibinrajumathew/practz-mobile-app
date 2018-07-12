/* @flow */
import Icon from 'react-native-ionicons';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import React, { Component } from 'react';
import RadioButton from 'radio-button-react-native';
import styles from '../Assets/Style';
import ImageOverlay from "react-native-image-overlay";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  ToolbarAndroid,
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
      picTick:'../Assets/images/tick.png',
      qno:3,
      test:[{'a':'0','b':'1','c':'2'}],
      quest:'Which software launched by Union Home Minister Rajnath Singh to do speedy disposal of appeals/Complaints?',
      data: [
        { 'key': 'Quando analisa','index':1 },
        { 'key': 'Modelo de texto','index':2 },
        { 'key': 'Parte sofreu alteraes','index':3 },
        { 'key': 'Todos os geradores','index':4 },
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
onActionSelected(position) {
  if (position === 0) { // index of 'Settings'
    showSettings();
  }
}
clearRadio(){
  this.setState({value:0})
  console.log('value is:',this.state.value);
}

  render() {
    let img=require('../Assets/images/tick.png');
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <ToolbarAndroid            actions = {[
              {title: "Log out", show: "always"}
            ]}
      onActionSelected={this.onActionSelected} />
        <View style={{ flex: 4 }}>
          <View style={[styles.questionBox,styles.flexrow]}>
            <Text style={[styles.topTitle]}>Q{this.state.qno}. </Text>
            <Text style={[styles.lightFont, styles.blackFont]} >{this.state.quest}</Text>
          </View>
          <View style={[styles.examBox, styles.flexcol]}>
            <View style={[styles.answers]}>
            <RadioButton currentValue={this.state.value} value={this.state.data[0].index} onPress={this.handleOnPress.bind(this)}>
            <Text>  {this.state.data[0].key}</Text>
            </RadioButton>
          </View>
          <View style={[styles.answers]}>
            <RadioButton currentValue={this.state.value} value={this.state.data[1].index} onPress={this.handleOnPress.bind(this)}>
            <Text>  {this.state.data[1].key}</Text>
            </RadioButton>
            </View>
            <View style={[styles.answers]}>
            <RadioButton currentValue={this.state.value} value={this.state.data[2].index} onPress={this.handleOnPress.bind(this)}>
            <Text>  {this.state.data[2].key}</Text>
            </RadioButton>
          </View>
            <View style={[styles.answers]}>
            <RadioButton currentValue={this.state.value} value={this.state.data[3].index} onPress={this.handleOnPress.bind(this)}>
            <Text>  {this.state.data[3].key}</Text>
            </RadioButton>
          </View>

          </View>
          <ScrollView horizontal={true} style={{flex:1,marginTop: 10}}>
            <View style={[styles.flexrow]}>
              <View style={[styles.questionUnattended]}>
                <View style={[styles.textInsideCircle]}>
                  <Text style={[styles.lightFont]} >1</Text>
                </View>
              </View>
            <View style={[styles.questionUnattended]}>
              <View style={[styles.textInsideCircle]}>
                <Text style={[styles.lightFont]} >2</Text>
              </View>
            </View>
            <View style={[styles.questionUnattended]}>
              <View style={[styles.textInsideCircle]}>
                <Text style={[styles.lightFont]} >3</Text>
              </View>
            </View>
            <View style={[styles.questionUnattended]}>
              <View style={[styles.textInsideCircle]}>
                <Text style={[styles.lightFont]} >4</Text>
              </View>
            </View>
            <View style={[styles.questionForReview]}>
              <View style={[styles.textInsideCircle]}>
                <Text style={[styles.lightFont,styles.whiteFont]} >5</Text>
              </View>
            </View>
            <View style={[styles.questionAttended]}>
              <Image style={[styles.tickedNumber]} source={img}/>
              <View style={[styles.textInsideCircle]}>
                <Text style={[styles.lightFont,styles.tickedNumberColor]} > 6</Text>
              </View>
            </View>

            </View>
          </ScrollView>
        </View>
        <View style={[styles.submitButton,styles.flexrow]}>
          <TouchableOpacity style={[styles.questionButton]}><Text style={[styles.whiteFont]}>Previous</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.questionButton]} onPress={this.clearRadio.bind(this)}><Text style={[styles.whiteFont]}>Clear</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.questionButton,styles.white]}><Text style={[styles.violetFont]}>Review</Text></TouchableOpacity>
        </View>
      </View>


    );
  }
}
