/* @flow */
import Icon from 'react-native-ionicons';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import React, { Component } from 'react';
import {sessionDestroy,noBack} from './Functions';
import styles from './Assets/Style';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import IconBadge from 'react-native-icon-badge';
export class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      BadgeCount: 5,
      progress: 60,
      progressWithOnComplete: 0,
      progressCustomized: 0,
    }
  }
  userLogout(){
    sessionDestroy();
    noBack(this.props,'Login')
  }
  render() {
    const barWidth = (Dimensions.get('screen').width / 2) - 30;
    const progressCustomStyles = {
      backgroundColor: 'red',
      borderRadius: 0,
      borderColor: 'orange',
    };
    return (
      <View>
        <View style={[styles.flexrow]}>
          <View elevation={2} style={styles.profileView}>
            <Image source={require('./Assets/users_images/1.jpg')} style={[styles.profileDP]} />
          </View>
          <View style={[styles.flexcol]} >
            <Text style={[styles.lightTitle, { marginTop: 10, marginLeft: 10, }]}>Walter White</Text>
            <Text style={[styles.lightTitle, { marginTop: 10, marginLeft: 10, }]}>Attended <Text style={[styles.indicator]}>25 </Text><Text>Passed </Text><Text style={[styles.indicator]}>18 </Text></Text>
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: '400', color: '#8BC34A' }}>{this.state.progress} % <Text style={{ color: '#797979' }}>progress</Text></Text>
              <ProgressBarAnimated
                width={barWidth}
                value={this.state.progress}
                backgroundColorOnComplete="#6CC644"
                backgroundColor='#956FCE'
              />
            </View>
          </View>
        </View>
        <View style={{
          marginTop: 10,
          padding: 1,
          backgroundColor: '#d1d7da',
          shadowColor: "#000000",
          shadowOpacity: 0.8,
          shadowRadius: 2,
          shadowOffset: {
            height: 10,
            width: 10
          }
        }}>
        </View>
        <View style={[styles.profileSetting]}>
          <Text style={{ fontWeight: '500' }}>Historic Pattern</Text>
        </View>
        <View style={[styles.profileSetting]}>
          <Text style={{ fontWeight: '500' }}>My Orders</Text>
        </View>
        <View style={[styles.profileSetting]}>
          <Text style={{ fontWeight: '500' }}>Account Settings</Text>
        </View>
        <View style={[styles.profileSetting]}>
          <Text style={{ fontWeight: '500' }}>Change Password</Text>
        </View>
        <TouchableOpacity style={[styles.profileSetting]} onPress={() => this.userLogout()}>
          <Text style={{ fontWeight: '500' }}>Logout</Text>
        </TouchableOpacity>
      </View>

    );
  }
}
