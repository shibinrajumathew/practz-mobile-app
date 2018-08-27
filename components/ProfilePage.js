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
  AsyncStorage,
  TouchableOpacity,
  Text,
} from 'react-native';
import IconBadge from 'react-native-icon-badge';
import RNMaterialLetterIcon from 'react-native-material-letter-icon';
export class ProfilePage extends Component {
  constructor() {
    super();
    this.state = {
      name:"abcd",
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

  componentWillMount(){
    AsyncStorage.multiGet(['name']).then((data) => {
      this.setState({
        name:data[0][1],
      })
    });
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
        <View style={[styles.flexcol]}>
          <View elevation={2} style={styles.profileView}>
            <RNMaterialLetterIcon
              size={100}
              letterSize={28}
              letter={(this.state.name).charAt(0).toUpperCase()}
              shapeColor={"#FF9800"}
            />
            <Text style={[styles.lightTitle]}>{(this.state.name).charAt(0)}</Text>
          </View>
          <View style={[styles.flexcol]} >
            <Text style={[styles.lightTitle, { marginLeft: 40}]}>{this.state.name}</Text>
            {/* <Text style={[styles.lightTitle, { marginTop: 10, marginLeft: 10, }]}>Attended <Text style={[styles.indicator]}>25 </Text><Text>Passed </Text><Text style={[styles.indicator]}>18 </Text></Text>
            <View style={{ marginLeft: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: '400', color: '#8BC34A' }}>{this.state.progress} % <Text style={{ color: '#797979' }}>progress</Text></Text>
              <ProgressBarAnimated
                width={barWidth}
                value={this.state.progress}
                backgroundColorOnComplete="#6CC644"
                backgroundColor='#956FCE'
              />
            </View> */}
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
        }}/>
        <TouchableOpacity style={[styles.profileSetting]} onPress={() =>
          this.props.navigation.navigate('HistoricPattern')}>
          <Text style={[styles.LargeFont]} >Historic Pattern</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.profileSetting]} onPress={() =>
          this.props.navigation.navigate('MyOrders')}>
          <Text style={[styles.LargeFont]} >My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.profileSetting]} onPress={() =>
          this.props.navigation.navigate('AccountSetting')}>
          <Text style={[styles.LargeFont]} >Account Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.profileSetting]}>
          <Text style={[styles.LargeFont]}  onPress={() => this.props.navigation.navigate('ChangePassword')}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.profileSetting]} onPress={() => this.userLogout()}>
          <Text style={[styles.LargeFont]}>Logout</Text>
        </TouchableOpacity>
      </View>

    );
  }
}
