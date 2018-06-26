/* @flow */

import React, { Component } from 'react';
import Icon from 'react-native-ionicons';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import {
  View,
  ScrollView,
  Image,
  TextInput,
  Picker,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  NetInfo,
  Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native';


 class Home extends Component {
  static navigationOptions = {
  headerLeft: null,
  title: 'Hospital Admin',
  headerStyle:{
    backgroundColor:'#1993cb',
  },
  headerTitleStyle:{
    color:'white',
  },
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>

      </View>
    );
  }
}

class Attempted extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>

      </View>
    );
  }
}

class Notes extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}
class Message extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Message!</Text>
      </View>
    );
  }
}


export default TabNavigator(
  {
    Home: { screen: Home },
    Attempted: { screen: Attempted },
    Notes: { screen: Notes },
    Message:{ screen: Message},
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Attempted') {
          iconName = `ios-refresh${focused ? '' : '-outline'}`;
        } else if (routeName === 'Notes') {
          iconName = `ios-clipboard${focused ? '' : '-outline'}`;
        } else if (routeName === 'Message') {
          iconName = `ios-mail-open${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
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
