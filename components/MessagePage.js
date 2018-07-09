/* @flow */
import Icon from 'react-native-ionicons';
import React, { Component } from 'react';
import styles from './Assests/Style';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import IconBadge from 'react-native-icon-badge';

 export class MessagePage extends Component {
   constructor(){
       super();
       this.state={
         BadgeCount: 5,
       }
     }
  render() {
    return (
      <View>
        <View style={[styles.availableBox]}>
        <Text style={[styles.lightTitle]}>Messages</Text>
      </View>
       <View style={[styles.flexrow,styles.availableBox]}>
         <Text style={[styles.messageTab]}>All</Text>
         <Text style={[styles.messageTab,styles.endFont]}>Teachers</Text>
         <Text style={[styles.messageTab,styles.endFont]}>Friends</Text>
       </View>
       <View style={[styles.flexrow,{marginTop: 5}]}>
        <IconBadge
          MainElement={<Image source={require('./Assests/users_images/1.jpg')} style={[styles.roundDP]}/>}
          IconBadgeStyle={[styles.offline]} />
          <View style={[styles.flexcol]}>
          <Text style={[styles.topTitle,styles.msgDescription]}>Hannah Tran</Text>
          <Text style={[styles.msgDescription]}>Hi Hannah, Good Morning!</Text>
          </View>
        </View>
       <View style={[styles.flexrow,{marginTop: 5}]}>
        <IconBadge
          MainElement={<Image source={require('./Assests/users_images/2.jpg')} style={[styles.roundDP]}/>}
          IconBadgeStyle={[styles.online]} />
          <View style={[styles.flexcol]}>
          <Text style={[styles.topTitle,styles.msgDescription]}>Louisa McGee</Text>
          <Text style={[styles.msgDescription]}>Is question 2 related to questi..</Text>
          </View>
        </View>
       <View style={[styles.flexrow,{marginTop: 5}]}>
        <IconBadge
          MainElement={<Image source={require('./Assests/users_images/3.jpg')} style={[styles.roundDP]}/>}
          IconBadgeStyle={[styles.online]} />
          <View style={[styles.flexcol]}>
          <Text style={[styles.topTitle,styles.msgDescription]}>Margaret Moreno</Text>
          <Text style={[styles.msgDescription]}>Let me check that ..</Text>
          </View>
        </View>
       <View style={[styles.flexrow,{marginTop: 5}]}>
        <IconBadge
          MainElement={<Image source={require('./Assests/users_images/4.jpg')} style={[styles.roundDP]}/>}
          IconBadgeStyle={[styles.offline]} />
          <View style={[styles.flexcol]}>
          <Text style={[styles.topTitle,styles.msgDescription]}>Walter Osborne</Text>
          <Text style={[styles.msgDescription]}>Thanks, I will get back to you.</Text>
          </View>
        </View>
        {/* start chat */}
        <View style={{marginTop: 8}}>
          <Text style={[styles.lightTitle,{marginLeft:10}]}>Start New Chat</Text>
        <View style={[styles.flexrow,{marginTop: 5}]}>
          <TouchableOpacity
            style={[styles.addChat]}>
          <Text style={[styles.addChatPlus]}>+</Text>
        </TouchableOpacity>
        <IconBadge
          MainElement={<Image source={require('./Assests/users_images/1.jpg')} style={[styles.roundDP]}/>}
          IconBadgeStyle={[styles.offline]} />
          <IconBadge
            MainElement={<Image source={require('./Assests/users_images/3.jpg')} style={[styles.roundDP]}/>}
            IconBadgeStyle={[styles.offline]} />
            <IconBadge
              MainElement={<Image source={require('./Assests/users_images/2.jpg')} style={[styles.roundDP]}/>}
              IconBadgeStyle={[styles.offline]} />
            <IconBadge
              MainElement={<Image source={require('./Assests/users_images/4.jpg')} style={[styles.roundDP]}/>}
              IconBadgeStyle={[styles.offline]} />
        </View>
      </View>

</View>

    );
  }
}
