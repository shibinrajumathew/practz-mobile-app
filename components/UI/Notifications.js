import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';


export default class Notifications extends Component<Props> {
  constructor(props) {
    
       super(props)
    
       this.state = {
    
         notifications: [
           {'name':'Mr. John Koshy','action':' hav published a new exam','date':'08 March 2018 07:25 PM','photo':'./Assets/users_images/1.jpg'},
           
    ],
    notifications1: [
           
           {'name1':'Mrs. Jennifer PJ ','action1':' has reviewed your exam','date1':'08 March 2018 07:25 PM','photo1':'./Assets/users_images/1.jpg'},
            
    ],
     notifications2: [
           
          
            {'name2':'Confidence Academy','action2':' has a new free exam','date2':'08 March 2018 07:25 PM','photo2':'./Assets/users_images/1.jpg'}
    ]
       }
    
     }
 
  render() {
     var notificationList = this.state.notifications.map(function(notification){
                        return  <View style={[styles.greenview]}>
   <View style={[styles.container]}>
        
        <View style={{flex: 1}} >
      <Text>Image</Text>
        </View>
        <View style={{flex:3}}>
     
      <Text style={[styles.namestyle]} >{notification.name} 
      <Text style={[styles.actionstyle]}>{notification.action}</Text>
      </Text>
      <Text style={[styles.datestyle]}> {notification.date}</Text>
        
        </View>
        </View>
        
          </View>;
           })
            

             var notificationList1 = this.state.notifications1.map(function(notification1){
                        return  <View style={[styles.redview]}>
   <View style={[styles.container]}>
        
        <View style={{flex: 1}} >
      <Text>Image</Text>
        </View>
        <View style={{flex:3}}>
     
       <Text style={[styles.namestyle]} >{notification1.name1} 
      <Text style={[styles.actionstyle]}>{notification1.action1}</Text>
      </Text>
      <Text style={[styles.datestyle]}> {notification1.date1}</Text>
        
        </View>
        </View>
        
        
          </View>;
           })

           var notificationList2 = this.state.notifications2.map(function(notification2){
                        return  <View style={[styles.blueview]}>
   <View style={[styles.container]}>
        
        <View style={{flex: 1}} >
      <Text>Image</Text>
        </View>
        <View style={{flex:3}}>
     
       <Text style={[styles.namestyle]} >{notification2.name2} 
      <Text style={[styles.actionstyle]}>{notification2.action2}</Text>
      </Text>
      <Text style={[styles.datestyle]}> {notification2.date2}</Text>
        </View>
        </View>
        
          </View>;
           })
    return (

      <ScrollView style={{backgroundColor:'#FFFFFF',}}>
      <Text style={{fontSize:15,color:'#000000',marginLeft:50}}>Available Exams</Text>
      {notificationList}
      {notificationList1}
{notificationList2}

      </ScrollView>
    );
    }
}
const styles = StyleSheet.create({
  greenview: { 
    
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#7C7676',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    
    shadowRadius: 4,
    backgroundColor:'#EDFEEC'
 
  },
   blueview: { 
    
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#7C7676',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    
    shadowRadius: 4,
    backgroundColor:'#E6EDFA'
   },
   
  redview: { 
    
    borderWidth: .5,
    borderRadius: 5,
    borderColor: '#7C7676',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    opacity: .75,
    backgroundColor:'#F6F4F8'
    

  },
  container: {
    flex: 1,
    flexDirection: 'row',
   
  },

  namestyle:{
    fontSize:12,
    fontWeight:'bold',
    color:'#868686',
    marginTop:10
  },
  actionstyle:{
    fontSize:12,
     color:'#868686',
     marginTop:10,
     fontWeight:'thin',
     opacity:.29
  },
  datestyle:{
 color:'#000000',
 marginTop:5,
 fontSize:12,
 marginBottom:10,
opacity:.29
  }
  
    });