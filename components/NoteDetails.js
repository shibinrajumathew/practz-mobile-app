import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  Image
} from 'react-native';
import URL from './Url';
import Icon from 'react-native-ionicons';
import styles from './Assets/Style';
export default class NoteDetails extends Component {
  constructor(props) {
       super(props)
       this.state = {
        HOME:URL.HOME,
        NOTE_DETAILS:URL.NOTE_DETAILS,
        
            createdBys:"",
            createdDates:"",
            titles:"",
            topics:"",
            contents:"",
            topicNames:"",
            signedUrls:" ",
            audioUrls:" "   
       }
      }
      componentWillMount() {
        AsyncStorage.multiGet(['Id']).then((data) => {
          let user = data[0][1];
          classthis.setState({
            userId:user,
          });
        // console.log("response data",this.state.HOME+this.state.NOTE_DETAILS+this.props.navigation.state.params.nid+'/detailed');
      fetch(this.state.HOME+this.state.NOTE_DETAILS+this.props.navigation.state.params.nid+'/detailed')
      .then((response) => response.json())
      .then((responseJson) => {                
        const regex = /(<([^>]+)>)/ig;
        const result = responseJson.data.content.replace(regex, ''); 
        if(responseJson.data.audios.length<1){
          this.setState({
          
            createBys: responseJson.data.createdBy,
            createdDates:responseJson.data.createdDate,
            titles:responseJson.data.title,
            topics: responseJson.data. topic,
            contents: result ,      
            topicNames: responseJson.data.topicName, 
            signedUrls:responseJson.data.images[0].signedUrl       
        });
      }
        //console.log("response image",responseJson.data.images[0].url  );
        //console.log("response data",this.state.HOME+this.state.NOTE_DETAILS+data[0][1]+'/detailed');
        else {
        if(responseJson.data.images.length<1){
          this.setState({
          
            createdBys: responseJson.data.createdBy,
            createdDates:responseJson.data.createdDate,
            titles:responseJson.data.title,
            topics: responseJson.data. topic,
            contents: result ,      
            topicNames: responseJson.data.topicName,  
            audioUrls:responseJson.data.audios[0].signedUrl        
        });
        
      }
    
    else{
      this.setState({
          
          createBys: responseJson.data.createdBy,
          createdDates:responseJson.data.createdDate,
          titles:responseJson.data.title,
          topics: responseJson.data. topic,
          contents: result ,      
          topicNames: responseJson.data.topicName, 
          signedUrls:responseJson.data.images[0].signedUrl,
          audioUrls:responseJson.data.audios[0].signedUrl       
      });
    }}
      })
      .catch((error) =>{
        console.error(error);
      });
  });
  
}
  render() { 
       return (

      <ScrollView style={{backgroundColor:'#FFFFFF'}}>
       <View style={[styles.announcementbox,styles.grey]}>
          <Text style={[styles.margins,styles.lightFont]}>Posted By
             <Text style={[styles.endFont]}>  {this.state.createdBys}  </Text>
             <Text style ={[styles.lightFont]} >      Topic
             <Text style={[styles.indicator]}>   {this.state.titles}   </Text>  
            </Text>
          </Text>

      <Text style={[styles.margins,styles.lightFont]}>Posted On: {this.state.createdDates} </Text>
       <View style={[styles.margins]}>
         <Text>
       <Icon name='ios-attach' size={25} />
             <Text>       <Icon name='ios-image-outline'/></Text>
         </Text>
     </View > 
    </View>
      
      
      <Text style={[styles.margins,styles.heavyFont,stylish.myview]}>{this.state.topicNames} </Text>
        <Text style={[styles.boldFont,stylish.myview1,styles.heavyFont]}>{this.state.topics} </Text>
           <Text style={[styles.margins,stylish.myview1]}>{this.state.contents}
      </Text>
         <Image style=
              {{height:150,width:200,alignSelf:'center',marginTop:20}}
              source = {{uri:this.state.signedUrls}} />
        <View style={[styles.announcementbox,styles.grey]}>
        
        <Text>djb</Text><View style={[styles.examBox]}>
        <Text>{this.state.audioUrls}</Text>
        </View>
        
        </View>
      </ScrollView>
    );
    }
}
const stylish = StyleSheet.create({
  myview:{
   fontWeight:'bold',
   fontSize:20
  },
  myview1:{
    fontSize:15,
    marginTop:5,
    marginLeft:15,
    lineHeight:30
  },
  italicsView:{
    fontStyle:'italic',
    
  },
  allotedview:{
    flex:4,
    backgroundColor:'#CEC76F',
     borderWidth: .5,
    borderColor: '#7C7676',
    marginTop:35,
    marginBottom:100,
    marginRight:60,
    borderRadius:2,
    marginLeft:30
  },
  box:{
    
     borderWidth: .5,
    borderColor: '#707070',
    borderRadius:3,
    flex:2,
    marginBottom:10,
    marginRight:30,
    alignItems:'center'
  }

});