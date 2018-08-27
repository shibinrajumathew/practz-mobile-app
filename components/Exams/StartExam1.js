import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';

export default class StartExam extends Component {
  constructor(props){
    super(props);
    this.state = {
      scrollViewWidth:0,
      currentXOffset:290
    }
  }

  _handleScroll = (event) => {
    console.log('currentXOffset =', event.nativeEvent.contentOffset.x);
    newXOffset = event.nativeEvent.contentOffset.x
    this.setState({currentXOffset:newXOffset})
  }

  leftArrow = () => {
    eachItemOffset = this.state.scrollViewWidth / 10; // Divide by 10 because I have 10 <View> items
    _currentXOffset =  this.state.currentXOffset - eachItemOffset;
    this.refs.scrollView.scrollTo({x: _currentXOffset, y: 0, animated: true})
  }

  rightArrow = () => {
    eachItemOffset = this.state.scrollViewWidth / 10; // Divide by 10 because I have 10 <View> items
    _currentXOffset =  this.state.currentXOffset + eachItemOffset;
    this.refs.scrollView.scrollTo({x: _currentXOffset, y: 0, animated: true})
  }

  render() {
    //console.log('scrollViewWidth = ', this.state.scrollViewWidth)
    return (
      <View>
        <Text>Page Works!s</Text>

        <View style={{ flexDirection:'row', justifyContent:'center'}}>

          <TouchableHighlight
            style={{alignItems: 'flex-start', paddingTop:20}}
            onPress={this.leftArrow}>
            <Text>a</Text>
          </TouchableHighlight>

          <ScrollView
            contentContainerStyle={{backgroundColor:'yellow', alignItems: 'center'}}
            horizontal={true}
            pagingEnabled={true}
            ref="scrollView"
            onContentSizeChange={(w, h) => this.setState({scrollViewWidth:w})}
            scrollEventThrottle={16}
            scrollEnabled={true} // remove if you want user to swipe
            onScroll={this._handleScroll}
          >
            <View style={styles.somestyle}><Text>1</Text></View>
            <View style={styles.somestyle}><Text>2</Text></View>
            <View style={styles.somestyle}><Text>3</Text></View>
            <View style={styles.somestyle}><Text>4</Text></View>
            <View style={styles.somestyle}><Text>5</Text></View>
            <View style={styles.somestyle}><Text>6</Text></View>
            <View style={styles.somestyle}><Text>7</Text></View>
            <View style={styles.somestyle}><Text>8</Text></View>
            <View style={styles.somestyle}><Text>9</Text></View>
            <View style={styles.somestyle}><Text>10</Text></View>
          </ScrollView>

          <TouchableHighlight
            style={{alignItems: 'flex-end', paddingTop:20}}
            onPress={this.rightArrow}>
            <Text>b</Text>
          </TouchableHighlight>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  somestyle: {
    paddingVertical:10,
    paddingHorizontal:20,
    margin:10,
    borderWidth:1,
    borderRadius:1,
    borderColor:'black'
  }
})
