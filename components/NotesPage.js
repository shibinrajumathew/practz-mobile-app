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

 export class NotesPage extends Component {
  render() {
    return (<ScrollView style={[styles.container,styles.flexcol]} >
      <View style={[styles.flexrow,styles.availableBox]}>
      <Text style={{fontWeight: 'bold',color: '#000',flex:3}}>Latest Notes</Text>
      <Text style={{color: '#676262',flex:1,}}>View all</Text>
      </View>
      <View style={[styles.announcementBox,styles.flexrow]}>
        <View style={[styles.flexcol,styles.innerTextBox]} >
          <Text style={[styles.topTitle]}>Ca 22</Text>
          <Text style={[styles.lightFont]}>Staff Board Exam</Text>
          <Text style={{fontFamily: 'Avenir, Light'}} >No of Questions <Text style={{color: '#956FCE', fontWeight: '600'}}>10 </Text>Time Allocated <Text style={{color: '#956FCE', fontWeight: '600'}}>10</Text></Text>
          <View style={{ flexDirection: 'row'}}>
          <Text style={[styles.endFont]}>Ends on 13 Jun 11:59 pm</Text>
          </View>
        </View>
        <View style={[styles.sideBotton,styles.brightBlue]} >
          <Text style={{fontFamily: 'Avenir, Book', color: '#ffffff'}} >Science & Tech </Text>
        </View>
      </View>
      <View style={[styles.announcementBox,styles.flexrow]}>
        <View style={[styles.flexcol,styles.innerTextBox]} >
          <Text style={[styles.topTitle]}>Ca 22</Text>
          <Text style={[styles.lightFont]}>text</Text>
          <Text style={{fontFamily: 'Avenir, Light'}} >No of Questions <Text style={{color: '#956FCE', fontWeight: '600'}}>10 </Text>Time Allocated <Text style={{color: '#956FCE', fontWeight: '600'}}>10</Text></Text>
          <View style={{ flexDirection: 'row'}}>
          <Text style={[styles.endFont]}>Ends on 13 Jun 11:59 pm</Text>
          </View>
        </View>
        <View style={[styles.sideBotton,styles.green]} >
          <Text style={{fontFamily: 'Avenir, Book', color: '#ffffff'}} >Science & Tech </Text>
        </View>
      </View>
      <View style={[styles.announcementBox,styles.flexrow]}>
        <View style={[styles.flexcol,styles.innerTextBox]} >
          <Text style={[styles.topTitle]}>Ca 22</Text>
          <Text style={[styles.lightFont]} >Staff Board Exam</Text>
          <Text style={{fontFamily: 'Avenir, Light'}} >No of Questions <Text style={{color: '#956FCE', fontWeight: '600'}}>10 </Text>Time Allocated <Text style={{color: '#956FCE', fontWeight: '600'}}>10</Text></Text>
          <View style={{ flexDirection: 'row'}}>
          <Text style={[styles.endFont]}>Ends on 13 Jun 11:59 pm</Text>
          </View>
        </View>
        <View style={[styles.sideBotton,styles.green]} >
          <Text style={{fontFamily: 'Avenir, Book', color: '#ffffff'}} >Science & Tech </Text>
        </View>
      </View>
    </ScrollView>

    );
  }
}
