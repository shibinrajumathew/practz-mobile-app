import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import styles from './Assets/Style';
export default class AttempedExam extends Component<Props> {
  constructor(props) {

    super(props)

    this.state = {

      exams: [
        {'name':'exam1','examSubject':'science and tech','examType':'Staff Board Exam','timeAllocated':'15 min','noQuestions':10,
        timeTaken:'06.04min','allotedTime':'7 mins','percent':60,'correct':4,'wrong':3,'unattended':3}

      ],
      questions:[
        {'questionNo':'Q3','question':' Which software launched by Union Home Minister  Rajnath Singh to do speedy disposal of appeals/Complaints?','chosenAnswer':' god of war', 'correctAnswer':'call of duty'}
       
       
     ]


    }

  }

  render() {
    const barWidth = Dimensions.get('screen').width - 30;
  var examList = this.state.exams.map(function(exam){
  return <View key={(exam, index) => index.toString()} >
   <View style={[styles.announcementbox,styles.grey]}>
    <View style={[styles.flexrow]}>
    <View style={{ flex:1}} >
      <Text style={[styles.heavyFont,styles.boldFont,styles.blackFont,styles.margins]}>{exam.name}</Text>
    </View> 
         <View style={[styles.sideBotton, styles.brightBlue,styles.margins]} >
           <Text style={[styles.bookFont,styles.whiteFont]}>{exam.examSubject}</Text>
        
         </View>
  </View>
           

            <Text style={[styles.margins,styles.lightFont,stylish.mymargin]}>{exam.examType} </Text>


               <View style={[styles.line]}/>

              <View style={[styles.flexrow]}>
                  <View style={{flex:6}}>
                      <Text style={[stylish.font]}>Total Questions</Text>
                      <Text style={[stylish.font]}>Time Taken</Text>
                      <Text style={[stylish.font]}>Total Marks</Text>
                      <Text style={[styles.lightFont,styles.percentage,styles.margins,styles.count]}>{exam.percent}%</Text>
                      <View style={{marginLeft:15,marginRight:15}}><ProgressBarAnimated
            width={barWidth}
            value={exam.percent}
            backgroundColorOnComplete="#6CC644"
            backgroundColor="#956FCE"
          /></View>
                       </View> 
                      <View style={{flex:3}}>
                         <Text style={[stylish.fontcolor]}>  
                           {exam.noQuestions} </Text>
                       <Text style={[stylish.fontcolor]}>
                           {exam.timeTaken} </Text>
                           <Text style={[stylish.fontcolor]}>  
                           4/10 </Text>
                       </View>
                       

                       <View style={[stylish.allotedview]}>
                       <Text style ={{color:'#FFFFFF',fontSize:10,alignSelf:'center'}}> 
                                        Alloted: {exam.allotedTime}
                                </Text>
                       
                       </View>
               </View>
         </View>
         <View style={[styles.flexrow,styles.margins]}>
      <View style={{flex:4,marginLeft:15}}>
      <Text style={[styles.violetFont]}>correct</Text>
         </View>
         <View style={[stylish.box,styles.lightgreen]}>
         <Text style={[styles.whiteFont]}> {exam.correct}</Text>
        
  </View>

  <View style={{flex:3}}>
  <Text style={[styles.violetFont]}>wrong</Text>
    </View>
   <View style={[stylish.box,styles.red]}>
   <Text style={[styles.whiteFont]}> {exam.wrong}</Text>
     
  </View>

   <View style={{flex:5}}>
   <Text style={[styles.violetFont]}>unattended </Text>
   </View>
   <View style={[stylish.box]}>
   <Text >{exam.unattended}</Text>
     
   </View>
  </View>
  <View styles={[styles.line]}/>

 

  
      </View>
      })

       var questionList = this.state.questions.map(function(question){
        return <View key={(exam, index) => index.toString()} >

 <View style={[styles.announcementBox]}>
     <View style={[styles.flexrow]}>
         <View style={{flex:1}}>
            <Text style={[styles.boldFont]}>{question.questionNo}</Text>
          </View>
          
         <View style={{flex:9}}>
          <Text style={{color:'#413333',lineHeight:20}}>
              {question.question}
          </Text>
          <View style={[styles.flexrow]}>
  <View style={{flex:4}}> 
  <Text style={{color:'#000000'}}>
  ChosenAnswer</Text>
  </View>
  <View style={{flex:3}}>
  <Text style={{color:'#000000',fontWeight:'bold'}}>
  {question.chosenAnswer}</Text>
  </View>
  <View style={{flex:3,marginRight:15}}>
  <Text style={{color:'#956FCE'}}>
  explanation </Text>
  </View>
  </View> 

  <View style={[styles.flexrow]}>
  <View style={{flex:2}}> 
  <Text style={{color:'#000000'}}>
  Correct Answer</Text>
  </View>
  <View style={{flex:3}}>
  <Text style={{color:'#000000',fontWeight:'bold'}}>
   {question.correctAnswer}
  </Text>
  </View>
  </View>
  </View>
        </View>
  </View>

        </View>;
})

return (

  <ScrollView style={{backgroundColor:'#FFFFFF'}}>
  {examList}
  {questionList}
  </ScrollView>

);
}
}

const stylish = StyleSheet.create({
  mymargin:{
    marginTop:2
  },font:{
    fontSize:15,
    marginTop:5,
    marginLeft:15, 
    color: '#000'
  },
  fontcolor:{
    fontSize:15,
    marginTop:5,
    color:'#956FCE',
    
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