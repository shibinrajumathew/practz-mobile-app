import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';

import Icon from 'react-native-ionicons';
import styles from './Assets/Style';
export default class AccountSetting extends Component {
  constructor(props) {

    super(props)

    this.state = {

      notes: [

        {
          'postedBy': 'name',
          'topic': 'topic1',
          'postedOn': '15 July 11:59 pm'
        }
      ]

    }

  }

  render() {
  }
}
