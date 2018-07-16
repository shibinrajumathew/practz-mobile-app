import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';


export default class OrderDetails extends Component<Props> {
  constructor(props) {

    super(props)

    this.state = {

      details: [
        {'orderNo':'5896568','orderDate':'08 March 2018 07:25 PM',
        'addressLine1':'Walter White ',
         'addressLine2': 'Mussafah Industial Area Dubai',
         'addressLine3':'Abu Dhabi, United Arab Emirates',
         'addressLine4':'33473',
        'paymentMode': 'CCAvenue Payment Gateway','status': 'Success',
        'trackingId': '307003525660' ,'orderStatus':'Completed','orderAmount':'₹ 20.00',  
        'IGST':'₹ 3.60', 'total':'₹ 23.60', 'roundedOff':'₹ 24.00'


},
         
              ]


    }

  }

  render() {
  var detailList = this.state.details.map(function(detail){
  return  <View>
  <Text style={{color:'#868686',marginLeft:15,marginTop:10}}>Order Details</Text>
    <View style={[styles.myview]}>
      <View style={[styles.container]}>
        <View>
        <Text style={[styles.margin]}>Order No      : </Text>
          <Text style={[styles.margin]}>Order Date   : </Text>
        </View> 
      <View>
            <Text style={[styles.margin]}>{detail.orderNo}</Text>
              <Text style={[styles.margin]}>{detail.orderDate}</Text>
     </View>
  </View>
</View>
      
                
        <Text style={{color:'#868686',marginLeft:15}}>Billing Address</Text>    
   <View style={[styles.myview]}>
<Text style={{marginTop:10}}></Text>
        <Text style={[styles.margin]}>{detail.addressLine1}</Text>
        <Text style={[styles.margin]}>{detail.addressLine2}</Text>
          <Text style={[styles.margin]}>{detail.addressLine3}</Text>
           <Text style={[styles.margin]}>{detail.addressLine4}</Text>
           <Text style={{marginBottom:10}}></Text>
   </View>
 

 <Text style={{color:'#868686',marginLeft:15}}>Payment Details</Text>    
       <View style={[styles.myview]}>
           <View style={[styles.container]}>
              <View style={{flex:10,marginBottom:10}}>
                <Text style={[styles.margin]}>Payment Mode  </Text>
       <Text style={[styles.margin]}>Status </Text>
       <Text style={[styles.margin]}>Tracking Id </Text>
       <Text style={[styles.margin]}>OrderStatus </Text>
               </View>
  <View style={{flex:2,marginBottom:10}}>
               <Text style={[styles.margin]}>: </Text>
               <Text style={[styles.margin]}>: </Text>
               <Text style={[styles.margin]}>: </Text>
                <Text style={[styles.margin]}>: </Text>
               </View>

<View style={{flex:20}}>
              <Text style={[styles.margin]}>{detail.paymentMode} </Text>
      <Text style={[styles.margin]}>{detail.status} </Text>
      <Text style={[styles.margin]}>{detail.trackingId }</Text>
      <Text style={[styles.margin]}>{detail.orderStatus}  </Text>
               </View>

              
           </View>
        </View>


        <Text style={{color:'#868686',marginLeft:15}}>Product Details

</Text>    
       <View style={[styles.myview]}>
           <View style={[styles.container]}>
              <View style={{flex:13,marginBottom:10}}>
                <Text style={[styles.margin]}>CLAT Coaching, Law   </Text>
       <Text style={[styles.margin]}>IGST </Text>
       <Text style={[styles.margin]}>Total </Text>
       <Text style={[styles.margin]}>Total (rounded off) </Text>
               </View>
  <View style={{flex:2,marginBottom:10}}>
               <Text style={[styles.margin]}>: </Text>
               <Text style={[styles.margin]}>: </Text>
               <Text style={[styles.margin]}>: </Text>
                <Text style={[styles.margin]}>: </Text>
               </View>

<View style={{flex:20}}>
              <Text style={[styles.margin]}>{detail.orderAmount} </Text>
      <Text style={[styles.margin]}>{detail.IGST} </Text>
      <Text style={[styles.margin]}>{detail.total }</Text>
      <Text style={[styles.margin]}>{detail.roundedOff}  </Text>
               </View>

              
           </View>
        </View>
      </View>;
})

return (

  <ScrollView style={{backgroundColor:'#FFFFFF'}}>

  {detailList}
   
  </ScrollView>

);
}
}







const styles = StyleSheet.create({
  myview: { 
    borderWidth: .5,
    borderColor: '#7C7676',
    backgroundColor:'#FBF7FD',
    marginTop: 15,
    marginBottom:15,
   
  },
  
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop:10,
    marginBottom:10
  },
  
   margin:{
    marginLeft:15,
    marginTop:5,
    fontSize:12,fontWeight:'400'
    ,color:'#000000'
   }

    });