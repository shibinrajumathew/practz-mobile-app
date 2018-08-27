/* @flow */
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
  Platform,
  AsyncStorage,
} from 'react-native';
import URL from './Url';
import {sessionDestroy,noBack} from './Functions';

export class NotesPage extends Component {
  constructor(){
    super();
    let noteList;
    this.state={
    HOME:URL.HOME,
    AVAILABLE_EXAM:URL.AVAILABLE_EXAM,
    AVAILABLE_NOTES:URL.AVAILABLE_NOTES,
    status:'',
    view:'',
    checkFlag:0,
    noteData: [
      {
          "title": "",
          "content": "",
          "createdby": "",
          "createdDate": "",
      }
    ]
  }
  }

  componentWillMount() {
    AsyncStorage.multiGet(['userId','organizationId']).then((data) => {
    fetch(this.state.HOME+this.state.AVAILABLE_NOTES+'orgId='+data[1][1]+'&uId='+data[0][1]+'')
    .then(response =>  response.json())
    .then(responseobj => {
      if(responseobj==401){
        this.setState({
          noteList: [
            {
              "title": "",
              "content": "",
              "createdby": "",
              "createdDate": "",
            }
          ]
      });
        logout();
        noBack(this.props,'Login');
        this.props.navigation.navigate('Loign');
      }
    if((responseobj.data).length<1)
      {
        this.setState({
          checkFlag:1,
          view:'',
          status:'No Notes available now. Please check later.',
          noteData: [
            {
              "title": "",
              "content": "",
              "createdby": "",
              "createdDate": "",
            }
          ]
        });
      }else{
          this.setState({
            status:'Latest Notes',
            checkFlag:2,
            view:'View All',
            noteData:responseobj.data,
          });
        }
    });
});
}

  render() { 
    {
      this.state.checkFlag==1||this.state.checkFlag==0
      ?
      noteList = this.state.noteData.map((note, index)=>{
        return(<View key={index.toString()} ></View>);
      })
      : noteList = this.state.noteData.map((note, index)=>{
       return(
         <View key={index.toString()} >
            <TouchableOpacity  style={[styles.announcementBox, styles.flexrow]}
             onPress={() => this.props.navigation.navigate('NoteDetails',{nid:note.id})}>
             <View style={[styles.flexcol, styles.innerTextBox]} >
               <Text style={[styles.topTitle]}>{note.title}</Text>
               <Text style={[styles.lightFont,styles.attemptedBox]} >Posted by <Text style={[styles.indicator]}>{note.createdBy} </Text></Text>
               <View style={[styles.flexrow,styles.attemptedBox]}>
                 <Text style={[styles.lightFont]} >Posted on <Text style={[styles.endFont]}>{note.createdDate}</Text></Text>
               </View>
              </View>
            </TouchableOpacity>
         </View>
        );
     });
    }
    return (
      <ScrollView style={[styles.container, styles.flexcol]} >
      <View style={[styles.flexrow, styles.availableBox]}>
        <Text style={{ fontWeight: 'bold', color: '#000', flex: 3 }}>{this.state.status}</Text>
        <Text style={{ color: '#676262', flex: 1, }}>{this.state.view}</Text>
      </View>
      {noteList}
    </ScrollView>

    );
  }
}
