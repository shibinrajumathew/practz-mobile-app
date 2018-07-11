import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';


export default class NoteDetails extends Component {
  constructor(props) {

       super(props)

       this.state = {

         notes: [

           {'postedBy':'name','topic':'topic1','postedOn':'15 July 11:59 pm'}
         ]

       }

     }

  render() {
     var noteList = this.state.notes.map(function(note){
                        return  <View style={[styles.myview]}>
          <Text style={{marginLeft:20,marginTop:10,color:'#7D7776',fontWeight:'thin'}}>Posted By
             <Text style={{marginLeft:2,color:'#956FCE',}}>  {note.postedBy}
                <Text style={{marginLeft:20,color:'#7D7776',fontWeight:'thin'}}>      Topic
                <Text style={{marginLeft:2,color:'#956FCE'}}> { note.topic}   </Text>
                </Text>
            </Text>
              </Text>
      <Text style={{marginLeft:20,marginTop:10,color:'#7D7776',fontWeight:'thin'}}>Posted On: {note.postedOn} </Text>
      </View>;
           })
    return (

      <ScrollView style={{backgroundColor:'#FFFFFF'}}>
      {noteList}
      <Text style={{marginLeft:20,fontWeight:'bold',fontSize:20,marginTop:10}}>Bombay Blood </Text>
      <Text style={{marginLeft:20,fontSize:15,fontWeight:'bold',marginTop:5}}>How the rare blood type was discovered? </Text>
      <Text style={{marginLeft:20,fontSize:15,lineHeight: 30,marginTop:5}}>In the first part of the article, I talked about the definitions and types of microinteractions and why they work for your product UX. Here, I will show examples of effective microinteraction. I will also explain, how they improve your UX and what is microinteractions testing. You can use this information to persuade your boss or your design team (and perhaps even yourself) that microinteraction is flexible and an ever-changing element for designing rich interactive experiences.</Text>
      </ScrollView>
    );
    }
}
const styles = StyleSheet.create({
  myview: {
    height:100,
    borderWidth: .5,
    borderColor: '#7C7676',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 1,
    marginTop: 20,
  backgroundColor:'#F6F4F8'
  }

    });
