/* @flow */
import Icon from 'react-native-ionicons';
import React, { Component } from 'react';
import styles from '../Assets/Style';
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

export default class ExamDetails extends Component {
  constructor() {
    super();
    this.state = {

      data: [
        { 'key': 'On clicking the ‘Start Exam’ button, the timer will start and you can answer the questions within the allocated time. ' },
        { 'key': 'If you need to review any question, then tick the ‘Mark for Review’ checkbox. These questions will be highlighted in the Review Page.' },
        { 'key': 'Click on the ‘Review Page’ button to see all the questions and its statuses. Clicking on the question number will take you directly to that question.' },
        { 'key': 'The system will automatically finish this Test after the allocated time.' },
        { 'key': 'If you are able to complete the Test before the allocated time, you can press the ‘Submit Exam’ button in the review page to finish & exit this Test.' }
      ],
    }

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 4 }}>
          <View style={[styles.examBox, styles.flexrow]}>

            <View style={[styles.flexcol, styles.innerTextBox]} >
              <Text style={[styles.topTitle, styles.blackFont]}>Ca 22</Text>
              <Text style={[styles.lightFont, styles.blackFont]} >Staff Board Exam</Text>
              <Text style={[styles.lightFont]} >No of Questions <Text style={{ color: '#956FCE', fontWeight: '600' }}>10 </Text>Time Allocated <Text style={{ color: '#956FCE', fontWeight: '600' }}>15 Min</Text></Text>

              <View style={[styles.flexrow]}>
                <Text style={[styles.lightFont]} >Negative mark </Text>
                <View style={[styles.negativeButton, styles.orange]} >
                  <Text style={{ color: '#ffffff' }}>33%</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.lightFont]}>Ends on 13 Jun 11:59 pm</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={[styles.topTitle]}>Instructions</Text>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => <Text style={[styles.lightFont]} > {'\u2022'}  {item.key}</Text>}
              keyExtractor={(item, index) => index.toString()}
            />
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => <Text style={[styles.lightFont]} > {'\u2022'}  {item.key}</Text>}
              keyExtractor={(item, index) => index.toString()}
            />
            <Text style={[styles.lightFont, styles.blackFont]} >Question Colors</Text>
            <View style={[styles.flexrow]}>
              <View style={[styles.questionUnattended]}></View><Text style={[styles.lightFont]} > Unattended </Text>
              <View style={[styles.questionForReview]}></View><Text style={[styles.lightFont]}> Attended </Text>
              <View ><Icon name='ios-checkmark-circle' size={20} color='#8BC34A' /></View><Text style={[styles.lightFont]}> Marked for review</Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={[styles.submitButton]} onPress={() => this.props.navigation.navigate('StartExam')}><Text style={[styles.lightFont, styles.whiteFont]} > Start Exam</Text></TouchableOpacity>
      </View>


    );
  }
}
