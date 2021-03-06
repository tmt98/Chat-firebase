/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, 
        StyleSheet, 
        Text, 
        View,
        TextInput,
        TouchableOpacity,
        TouchableWithoutFeedback,
        Keyboard,
        ImageBackground,
        ActivityIndicator} from 'react-native';
// import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import firebase from 'firebase';
import {Input, Icon, Button} from 'native-base'
import {COLOR_PINK_LIGHT,COLOR_FACEBOOK} from './color.js'
import background from '../assets/background-image.jpg'

// const config = {
//     apiKey: "AIzaSyAIP8Ug0OqI5Rxv29HK8hMYTWNrgG8Yvoc",
//     authDomain: "chat-app-87fd5.firebaseapp.com",
//     databaseURL: "https://chat-app-87fd5.firebaseio.com",
//     projectId: "chat-app-87fd5",
//     storageBucket: "chat-app-87fd5.appspot.com",
//     messagingSenderId: "1096520825590"
//   };
// firebase.initializeApp(config);




import FirebaseSvc from  '../FirebaseSvc'


export default class Login extends Component{
    state = {
    logged: false,
    animating: false,
    name: 'Alex B',
    email: 'test3@gmail.com',
    password: 'test123',
    avatar: '',
    }

    constructor(props) {
      super(props);
    }



    
  login = async (user,success_callback,failed_callback) =>{
    console.log("logging in");
    // User=FirebaseSvc.auth().currentUser.uid
    // await AsyncStorage.setItem("email", User.email);
    // await AsyncStorage.setItem("name", this.state.name);
    // await AsyncStorage.setItem("uid", User.uid);
    // await AsyncStorage.setItem("avatar", this.state.avatar);
    const output = await FirebaseSvc.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(success_callback, failed_callback);
    // console.log(FirebaseSvc.auth().currentUser.uid)
  }   
  onPressLogin = async () => {
      console.log('pressing login... email:' + this.state.email);
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        avatar: this.state.avatar,
      };
      console.log(typeof user+ '      ahihishidhishdi') 
      if(user== undefined){
          console.log("DDMMMMMMMMMMMMMMMMMMM")
      }
      else{
          console.log("UHMMMMMMMMMM")
      }

      const response = await this.login(
        user,
        this.loginSuccess,
        this.loginFailed        
        );
      
    };
  
    loginSuccess = () => {
      console.log('login successful, navigate to chat.');


      this.props.navigation.navigate('Home', {
        name: this.state.name,
        email: this.state.email,
        avatar: this.state.avatar,
      });
    };
    loginFailed = () => {
      console.log('login failed ***');
      alert('Login failure. Please tried again.');
    };

  onChangeTextEmail = email => this.setState({email})
  onChangeTextPassword= password => this.setState({password})

  createAccount=async()=>{
      this.props.navigation.navigate('createAccount')
  }


  

                                                                            


    render(){
        const Divider = (props) => {        //props =  style={styles.divider}
        return <View {...props}>
        <View style={styles.line}></View>
        <Text style={styles.textOR}>OR</Text>
        <View style={styles.line}></View>
        </View>
        }
    return (
      <ImageBackground source={background} style={{width: '100%', height: '100%',}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.up}>
                  <Ionicons 
                  name="ios-contacts"
                  size={100}
                  color={'white'}> </Ionicons>
              </View>
              <View style ={styles.down}>
                  <View style ={styles.textInputContainer}>
                      <TextInput style={styles.textInput}
                      textContentType='emailAddress'
                      keyboardType='email-address'  
                      placeholder='Email'
                      onChangeText={this.onChangeTextEmail}
                      value={this.state.email}
                      >
                        
                      </TextInput>
                  </View>

                  <View style ={styles.textInputContainer}>
                      <TextInput style={styles.textInput}
                      placeholder='Password' 
                      secureTextEntry={true}
                      onChangeText={this.onChangeTextPassword}
                      value={this.state.password}
                      ></TextInput>
                  </View>  

                  <View style={{ margin:10, width:280}}>
                    <Button iconLeft bordered full success onPress={this.onPressLogin}>
                      <Ionicons name='ios-log-in'></Ionicons>
                      <Text> ĐĂNG NHẬP</Text>
                    </Button>
                </View>

                <View style={{margin:10, width:280}}>
                  <Button full info onPress={this.createAccount}>
                    {/* <Icon name='signin' style = {{color:'white'}}></Icon> */}
                    <Text style = {{color:'white'}}>ĐĂNG KÝ</Text>
                  </Button>
                </View>
                  {/* <FontAwesome.Button 

                  style={styles.facebookButton}
                  name='facebook'
                  onPress={this.createAccount}
                  backgroundColor={COLOR_FACEBOOK}>
                  <Text style={styles.loginButtonTittle}>
                          
                    Create new account

                  </Text>
                
                  </FontAwesome.Button>    */}
                <ActivityIndicator
                    //{console.log(this.state.logged)}
                    animating={this.state.animating}
                    
                    color="#ddd"
                    size="large"
                />

              </View>

            </View>
      </TouchableWithoutFeedback>
    </ImageBackground>
  )

}


}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection : 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        // backgroundColor: COLOR_PINK_LIGHT,
    },
    up:{
        flex:3,
        flexDirection : 'column',
        justifyContent:'center',
        alignItems:'center',

    },
    down:{
        flex:7,
        flexDirection : 'column',
        
        justifyContent:'flex-start',
        alignItems:'center'
    },
    title:{
        color: 'firebrick',
        textAlign : 'center',
        width: 400,
        fontSize:25,
        marginBottom:40
    },
    textInputContainer:{
        paddingHorizontal:10,
        borderRadius:6,
        marginBottom:20, 
        backgroundColor:'rgba(255,255,255,0.2)',
    },
    textInput:{
        width:280,
        height : 45,
        borderBottomWidth:1,
        borderColor:'#00cc99',
    },
    loginButton:{
        width:300,
        height:45,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6,
        backgroundColor:'red'


    },
    loginButtonTittle:{
        fontSize :18, 
        color:'white'
    },
    facebookButton:{
        width:300,
        height:45,
        borderRadius:6,
        justifyContent:'center',
    },
  line: {
    height: 1,
    flex: 2,
    backgroundColor: 'black'
  },
  textOR: {
    flex: 1,
    textAlign: 'center'
  },
  divider: {
    flexDirection: 'row',
    height: 40,
    width: 298,
    justifyContent: 'center',
    alignItems: 'center'
  }

});
