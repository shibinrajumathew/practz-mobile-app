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


        <View style={{flex: 1, backgroundColor:'#00BCD4',marginTop:20,marginRight:20, alignItems: 'center'}} >
          <Text style={{fontSize:10,marginLeft:5,marginTop:2,color:'#FFFFFF'}}>Science and Tech</Text>
        </View>
  </View>
           

            <Text style={{marginLeft: 15,color:'#000000',fontSize:10,marginTop:2}}>{exam.examType} </Text>


               <View style={[styles.line]}/>

              <View style={[styles.container]}>
                  <View style={{flex: 1}} >
                      <Text style={{fontSize:15,marginTop:10,marginLeft:15}}>Total Questions</Text>
                  </View>
                                
                      <View style={{flex: 2}} >
                         <Text style={{fontSize:15,marginTop:10,marginLeft:15,color:'#956FCE'}}>  
                           {exam.noQuestions} </Text>

                       </View>
               </View>

                                

                <View style={[styles.container]}>
                    <View style={{flex: 1,marginLeft:15}} >
                        <Text style={{fontSize:15}}>Time Taken</Text>
                     </View>
                            
                     <View style={{flex: 1}} >
                        <Text style={{fontSize:15,marginLeft:15,color:'#956FCE'}}> 
                           {exam.timeTaken} </Text>

                      </View>
                                          
                      <View style={{flex: 1,width: 20, height: 20,marginRight:20, alignItems: 'center',marginTop:5}} >
                               <Text style ={{backgroundColor:'#CEC76F',color:'#FFFFFF',fontSize:10,alignSelf:'center',marginLeft:30}}> 
                                        Alloted: {exam.allotedTime}
                                </Text>
                      </View>
                </View>



              <View style={[styles.container]}>
                  <View style={{flex: 1,marginBottom:10}} >
                      <Text style={{fontSize:15,marginLeft:15}}>Total Marks</Text>
                  </View>
                                
                      <View style={{flex: 2}} >
                         <Text style={{fontSize:15,marginLeft:15,color:'#956FCE'}}>  
                           4/10 </Text>

                       </View>
               </View>
               <Text style={{fontSize:20,color:'#956FCE',marginLeft:15,marginBottom:10,fontWeight:'bold'}}>{exam.percent}</Text>
      </View>;
})

return (

  <ScrollView style={{backgroundColor:'#FFFFFF'}}>

  {examList}
   <View style={[styles.container]}>
      <View style={{flex:1,color:'#5E3F8C',marginLeft:15}}>
       <Text>correct
         <Text style={{color:'#8BC34A'}}>   04</Text>
        </Text>
  </View>

  <View style={{flex:1,color:'#5E3F8C'}}>
    <Text>wrong
      <Text style={{color:'#EF5350'}}>   04</Text>
     </Text>
  </View>

   <View style={{flex:1,color:'#EF5350'}}>
     <Text>unanswered
       <Text style={{color:'#707070'}}>   04</Text>
     </Text>
   </View>
  </View>
 


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

    marginTop:15
  },
  line:{
        borderBottomColor: '#707070',
        borderBottomWidth: 1,
        fontWeight:'200',
        marginTop:20
  }

    });