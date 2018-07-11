/* @flow */

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

  }

  render() {
    const { navigate } = this.props.navigation;
    return (

      <View>

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
          <View style={[styles.flexcol, styles.innerTextBox]} >
            <Text style={[styles.topTitle]}>Instructions</Text>
            <FlatList
              data={[{ key: 'a' }, { key: 'b' }]}
              renderItem={({ item }) => <Text>{item.key}</Text>}
            />
            <Text style={[styles.lightFont]} >Staff Board Exam</Text>
            <Text style={[styles.lightFont]} >Negative mark</Text>
            <Text style={[styles.lightFont]} >No of Questions <Text style={[styles.indicator]}>10 </Text>Time Allocated <Text style={[styles.indicator]}>10</Text></Text>
            <View>
              <Text>Ends on 13 Jun 11:59 pm</Text>
            </View>
          </View>
        </View>

      </View>

    );
  }
}
