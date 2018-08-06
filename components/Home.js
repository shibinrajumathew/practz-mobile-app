/* @flow */

import ProgressBarAnimated from 'react-native-progress-bar-animated';
import React, { Component } from 'react';
import styles from './Assets/Style';
import { ProfilePage } from './ProfilePage';
import { LandingPage } from './LandingPage';
import { AttemptedPage } from './AttemptedPage';
import { NotesPage } from './NotesPage';
import Icon from 'react-native-ionicons';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
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


class Home extends Component {

  render() {

    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={[styles.container, styles.flexcol]} >
        <LandingPage navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}

class Attempted extends React.Component {
  render() {
    return (
      <ScrollView style={[styles.container, styles.flexcol]} >
        <AttemptedPage navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}

class Notes extends React.Component {
  render() {
    return (
      <ScrollView style={[styles.container, styles.flexcol]} >
        <NotesPage navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}
class Profile extends Component {
  render() {
    return (
      <ScrollView style={[styles.container, styles.flexcol]} >
        <ProfilePage navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}


export default TabNavigator(
  {
    Home: { screen: Home },
    Attempted: { screen: Attempted },
    Notes: { screen: Notes },
    Profile: { screen: Profile },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Attempted') {
          iconName = `ios-refresh-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Notes') {
          iconName = `ios-clipboard${focused ? '' : '-outline'}`;
        } else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        }
        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#c9d9da',
      inactiveTintColor: 'white',
      style: {
        backgroundColor: '#5e3f8c',
      },
    },
    animationEnabled: true,
    swipeEnabled: true,
  }
);
