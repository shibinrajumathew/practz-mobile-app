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
           {'examType':'Bank','attended':8,'passed':6,},
           {'examType':'Current Affairs','attended':4,'passed':3,},
           {'examType':'Chemistry','attended':8,'passed':5,},
           {'examType':'MicroBiology','attended':6,'passed':5,}
    ]
       }

     }

  render() {
     var examList = this.state.exams.map(function(exam){
                        return <View>
                        <Text style={{marginTop:15,marginLeft:20,fontWeight:'bold',color:'#000000',fontSize:20}}>{exam.examType}</Text>


                        <View style={[styles.container]}>
        <View style={{flex:1}} >
      <Text style={{color:'#848484'}}>Attended
        <Text style={{color:'#956FCE',fontWeight:'bold'}}>  {exam.attended}</Text>
      </Text>
      </View>
        <View style={{flex: 3}} >
        <Text style={{color:'#848484',fontWeight:'bold'}}>Passed
         <Text style={{color:'#956FCE',fontWeight:'bold'}}>  {exam.passed}</Text>
        </Text>
      </View>
      </View>
<View style={[styles.line]}>
</View>
          </View>;
           })

    return (

      <ScrollView style={{backgroundColor:'#FFFFFF',}}>

      {examList}
      </ScrollView>
    );
    }
}
const styles = StyleSheet.create({

  container:{

    flex:1,
    flexDirection:'row',
   marginTop:5,
   marginLeft:20
  },
   line:{
    color: '#707070',
    borderBottomWidth: 1,
    fontWeight:'200',
    marginTop:10

      }

    });
