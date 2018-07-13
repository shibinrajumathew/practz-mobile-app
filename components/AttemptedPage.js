import ProgressBarAnimated from 'react-native-progress-bar-animated';
import React, { Component } from 'react';
import styles from './Assets/Style';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

export class AttemptedPage extends React.Component {
  constructor() {
    //inherit parent props
    super();
    //create dynamic variables
    this.state = {
      progress: 80,
      progressWithOnComplete: 0,
      progressCustomized: 0,
    }
  }
  // increase = (key, value) => {
  //   this.setState({
  //     [key]: this.state[key] + value,
  //   });
  // }

  render() {
     let attemptedList = this.state.attempted.map(function(exam){
       return(
         <View style={[styles.announcementBox, styles.flexrow]}>
           <View style={[styles.flexcol, styles.innerTextBox]} >
             <Text style={[styles.heavyFont,styles.boldFont,styles.whiteFont]}>Ca 22</Text>
             <Text style={[styles.lightFont,styles.percentage]} >{this.state.progress}%</Text>
             <ProgressBarAnimated
               width={barWidth}
               value={this.state.progress}
               backgroundColorOnComplete="#6CC644"
               backgroundColor='#956FCE'
             />
             <Text style={[styles.lightFont]} >No of Questions <Text style={[styles.count]}>10 </Text>Time Allocated <Text style={[styles.count]}>10</Text></Text>
             <View style={[styles.flexrow]}>
               <Text style={[styles.endFont]}>Ends on 13 Jun 11:59 pm</Text>
             </View>
           </View>
           <View style={[styles.sideBotton, styles.brightBlue]} >
             <Text style={[styles.bookFont,styles.whiteFont]} >Science & Tech </Text>
           </View>
         </View>
       );
     });
    const barWidth = Dimensions.get('screen').width - 30;
    const progressCustomStyles = {
      backgroundColor: 'red',
      borderRadius: 0,
      borderColor: 'orange',
    };
    return (
      <ScrollView style={[styles.container, styles.flexcol]} >
        <View style={[styles.flexrow, styles.availableBox]}>
          <Text style={[styles.boldFont,styles.whiteFont],{ flex: 3 }}>Attempted Exams</Text>
        </View>
        {attemptedList}
        <View style={[styles.announcementBox, styles.flexrow]}>
          <View style={[styles.flexcol, styles.innerTextBox]} >
            <Text style={[styles.heavyFont,styles.boldFont,styles.whiteFont]}>Ca 22</Text>
            <Text style={[styles.lightFont,styles.percentage]} >{this.state.progress}%</Text>
            <ProgressBarAnimated
              width={barWidth}
              value={this.state.progress}
              backgroundColorOnComplete="#6CC644"
              backgroundColor='#E57373'
            />
            <Text style={[styles.lightFont]} >No of Questions <Text style={{ color: '#956FCE', fontWeight: '600' }}>10 </Text>Time Allocated <Text style={{ color: '#956FCE', fontWeight: '600' }}>10</Text></Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.endFont]}>Ends on 13 Jun 11:59 pm</Text>
            </View>
          </View>
          <View style={[styles.sideBotton, styles.green]} >
            <Text style={{ fontFamily: 'Avenir, Book', color: '#ffffff' }} >Science & Tech </Text>
          </View>
        </View>
        <View style={[styles.announcementBox, styles.flexrow]}>
          <View style={[styles.flexcol, styles.innerTextBox]} >
            <Text style={[styles.heavyFont,styles.boldFont,styles.whiteFont]}>Ca 22</Text>
            <Text style={[styles.lightFont]} >Staff Board Exam</Text>
            <ProgressBarAnimated
              width={barWidth}
              value={this.state.progress}
              backgroundColorOnComplete="#6CC644"
              backgroundColor='#73cae6'
            />
            <Text style={[styles.lightFont]} >No of Questions <Text style={{ color: '#956FCE', fontWeight: '600' }}>10 </Text>Time Allocated <Text style={{ color: '#956FCE', fontWeight: '600' }}>10</Text></Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.endFont]}>Ends on 13 Jun 11:59 pm</Text>
            </View>
          </View>
          <View style={[styles.sideBotton, styles.green]} >
            <Text style={{ fontFamily: 'Avenir, Book', color: '#ffffff' }} >Science & Tech </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
