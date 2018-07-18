import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';


export default class AvailableExams extends Component<Props> {
  constructor(props) {
    
       super(props)
    
       this.state = {
    
         exams: [
           {'name':'exam1','examType':'Staff Board Exam','timeAllocated':'15 min','questions':10,'ends':'15 July 11:59 pm'},
           {'name':'exam2','examType':'Staff Board Exam','timeAllocated':'15 min','questions':10,'ends':'15 July 11:59 pm'},
           {'name':'exam3','examType':'Staff Board Exam','timeAllocated':'15 min','questions':10,'ends':'15 July 11:59 pm'}
         ]
    
       }
    
     }
 
  render() {
     var examList = this.state.exams.map(function(exam){
                        return  <View style={[styles.myview]}>
   <View style={[styles.container]}>
        
        <View style={{flex: 2}} >
      <Text style={{marginLeft: 15,marginTop:15,color:'#413333',fontSize:20,fontWeight:'bold'}}>{exam.name}</Text>
      </View>
        
        <View style={{flex: 1, backgroundColor:'#00BCD4',marginTop:20,marginRight:20,borderRadius:4, alignItems: 'center'}} >
        <Text style={{fontSize:10,marginLeft:5,marginTop:2,color:'#FFFFFF'}}>Science and Tech</Text>
      </View>
      </View>
     
      <Text style={{marginLeft: 15,color:'#000000',fontSize:10,marginTop:2}}>{exam.examType} </Text>
        
        <Text style={{marginLeft: 15,color:'#000000',fontSize:10,marginTop:7}}>No of Question
          
          <Text style={{color:'#956FCE',fontSize:10,fontWeight:'bold'}}> {exam.questions}
            
            <Text style={{color:'#000000',fontSize:10,marginLeft: 15,fontWeight:'300'}}>         Time Allocated 
             
              <Text style={{marginLeft: 5,color:'#956FCE',fontSize:10,fontWeight:'bold'}}>  {exam.timeAllocated} </Text>
            </Text>
          </Text>
    </Text>
        
        <Text style={{color:'#000000',marginLeft:15,fontSize:7,marginTop:7,marginBottom:10}}>End on {exam.ends}</Text>
          </View>;
           })

    return (

      <ScrollView style={{backgroundColor:'#FFFFFF',}}>
      <Text style={{fontSize:15,color:'#000000',marginLeft:50}}>Available Exams</Text>
      {examList}
      </ScrollView>
    );
    }
}
const styles = StyleSheet.create({
  myview: { 
    
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#7C7676',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
  
  },
  container: {
    flex: 1,
    flexDirection: 'row',
   
  }
  
    });