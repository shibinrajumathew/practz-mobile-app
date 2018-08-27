/* @flow */
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import React, { Component } from 'react';
import styles from './Assets/Style';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
  Alert,
  BackHandler,
  Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import URL from './Url';
import {sessionDestroy,noBack} from './Functions';

export class LandingPage extends Component {
  constructor(){
    super();
    this.state = {isMounted: false}
    // const { navigate } = this.props.navigation;
    classthis=this;
    this.state={
      HOME:URL.HOME,
      AVAILABLE_EXAM:URL.AVAILABLE_EXAM,
      ONGOING_EXAM:URL.ONGOING_EXAM,
      PRODUCT:URL.PRODUCT,
      ADDTOCART:URL.ADDTOCART,
      status:'',
      view:'',
      eid:0,
      eprod:'',
      qname:'',
      exp:'',
      checkFlag:0,
      checkFlagProgress:0,
      checkFlagProduct:0,
      productData: [
        "name":" ",
        "attributes":"",
        "questionPaperName":"",
        "amountWithCurrencySymbol":"",
      ],
      progressData: [
        "name":"",
        "id":" ",
        "percentageCompleted":0,
        "questionPaperName":"",
      ],
      availableExamList:[
        {
          "questionPaperName": "",
          "examProductName": "",
          "expiryDate": "",
          attributes:{
            questionPaperName:""
          }
        }
      ]
    }
  }

  componentWillMount() {
    AsyncStorage.multiGet(['userId']).then((data) => {
      fetch(this.state.HOME+this.state.AVAILABLE_EXAM+'userId='+data[0][1]+'')
      .then(response =>  response.json())
      .then(responseobj => {
        if("status" in responseobj){
          if(responseobj.status==401){
            sessionDestroy();
            noBack(this.props,'Login');
          }
          }else {
              if((responseobj.data)=== undefined ||(responseobj.data.length<1)){
                this.setState({
                  status:'No active exams available now. Please check later.',
                  checkFlag:1,
                  view:'',
                  availableExamList:[
                    {
                      "questionPaperName": "",
                      "examProductName": "",
                      "expiryDate": "",
                      "attributes": {
                        "questionPaperName": "",
                        "examPublisherName": "",
                        "qpSections": [],
                        "republishStatus": ''
                      },
                    }
                  ],
                  eid:0,
                  eprod:'',
                  qname:'',
                  exp:'',
                });
              }else{
                  this.setState({
                    checkFlag:2,
                    status:'Available exams',
                    view:'View all',
                    availableExamList:responseobj.data,
                  });
                }
            }
      });
    });

    //for progressing exams
    AsyncStorage.multiGet(['userId','organizationId']).then((data) => {
      fetch(this.state.HOME+this.state.ONGOING_EXAM+'userId='+data[0][1]+'&orgId='+data[1][1]+'')
      .then(response =>  response.json())
      .then(p_responseobj => {
          if(p_responseobj==401){
            sessionDestroy();
            noBack(this.props,'Login');
            this.props.navigation.navigate('Loign');
          }
        if((p_responseobj.data)=== undefined ||(p_responseobj.data.length<1)){
          this.setState({
            status:'No active exams available now. Please check later.',
            checkFlagProgress:1,
            view:'',
            progressData: [
              {
                "percentageCompleted": 0,
                "id":"",
                "questionPaperName": "",
              }
            ],
            eid:0,
            eprod:'',
            qname:'',
            exp:'',
          });
        }else{
            this.setState({
              checkFlagProgress:2,
              progressData:p_responseobj.data,
            });
          }
      });
      //buy product
      fetch(this.state.HOME+this.state.PRODUCT+'GwTemplateId=catalog&userId='+data[0][1]+'&organizationId='+data[1][1]+'')
      .then(response =>  response.json())
      .then(responseProduct => {
        if((responseProduct.data)=== undefined ||(responseProduct.data.length<1)){
          this.setState({
            checkFlagProduct:1,
          })
        }else {
          this.setState({
            checkFlagProduct:2,
            productData:responseProduct.data,
          })
        }
      })
      //buy product ends
    });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return BackHandler.exitApp();
  }

  addItemToCart(id){
    AsyncStorage.multiGet(['userId','organizationId']).then((data) => {
      fetch(this.state.HOME+this.state.ADDTOCART+data[0][1]+'/product/'+id+'/organization/'+data[1][1]+'')
      .then(response => {
        console.log("status req:",response.status);
        if(response.status){
          this.props.navigation.navigate('InvoicePage',{pId:id});
        }
      })
    });
  }

