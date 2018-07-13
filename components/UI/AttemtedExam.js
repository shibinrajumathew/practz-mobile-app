import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';


export default class AttempedExam extends Component<Props> {
  constructor(props) {
    
       super(props)
    
       this.state = {
    
         exams: [
           {'name':'exam1','examType':'Staff Board Exam','timeAllocated':'15 min','noQuestions':10,timeTaken:'06.04mins','allotedTime':'7 mins','percent':'60%','correct':4,'wrong':3,'unattended':3}
           
         ],
         questions: [
         {'questionNo':'Q1','examQuestion':'Which software launched by Union Home Minister Rajnath Singh to do speedy disposal of appeals/Complaints?','chosenAnswer':'call of duty','answer':'God of War'}
         
         
         ]
    
       }
    
     }
 
  render() {
     var examList = this.state.exams.map(function(exam){
                        return  <View style={[styles.myview]}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 2,width: 50, height: 40}} >
      <Text style={{marginLeft: 15,marginTop:15,color:'#413333',fontSize:20,fontWeight:'bold'}}>{exam.name}</Text>
      </View>
        <View style={{flex: 1,width: 20, height: 20, backgroundColor:'#00BCD4',marginTop:20,marginRight:20,borderRadius:4, alignItems: 'center'}} >
        <Text style={{fontSize:10,marginLeft:5,marginTop:2,color:'#FFFFFF'}}>Science and Tech</Text>
      </View>
      </View>
      <Text style={{marginLeft: 15,color:'#000000',fontSize:10,marginTop:2}}>{exam.examType} </Text>
   <View
  style={{
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    fontWeight:'200',
    marginTop:20
  }}
/>
  <Text style={{fontSize:15,marginTop:15,marginLeft:15}}> Total Questions

               <Text style={{color:'#956FCE',fontSize:15,color:'#413333'}}>    {exam.noQuestions}          </Text>
              
          </Text>
                
 <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 4,width: 50, height: 40}} >
      <Text style={{fontSize:15,marginTop:15,marginLeft:15}}>Time Taken
                     <Text style={{fontSize:15,marginTop:15,marginLeft:15,color:'#413333'}}>    {exam.timeTaken} </Text>
                     </Text>
      </View>
        <View style={{flex: 3,width: 20, height: 20,marginTop:15,marginRight:20,borderRadius:4, alignItems: 'center'}} >
        <Text style ={{backgroundColor:'#CEC76F',color:'#FFFFFF',fontSize:10,alignSelf:'center',marginLeft:30}}> 
                           Alloted: {exam.allotedTime}</Text>
      </View>
      </View>
                 
        

        <Text style={{fontSize:15,marginTop:15,marginLeft:15}}> Total Marks

               <Text style={{color:'#956FCE',fontSize:15,color:'#413333'}}>    4/10          </Text>
              
          </Text>
                 <Text style={{color:'#956FCE',marginLeft:20,fontSize:20,color:'#413333'}}>{exam.percent} </Text>
                              
          
                 
  
                 
                 
                 
  </View>;
           })

    return (

      <ScrollView style={{backgroundColor:'#FFFFFF',}}>
    
      {examList}
      <View style={[styles.myview1]}>
         <View style={{flex:1,justifyContent:'space-between',flexDirection:'row',marginLeft:20}}>
                            
         <View style={{flex:1}}>
          <Text>correct
          
          <Text style={{color:'red'}}>   4</Text></Text>
         </View>
          <View style={{flex:1}}>
          <Text>wrong</Text>
         </View>
         <View style={{flex:1}}>
          <Text>unanswered</Text>
         </View>
       </View>
       </View>
      </ScrollView>
      
    );
    }
}
  
  
  
  
  
  
  
         const styles = StyleSheet.create({
                          myview: { 
                            borderWidth: .5,
                            borderColor: '#7C7676',
                            backgroundColor:'#F6F4F8',
                            marginTop: 15,
                            marginBottom: 15
  }

  
    });