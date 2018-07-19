import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';


export default class MyOrders extends Component<Props> {
  constructor(props) {

    super(props)

    this.state = {

      orders: [
        {'orderNo':'PZINCO00406','date':'08 March 2018 07:25 PM','orderName':'CLAT Coaching, Law',
        'examType':'Staff Board Exam','orderStatus':'sucessfull','amount':'240'},
         {'orderNo':'PZINCO00406','date':'08 March 2018 07:25 PM','orderName':'CLAT Coaching, Law',
        'examType':'Staff Board Exam','orderStatus':'sucessfull','amount':'240'},
         {'orderNo':'PZINCO00406','date':'08 March 2018 07:25 PM','orderName':'CLAT Coaching, Law',
        'examType':'Staff Board Exam','orderStatus':'sucessfull','amount':'240'},
         {'orderNo':'PZINCO00406','date':'08 March 2018 07:25 PM','orderName':'CLAT Coaching, Law',
        'examType':'Staff Board Exam','orderStatus':'sucessfull','amount':'240'},{'orderNo':'PZINCO00406','date':'08 March 2018 07:25 PM','orderName':'CLAT Coaching, Law',
        'examType':'Staff Board Exam','orderStatus':'sucessfull','amount':'240'}
              ]


    }

  }

  render() {
  var orderList = this.state.orders.map(function(order){
  return  <View style={[styles.myview]}>
            <View style={[styles.container]}>
                <View style={{flex: 1}} >
      <Text style={{marginLeft: 15,fontSize:12,fontWeight:'400',color:'#413333'}}>Order No  {order.orderNo}</Text>
                 </View> 


                <View style={{flex: 1 }} >
                  <Text style={{fontSize:10,marginRight:5,fontWeight:'300',marginLeft:15,color:'#000000'}}>{order.date}</Text>
               </View>
            </View>

           <View style={[styles.line]}/>

              <View style={[styles.container]}>
                  <View style={{flex: 4}} >
                      <Text style={{fontSize:15,marginLeft:15,fontWeight:'bold',color:'#413333'}}>{order.orderName}</Text>
                      <Text style={{fontSize:15,fontSize:15,marginLeft:15,color:'#000000'}}>{order.examType}</Text>
                  </View>
                                
                      <View style={{flex: 1}} >
                         <Text style={{fontSize:20,marginTop:10,color:'#00BCD4'}}>  {'\u20B9'}
                           {order.amount} </Text>

                       </View>
               </View>

                       
                            
                           <Text style={{marginLeft:15,marginTop:5}}> 
                           Order Status 
                           <Text style={{color:'#413333'}}>  {order.orderStatus} </Text>
                           </Text>

      </View>;
})

return (

  <ScrollView style={{backgroundColor:'#FFFFFF'}}>

  {orderList}
   
  </ScrollView>

);
}
}







const styles = StyleSheet.create({
  myview: { 
    borderWidth: .5,
    borderColor: '#7C7676',
    
    marginTop: 15,
    marginBottom:15,
    marginLeft:10,
    marginRight:10
  },
  
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop:10
  },
  line:{
       
       fontWeight:'100',
        borderBottomWidth: 0.5,
        fontWeight:'thin',
        marginTop:20
  }

    });