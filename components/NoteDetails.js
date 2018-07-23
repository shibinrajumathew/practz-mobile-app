import React, { Component } from 'react';
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
                        return <View key={(note, index) => index.toString()} > 
                        <View style={[styles.announcementbox,styles.grey]}>
          <Text style={[styles.margins,styles.lightFont]}>Posted By
             <Text style={[styles.endFont]}>  {note.postedBy}  </Text>
             <Text style ={[styles.lightFont]} >      Topic
             <Text style={[styles.indicator]}>   { note.topic}   </Text>
      
      </Text>
              </Text>


      <Text style={[styles.margins,styles.lightFont]}>Posted On: {note.postedOn} </Text>
     <View style={[styles.margins]}>
     <Text>
     <Icon name='ios-attach' size={25} />
     <Text>       <Icon name='ios-image-outline'/></Text>
     </Text>
     </View >
         
    </View>
      </View>;
           })
           

    return (

      <ScrollView style={{backgroundColor:'#FFFFFF'}}>
      {noteList}
      <Text style={{marginLeft:20,fontWeight:'800',fontSize:20,marginTop:10}}>Bombay Blood </Text>
        <Text style={{marginLeft:20,fontSize:18,fontWeight:'500',marginTop:5}}>How the rare blood type was discovered? </Text>
           <Text style={{marginLeft:20,fontSize:15,lineHeight: 30,marginTop:15,fontWeight:'500'}}>In the first part of the article,
                 I talked about the definitions and types of microinteractions and why they work for your product UX.
                 Here, I will show examples of effective microinteraction. I will also explain,
                 how they improve your UX and what is microinteractions testing.
                 You can use this information to persuade your boss or your design team (and perhaps even yourself)
                 that microinteraction is flexible and an ever-changing element for designing rich interactive experiences.
      </Text>
         <Image style=
              {{height:150,width:200,alignSelf:'center',marginTop:20}}
                  source={require('./Assets/images/announcements.png')}
        />
     <Text style ={{fontWeight:'200',alignSelf: 'center',marginTop:10}}> Img 1.1 White blood cells </Text>
          <Text style={{marginLeft:20,fontSize:15,lineHeight: 30,marginTop:15,fontWeight:'500'}}>Microinteractions show that
                focus  on details is a key principle for effective and powerful results Each part of the design process matters.
                Impressive, useful and unforgettable details make your app stand out from the competition.
          </Text>
      <Text style={{fontStyle:'italic',marginLeft:20,marginTop:10}}>"
          <Text style={{fontStyle:'italic'}}>   I caught two meaty catfish today. What have you
          </Text>
      </Text>
       <Text style={{fontStyle:'italic',marginLeft:30,marginTop:3}}> caught? Nothing?</Text>
           <Text style={{fontStyle:'italic',marginLeft:30,marginTop:3}}>Perhaps you’re not so fierce after all.</Text>
           <View style={{flex:1,flexDirection:'row',justifyContent: 'space-between',marginLeft:20,marginRight:10,marginTop:10}}>
               <View style={{flex:1}}>
                 <Image
                    style={{height:50,width:75}}
                    source={require('./Assets/images/announcements.png')}
                    />
               </View>
               <View style={{flex:1}}>
                 <Image
                    style={{height:50,width:75}}
                    source={require('./Assets/images/download.png')}
                    />
               </View>
               <View style={{flex:1}}>
                 <Image
                    style={{height:50,width:75}}
                    source={require('./Assets/images/logo.png')}
                    />
               </View>
           </View>

      </ScrollView>
    );
    }
}
     