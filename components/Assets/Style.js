import React, {
  Dimensions,
  StyleSheet,
} from 'react-native';

export default StyleSheet.create({
  //box or tab
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  topBox: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 10,
    padding: 10,
    width: (Dimensions.get('window').width / 1.5),
    height: Dimensions.get('window').height / 5,

  },
  announcementBox: {
    borderRadius: 5,
    borderBottomWidth: 0.8,
    borderColor: '#d6d6d6',
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 1,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 3,
    padding: 10,
    width: (Dimensions.get('window').width) - 4,

  },
  timmingBox:{
    width: Dimensions.get('window').width,
    padding: 10,

  },
  examBox: {
    borderRadius: 5,
    borderBottomWidth: 0.8,
    borderColor: '#d6d6d6',
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 1,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 3,
    padding: 10,
    width: (Dimensions.get('window').width) - 4,
    backgroundColor: '#ffffff',

  },
  questionButton:{
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    width: Dimensions.get('screen').width/3.5,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
  },
  questionBox:{
    padding: 10,
    width: (Dimensions.get('window').width) - 40,
  },
  answers:{
    borderBottomWidth: 1,
    padding: 10,
    borderColor: '#cbcbcb',
    height: 50
  },
  innerTextBox: {
    padding: 10,
    width: (Dimensions.get('window').width) - 40,
    flex: 1,
  },
  attemptedBox: {
    width: (Dimensions.get('window').width) - 10,
    flex: 1,
  },
  availableBox: {
    padding: 10,
    width: (Dimensions.get('window').width),
  },
  productLeftBox:{
    borderBottomWidth: 1,
    borderBottomColor: "#cfcfcf",
    padding: 10,
    marginLeft: 10,
    flex:2,
  },
  productRightBox:{
    flex:1,
    borderBottomColor: "#cfcfcf",
    padding: 10,
    borderBottomWidth: 1,
  },
  sideBotton: {
    borderRadius: 8,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 3,
    width: 120,
    height: 30,
    alignItems: 'center',

  },
  negativeButton: {
    borderRadius: 8,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 50,
    height: 20,
    alignItems: 'center',

  },
  messageTab: {
    fontFamily: 'Avenir,Heavy',
    fontWeight: '800',
    marginRight: 80,
    marginLeft: 10,
  },
  addChat: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,1)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    marginLeft: 10,
    marginTop: 3,
    backgroundColor: '#0fa8bd',
    borderRadius: 60,
    borderStyle: 'dashed',
  },
  roundDP: {
    borderRadius: 30,
    borderBottomWidth: 0.8,
    borderColor: '#d6d6d6',
    marginLeft: 10,
    marginTop: 3,
    padding: 10,
    width: 60,
    height: 60,

  },
  textInsideCircle:{
    position: 'absolute',
    top: 0,
    left: 0,
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionUnattended: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#a4a2a2',
    backgroundColor: 'white',
    width: 18,
    height: 18,
    marginRight: 5,
    marginLeft: 5,

  },
  questionForReview: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00BCD4',
    backgroundColor: '#00BCD4',
    width: 18,
    height: 18,
    marginLeft: 5,
    marginRight: 5,
  },
  questionAttended: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8BC34A',
    backgroundColor: '#8BC34A',
    width: 18,
    height: 18,
    marginLeft: 5,
    marginRight: 5,
  },
  tickedNumber:{
    alignItems: 'center',
    top: 0,
    justifyContent: 'center',
    width: 16,
    height: 16,
    opacity: 1
  },
  timmer:{
    alignItems: 'center',
    top: 0,
    justifyContent: 'center',
    width: 50,
    height: 50,
    opacity: 1
  },
  shadowContainer: {
    padding: 20,
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  profileSetting: {
    marginLeft: 10,
    borderBottomWidth: 1,
    marginRight: 10,
    padding: 15,
  },
  profileView: {
    borderRadius: 51,
    width: 102,
    height: 102,
    marginLeft: 10,
    marginTop: 10,
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  profileDP: {
    borderRadius: 50,
    width: 100,
    height: 100,
    padding: 2,
    borderWidth: 2,
    borderColor: 'white',
  },
  msgDescription: {
    marginLeft: 10
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: 60,
    padding: 20,
    backgroundColor: '#5E3F8C',
  },
  totalWidth:{
    width:Dimensions.get('screen').width-40,
  },
  buttonContainer: {
    width:(Dimensions.get('screen').width/2)-20,
    padding: 15,
    marginRight: 10,
    },
  buttonContainerLogin: {
      padding: 15,

    },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  //fonts
  topTitle: {
    fontFamily: 'Avenir, Heavy',
    fontWeight: 'bold',
    color: '#000'
  },
  lightFont: {
    fontFamily: 'Avenir, Light'
  },

  heavyFont: {
    fontFamily: 'Avenir, Heavy'
  },
  bookFont: {
    fontFamily: 'Avenir, Book'
  },
  count: {
    color: '#956FCE',
    fontWeight: '600',
  },
  percentage: {
    fontWeight: '500',
    color: 'blue'
  },
  LargeFont: {
    fontWeight: '500',
  },
  boldFont: {
    fontWeight: 'bold',
  },
  whiteFont: {
    color: '#ffffff'
  },
  blackFont: {
    color: '#000'
  },
  blueFont:{
    color:'#956FCE'
  },
  brownFont:{
    color:'#868686'
  },
  endFont: {
    fontWeight: 'bold',
    color: '#956FCE'
  },
  lightTitle: {
    fontFamily: 'Avenir, Book',
    color: 'black'
  },
  examInstructions:{
    marginTop:10,
    flex: 1,
    flexWrap: 'wrap'
  },
  indicator: {
    color: '#956FCE', fontWeight: '600'
  },
  addChatPlus: {
    fontSize: 28, color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tickedNumberColor:{
    color: "rgba(255, 255, 255, 0.82)"
  },
  //font color
  greenFont:{
    color: '#6CC644',
  },
  redFont:{
    color: '#E57373',
  },
  whiteFont: {
    color: '#ffffff',
  },
  blackFont: {
    color: '#000',
  },
  violetFont:{
    color: '#5E3F8C',
  },
  // colors
  violet:{
    backgroundColor: '#5E3F8C'
  },
  red: {
    backgroundColor: '#F97157',
  },
  blue: {
    backgroundColor: '#7AC0F4',
  },
  lightBlue:{
    backgroundColor: '#00BCD4',
  },
  brightBlue: {
    backgroundColor: '#00BCD4',
  },
  green: {
    backgroundColor: '#00D493',
  },
  orange: {
    backgroundColor: '#ed7f7d',
  },
  white:{
    backgroundColor: "#ffffff",
  },
  grey:{
    backgroundColor:'#F6F4F8'
  },
  pink:{
    backgroundColor:'#FBF7FD',
    opacity:.75
  },
  lightgreen:{
    backgroundColor:'#8BC34A'
  },

  //flex direction
  flexrow: {
    flexDirection: 'row',
  },
  flexcol: {
    flexDirection: 'column',
  },
  //online offline
  online: {
    left: 50,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#00d44e'
  },
  offline: {
    left: 50,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#b8b8b8'
  },
  //author hari
  line:{
    borderBottomColor: '#707070',
    borderBottomWidth: 1,
    opacity:.5,
    marginTop:10
},
 margins:{
   marginLeft:15,
   marginTop:10,
   marginRight:5
 },
  //splash style
  Splash_img: {
    left: 0,
    width: (Dimensions.get('screen').width),
    height: (Dimensions.get('screen').height),
  },
  Splash_logoContainer: {
    flex: 1,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Login Style starts here
  Login_container: {
    flex: 1,
    backgroundColor: '#36076b',
  },
  Login_img: {
    width: (Dimensions.get('window').width / 2),
    height: (Dimensions.get('window').height) / 6,
    resizeMode: 'contain',
  },
  logoContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  tabForm: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 8,
    flexDirection: 'row',
  },
  innerTabForm: {
    width: Dimensions.get('window').width / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 5,
    paddingBottom: 15,
    flexDirection: 'row',
  },
  selectedInnerTabForm: {
    width: Dimensions.get('window').width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 5,
    paddingBottom: 15,
    flexDirection: 'row',
    borderColor: '#8bc34a',
    borderBottomWidth: 5,
  },
  Login_form: {
    flex: 1.5,
    marginTop: 20,
    padding: 20,
  },
  Login_formTitle: {
    flex: 2,
    fontSize: 22,
    textAlign: 'center',
    color: 'black',
  },
  Login_input: {
    height: 60,
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  Login_buttonContainer: {
    backgroundColor: '#be36e7',
    paddingVertical: 25,

  },
  Login_buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',

  },
  Login_signIn:{
    color: '#8bc34a',
    fontWeight: '500',
    fontSize: 12,
  },
  Login_forgotPass:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  }


});