  render() {
    const barWidth = Dimensions.get('screen').width - 30;
    const progressCustomStyles = {
      backgroundColor: 'red',
      borderRadius: 0,
      borderColor: 'orange',
    };
    {
      this.state.checkFlagProduct==1||this.state.checkFlagProduct==0
      ? productList = this.state.productData.map((product, index) => {
        return(<View key={index.toString()+"checkflag"} ></View>);
      })
      :
      productList = this.state.productData.map((product, index) => {
        return(
          <TouchableOpacity onPress={()=>this.addItemToCart(product.id)} key={index.toString()} >
            <View style={[styles.topBox, styles.blue]}>
              <Text style={[styles.whiteFont,styles.boldFont]}>{product.name}</Text>
              <Text style={[styles.whiteFont]}>Starts on: {product.startDate}</Text>
              <Text style={[styles.whiteFont]}>Ends on: {product.endDate}</Text>
              <Text style={[styles.whiteFont,styles.boldFont]}> {product.amountWithCurrencySymbol}</Text>
            </View>
          </TouchableOpacity>
        );
      });

      this.state.checkFlag==1||this.state.checkFlag==0
      ? examList = this.state.availableExamList.map((exam, index) => {
        return(<View key={index.toString()+"checkflag"} ></View>);
      })
      :
      examList = this.state.availableExamList.map((exam, index) => {
        return(
          <View key={index.toString()} >
          {
            (this.state.checkFlagProgress==1||this.state.checkFlagProgress==0)
            ?<TouchableOpacity style={[styles.announcementBox, styles.flexrow]}
              onPress={() => this.props.navigation.navigate('ExamDetails',{eid:exam.id,onprogress:false,eprod:exam.examProductName,qname:exam.attributes.questionPaperName})} >
              <View style={[styles.flexcol, styles.innerTextBox]} >
                <Text style={[styles.topTitle]}>{exam.attributes.questionPaperName}</Text>
                <Text style={[styles.lightFont]} >{exam.examProductName}</Text>
                <View style={[styles.flexrow]}>
                  <Text style={[styles.totalWidth]}>Ends on {exam.expiryDate}</Text>
                </View>
              </View>
            </TouchableOpacity>
            :
            <TouchableOpacity style={[styles.announcementBox, styles.flexrow]} disabled={true} >
              <View style={[styles.flexcol, styles.innerTextBox]} >
                <Text style={[styles.topTitle]}>{exam.attributes.questionPaperName}</Text>
                <Text style={[styles.lightFont]} >{exam.examProductName}</Text>
                <View style={[styles.flexrow]}>
                  <Text style={[styles.totalWidth]}>Ends on {exam.expiryDate}</Text>
                </View>
              </View>
            </TouchableOpacity>
          }
          </View>
        );
      });

      this.state.checkFlagProgress==1||this.state.checkFlagProgress==0
      ? progressList = this.state.progressData.map((exam, index) => {
        return(<View key={index.toString()} ></View>);
      })
      :
      progressList = this.state.progressData.map((exam, index) => {
        return(
          <View style={[styles.announcementBox, styles.flexrow]} key={index.toString()} >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ExamDetails',{eid:exam.id,onprogress:true,eprod:exam.questionPaperName,qname:exam.questionPaperName})} >
              <View>
                <Text style={[styles.bookFont,styles.blackFont,styles.boldFont]} >On progressing exam: {exam.questionPaperName}</Text>
              </View>
              <View >
                <ProgressBarAnimated
                  width={barWidth}
                  value={exam.percentageCompleted}
                  backgroundColorOnComplete="#6CC644"
                  backgroundColor="#6CC644"
                />
              </View>
              <View  >
                <Text style={[styles.bookFont,styles.blackFont]} >{exam.percentageCompleted}%</Text>
              </View>
              <View style={[styles.sideBotton, styles.brightBlue]} >
                <Text style={[styles.bookFont,styles.whiteFont]} >Continue</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      });
    }

    return (
      <ScrollView>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.flexrow}>
          {productList}
        </ScrollView>
        {progressList}
        <View style={[styles.announcementBox, styles.flexrow]}>
            <View >
              <Image style={{ marginTop: 10 }} source={require('./Assets/images/announcements.png')}/>
            </View>
          <View style={[styles.flexcol, styles.innerTextBox]} >
            <Text style={[styles.heavyFont,styles.boldFont,styles.blackFont]}>Take a free test</Text>
            <Text style={[styles.lightFont]} >Lorem ipsum dolor sit amet, consectetur adipisci</Text>
            <View style={[styles.flexrow]}>
              <Text style={[styles.endFont]}>TRY NOW</Text>
            </View>
          </View>
        </View>
      <View style={[styles.flexrow, styles.availableBox]}>
        <Text style={{ fontWeight: 'bold', color: '#000', flex: 3 }}>{this.state.status}</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AvailableExams',{checkFlag:this.state.checkFlagProgress})}><Text  style={{ color: '#676262', flex: 1, }}>{this.state.view}</Text></TouchableOpacity>
      </View>
      {examList}
    </ScrollView>
  );
}
}
