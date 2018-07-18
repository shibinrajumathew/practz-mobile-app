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
        {'name':'exam1','examType':'Staff Board Exam','timeAllocated':'15 min','noQuestions':10,
        timeTaken:'06.04mins','allotedTime':'7 mins','percent':'60%','correct':4,'wrong':3,'unattended':3}

      ]


    }

  }

  render() {
  var examList = this.state.exams.map(function(exam){
  return <View>
   <View style={[styles.myview]}>
  

  <View style={[styles.container]}>
    <View style={{flex: 2}} >
      <Text style={{marginLeft: 15,marginTop:15,color:'#413333',fontSize:20,fontWeight:'bold'}}>{exam.name}</Text>
    </View> 


        <View style={{flex: 1, backgroundColor:'#00BCD4',marginTop:20,marginRight:20, alignItems: 'center'}} >
          <Text style={{fontSize:10,marginLeft:5,marginTop:2,color:'#FFFFFF'}}>Science and Tech</Text>
        </View>
  </View>
           

            <Text style={{marginLeft: 15,color:'#000000',fontSize:10,marginTop:2}}>{exam.examType} </Text>


               <View style={[styles.line]}/>

              <View style={[styles.container]}>
                  <View>
                      <Text style={[styles.font]}>Total Questions</Text>
                      <Text style={[styles.font]}>Time Taken</Text>
                      <Text style={[styles.font]}>Total Marks</Text>
                       <Text style={{fontSize:20,color:'#956FCE',fontWeight:'bold'}}>{exam.percent}</Text>
                  </View>
                                
                      
                      <View>
                         <Text style={[styles.fontcolor]}>  
                           {exam.noQuestions} </Text>
                       <Text style={[styles.fontcolor]}>
                           {exam.timeTaken} </Text>
                           <Text style={[styles.fontcolor]}>  
                           4/10 </Text>
                       </View>
                       

                       <View style={[styles.allotedview]}>
                       <Text style ={{color:'#FFFFFF',fontSize:10,alignSelf:'center',margin:3}}> 
                                        Alloted: {exam.allotedTime}
                                </Text>
                       </View>
               </View>
         </View>
         <View style={[styles.container]}>
      <View style={{flex:2,color:'#5E3F8C',marginLeft:15}}>
       <Text>correct</Text>
         </View>
         <View style={[styles.correctview]}>
         <Text style={{color:'#8BC34A'}}> {exam.correct}</Text>
        
  </View>

  <View style={{flex:2,color:'#5E3F8C'}}>
    <Text>wrong</Text>
    </View>
     <View style={[styles.wrongview]}>
      <Text style={{color:'#EF5350'}}> {exam.wrong}</Text>
     
  </View>

   <View style={{flex:3,color:'#EF5350'}}>
     <Text>unattended </Text>
   </View>
   <View style={[styles.unattendview]}>
       <Text style={{color:'#707070'}}>{exam.unattended}</Text>
     
   </View>
  </View>
      </View>;
})

return (

  <ScrollView style={{backgroundColor:'#FFFFFF'}}>

  {examList}
   
 


  <View style={[styles.myquestion]}>
     <View style={[styles.container]}>
         <View style={{flex:1}}>
            <Text style={{fontWeight:'bold',marginLeft:10}}>Q3.
            </Text>
          </View>
          
         <View style={{flex:9}}>
          <Text style={{color:'#413333',lineHeight:20}}>
              Which software launched by Union Home Minister Rajnath Singh to do speedy disposal of
              appeals/Complaints?
          </Text>
        </View>
  </View>

  <View style={[styles.container]}>
  <View style={{flex:4,marginLeft:25,marginRight:20}}> 
  <Text style={{color:'#000000',marginLeft:10}}>
  ChosenAnswer

  </Text>
  </View>
  <View style={{flex:3}}>
  <Text style={{color:'#000000',fontWeight:'bold'}}>
  god of war
  </Text>
  </View>

  <View style={{flex:3,marginRight:15}}>
  <Text style={{color:'#956FCE'}}>
  explanation
  </Text>
  </View>
  </View> 

  <View style={[styles.container]}>
  <View style={{flex:2,marginLeft:20}}> 
  <Text style={{color:'#000000',marginLeft:15}}>
  Correct Answer

  </Text>
  </View>
  <View style={{flex:3,marginLeft:5}}>
  <Text style={{color:'#000000',fontWeight:'bold'}}>
   call of Duty
  </Text>
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
  },
  myquestion: { 
    borderWidth: .5,
    borderColor: '#7C7676',
    backgroundColor:'#FFFFFF',
    marginTop: 15,
    marginBottom:15
  } ,
  container: {
    flex: 1,
    flexDirection: 'row',
    marginLeft:15,
    marginTop:5,
    marginBottom:10
  },
  line:{
        borderBottomColor: '#707070',
        borderBottomWidth: 1,
        fontWeight:'200',
        marginTop:20
  },
  font:{
    fontSize:15,
    marginTop:5
  },
  fontcolor:{
    fontSize:15,
    marginTop:5,
    color:'#956FCE',
    marginLeft:10
  },
  allotedview:{
    backgroundColor:'#CEC76F',
     borderWidth: .5,
    borderColor: '#7C7676',
    
    marginLeft:5,
    marginTop:30,
    marginBottom:50,borderRadius:3
  },
  correctview:{
    backgroundColor:'green',
     borderWidth: .5,
    borderColor: '#7C7676',
    borderRadius:3,
    flex:2,
    marginBottom:5,
    marginRight:10
  },
   wrongview:{
    flex:2,
    backgroundColor:'',
     borderWidth: .5,
    borderColor: '#7C7676',
    borderRadius:3,
    marginBottom:10,
    marginRight:10
  },
   unattendview:{
  flex:3,
     borderWidth: .5,
    borderColor: '#7C7676',
    borderRadius:3,
    marginRight:15,
    marginBottom:10
  }


    });