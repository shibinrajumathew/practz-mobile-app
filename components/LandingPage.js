/* @flow */

import React, { Component } from 'react';
import styles from './Assests/Style';
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

export class LandingPage extends Component {
  render() {
    return (

      <View>
        <View style={styles.flexrow}>
          <View style={[styles.topBox, styles.blue]}>
            <Text style={{ color: '#ffffff' }}>practice realtime at your convenience!</Text>
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Nurse Model Exams</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>	&#8377;</Text>
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}> 350</Text>

              <Text style={{ color: '#ffffff', marginLeft: 50, }}> 10 Q&A</Text>
            </View>
          </View>
          <View style={[styles.topBox, styles.red]}>
            <Text style={{ color: '#ffffff' }}>practice realtime at your convenience!</Text>
            <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Nurse Model Exams</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>	&#8377;</Text>
              <Text style={{ color: '#ffffff', fontWeight: 'bold' }}> 350</Text>
              <Text style={{ color: '#ffffff', marginLeft: 50, }}> 10 Q&A</Text>
            </View>
          </View>
        </View>

        <View style={[styles.announcementBox, styles.flexrow]}>
          <View >
            <Image style={{ marginTop: 10 }} source={require('./Assests/images/announcements.png')}
            />
          </View>
          <View style={[styles.flexcol, styles.innerTextBox]} >
            <Text style={{ fontFamily: 'Avenir, Heavy', fontWeight: 'bold', color: '#000' }}>Take a free test</Text>
            <Text style={{ fontFamily: 'Avenir, Light' }} >Lorem ipsum dolor sit amet, consectetur adipisci</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: '#956FCE' }}>TRY NOW</Text>
            </View>
          </View>
        </View>
        <View style={[styles.flexrow, styles.availableBox]}>
          <Text style={{ fontWeight: 'bold', color: '#000', flex: 3 }}>Available exams</Text>
          <Text style={{ color: '#676262', flex: 1, }}>View all</Text>
        </View>
        <TouchableOpacity style={[styles.announcementBox, styles.flexrow]}
          onPress={() => this.props.navigation.navigate('ExamDetails')} >
          <View style={[styles.flexcol, styles.innerTextBox]} >
            <Text style={[styles.topTitle]}>Ca 22</Text>
            <Text style={{ fontFamily: 'Avenir, Light' }} >Staff Board Exam</Text>
            <Text style={{ fontFamily: 'Avenir, Light' }} >No of Questions <Text style={[styles.indicator]}>10 </Text>Time Allocated <Text style={[styles.indicator]}>10</Text></Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.endFont]}>Ends on 13 Jun 11:59 pm</Text>
            </View>
          </View>
          <View style={[styles.sideBotton, styles.brightBlue]} >
            <Text style={{ fontFamily: 'Avenir, Book', color: '#ffffff' }} >Science & Tech </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.announcementBox, styles.flexrow]}
          onPress={() => this.props.navigation.navigate('ExamDetails')}
        >
          <View style={[styles.flexcol, styles.innerTextBox]} >
            <Text style={{ fontFamily: 'Avenir, Heavy', fontWeight: 'bold', color: '#000' }}>Ca 22</Text>
            <Text style={{ fontFamily: 'Avenir, Light' }} >Staff Board Exam</Text>
            <Text style={{ fontFamily: 'Avenir, Light' }} >No of Questions <Text style={{ color: '#956FCE', fontWeight: '600' }}>10 </Text>Time Allocated <Text style={{ color: '#956FCE', fontWeight: '600' }}>10</Text></Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.endFont]}>Ends on 13 Jun 11:59 pm</Text>
            </View>
          </View>
          <View style={[styles.sideBotton, styles.green]} >
            <Text style={{ fontFamily: 'Avenir, Book', color: '#ffffff' }} >Science & Tech </Text>
          </View>
        </TouchableOpacity>
      </View>

    );
  }
}
