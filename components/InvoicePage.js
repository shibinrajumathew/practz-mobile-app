/* @flow */
import Icon from 'react-native-ionicons';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import React, { Component } from 'react';
import {sessionDestroy,noBack} from './Functions';
import styles from './Assets/Style';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
export default class InvoicePage extends Component {
  constructor() {
    super();
    this.state = {
      BadgeCount: 5,
      progress: 60,
      progressWithOnComplete: 0,
      progressCustomized: 0,
    }
  }
  static navigationOptions = {
    title: "CheckOut",
    headerRight:(
    <View>
      <Icon name={'md-cart'} style={{marginRight: 20,color:'#5e3f8c',}} />
    </View>),
    headerTitleStyle:{
      color:'#5e3f8c',
      textAlign: 'center',
    },
};
  render() {
    const barWidth = (Dimensions.get('screen').width / 2) - 30;
    const progressCustomStyles = {
      backgroundColor: 'red',
      borderRadius: 0,
      borderColor: 'orange',
    };
    return (
      <View style={[styles.container,styles.flexcol]}>

        <View style={[styles.flexrow,styles.totalWidth]}>
          <View style={[styles.productLeftBox]}>
            <Text>Product Details</Text>
          </View>
          <View style={[styles.productRightBox]}>
            <Text>Amount</Text>
          </View>
          </View>
        <View style={[styles.flexrow,styles.totalWidth]}>
          <View style={[styles.productLeftBox]}>
            <Text  style={[styles.blackFont]}>Sell 2.7</Text>
          </View>
          <View style={[styles.productRightBox]}>
            <Text  style={[styles.blackFont]}>$41</Text>
          </View>
          </View>
        <View style={[styles.flexrow,styles.totalWidth]}>
          <View style={[styles.productLeftBox]}>
            <Text  style={[styles.blackFont]}>CGST 9%</Text>
          </View>
          <View style={[styles.productRightBox]}>
            <Text  style={[styles.blackFont]}>$9</Text>
          </View>
          </View>
        <View style={[styles.flexrow,styles.totalWidth]}>
          <View style={[styles.productLeftBox]}>
            <Text  style={[styles.blackFont]}>SGST 9%</Text>
          </View>
          <View style={[styles.productRightBox]}>
            <Text style={[styles.blackFont]}>$9</Text>
          </View>
          </View>
        <View style={[styles.flexrow,styles.totalWidth]}>
          <View style={[styles.productLeftBox]}>
            <Text style={[styles.boldFont,styles.blackFont]}>Total</Text>
          </View>
          <View style={[styles.productRightBox]}>
            <Text style={[styles.boldFont,styles.blackFont]}>$50.25</Text>
          </View>
          </View>
        <View style={[styles.flexrow,styles.totalWidth]}>
          <View style={[styles.productLeftBox]}>
            <Text style={[styles.boldFont,styles.blackFont]}>Total (rounded off)</Text>
          </View>
          <View style={[styles.productRightBox]}>
            <Text style={[styles.boldFont,styles.blackFont]}>$50</Text>
          </View>
          </View>
          <View style={[styles.flexrow,styles.totalWidth]}>
            <View style={[styles.productLeftBox,styles.green]}>
              <TouchableOpacity
                title="Home" style={[styles.buttonContainerLogin]}
              >
                <Text style={[styles.buttonText]} >Buy</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.productRightBox,styles.lightBlue]}>
              <TouchableOpacity
                title="Home" style={[styles.buttonContainerLogin]}
              >
                <Text style={[styles.buttonText]} >Cancel</Text>
              </TouchableOpacity>
            </View>



          </View>
      </View>

    );
  }
}
