// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Button
} from 'react-native';



import AsyncStorage from '@react-native-community/async-storage';
//import Axios from 'axios';
import axios from 'axios';

import Loader from '../Components/Loader';
import { Api_Key, Login } from '../Components/keys';
import LinearGradient from 'react-native-linear-gradient';
import { requestUserPermission, notificationlistener } from '../Utils/NotificationService';

// import { Input, Icon, Button,  } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../themes/colors';
import { Fonts } from '../../themes/fonts';
import ConstantStyle from '../../themes/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { checkConnectivity } from '../ApiConfig/checkConnectivity';
import { LOGIN } from '../ApiConfig/API/Models';
import callApi from '../ApiConfig/API/api_new';
import { useToast, Box } from "native-base";

import * as APIController from '../ApiConfig/API/APIController';
import callApi_PATCH from '../ApiConfig/API/api_patch';

const LoginScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('a15034212039@gmail.com');
  const [userPassword, setUserPassword] = useState('Nilesh@123');
  const [loading, setLoading] = useState(false);

  const passwordInputRef = createRef();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const toast = useToast();


  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
  };

  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setIsPasswordFocused(false);
  };

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };



  const checkValidation = async () => {
    const isConnected = await checkConnectivity();
    if (!isEmailValid(userEmail)) {
      alert('Please insert valid email-id');
      return;
    }
    else if (!userPassword) {
      alert('Please fill Password');
      return;
    } else if (!isConnected) {
      alert('Please check your network connection!');
      return;
    } else {
      handleSubmitPress();

      //navigation.replace('DrawerNavigationRoutes');
    }
  }

  const handleSubmitPress = async () => {
    const patchData = {email: userEmail, password: userPassword};
    console.log(patchData)
    try {
        setLoading(true);
        const responseJson = await callApi_PATCH(Login, 'POST', patchData);
        if (responseJson.success === "true") {
          const data = { id: responseJson.data.id, name: responseJson.data.name, mobile: responseJson.data.mobile, uuid: responseJson.data.uuid, dob:responseJson.data.dob,email: userEmail  }; 
          const stringifiedData = JSON.stringify(data); // Convert data to string
          await AsyncStorage.setItem('userInfo', stringifiedData);
  
          navigation.replace('DrawerNavigationRoutes');

        } else {
            toast.show({
                render: () => {
                    return <Box bg={Colors.white} px="4" py="2" rounded="md" mb={5}>
                         {responseJson.message}
                    </Box>;
                }
            })
        }
        console.log('PATCH request response:', responseJson);
    } catch (error) {
        console.error('Error making PATCH request:', error);
    } finally {
        setLoading(false); // Set loading to false after the API call is complete
    }
};


  const handleSubmitPress1 = async () => {
    try {
      setLoading(true); // Set loading to true before making the API call

      const responseJson = await callApi(
        Login,
        'POST',
        { email: userEmail, password: userPassword }
      );

      console.log(responseJson);

      if (responseJson.success === "true") {

        const data = { id: responseJson.data.id, name: responseJson.data.name, mobile: responseJson.data.mobile, uuid: responseJson.data.uuid, dob:responseJson.data.dob,email: userEmail  }; 
        const stringifiedData = JSON.stringify(data); // Convert data to string
        await AsyncStorage.setItem('userInfo', stringifiedData);

        navigation.replace('DrawerNavigationRoutes');

      } else {
        console.log('Please check your email id or password');
        toast.show({
          render: () => {
              return <Box bg={Colors.white} px="4" py="2" rounded="md" mb={5}>
                  {responseJson.message}
              </Box>;
          }
      })
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after the API call is complete
    }
  };

  const handleLogin = async () => {
    if (await checkConnectivity()) {
      let data = new LOGIN();
      data.email = 'a15034212039@gmail.com'
      data.password = 'Nilesh@123'

      const apiResponse = await APIController.doLogin(data);
      console.log("apiresponse=", apiResponse.object)

      if (apiResponse.object != null) {
        if (apiResponse.object.status == 0) {
          //Toast Error Message
          console.log("false=", apiResponse.object)
        }
        else {
          //Success 
          console.log("success===", apiResponse.object.status)
        }
      } else {
      }
    }
    else {
      //Connect Internet Message Or Alert
    }
  };


  useEffect(() => {
    requestUserPermission()
    notificationlistener()
  }, []);

  return (

    <SafeAreaView style={{ ...ConstantStyle.container }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Loader loading={loading} />

        <View style={{ alignItems: "center", marginTop: "5%" }}>
          <Image
            source={require('../../Image/medexam.png')}
            style={{
              width: 180,
              height: 180,
              resizeMode: 'contain',
              margin: 0,
            }}
          />
          <Text style={{ ...Fonts.Black24Bold, marginBottom: 5, marginTop: 10 }}>{'Welcome back!'}</Text>
          <Text style={{ ...Fonts.Grey14Regular, marginBottom: 20, marginTop: 15 }}>{'Login to your existing account of e-learning'}</Text>
        </View>
        <View style={{ marginHorizontal: 10, marginTop: "1%", }}>

          <View style={[
            styles.SectionStyle,
            {
              borderColor: isEmailFocused ? '#4EBCD5' : '#dadae8',
              backgroundColor: isEmailFocused ? '#f9f9f9' : '#fff',
            },
          ]}>
            <View style={styles.lockIconContainer}>
              <Icon name="envelope" size={20} color="#aaaaaa" style={styles.inputIcon} />
            </View>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) =>
                setUserEmail(UserEmail)
              }
              placeholder="Enter Email-id" //dummy@abc.com
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              value={userEmail}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
            />

          </View>

          <View style={[
            styles.SectionStyle,
            {
              borderColor: isPasswordFocused ? '#4EBCD5' : '#dadae8',
              backgroundColor: isPasswordFocused ? '#f9f9f9' : '#fff',
            },
          ]}>
            <View style={styles.lockIconContainer}>
              <Icon name="lock" size={20} color="#aaaaaa" style={styles.inputIcon} />
            </View>

            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              placeholder="Enter Password" //12345
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
              ref={passwordInputRef}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              value={userPassword}
              secureTextEntry={!passwordVisible}
              underlineColorAndroid="#f000"
              returnKeyType="next"
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
            />

            {/* Eye Icon */}
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
              <MaterialCommunityIcons
                name={passwordVisible ? 'eye-off' : 'eye'}
                size={20}
                color="#aaaaaa"
                style={styles.inputIcon}
              />
            </TouchableOpacity>

          </View>

          <TouchableOpacity onPress={() => {
            navigation.navigate("ForgotPasswordScreen");
          }}>
            <Text style={{ ...Fonts.Black14Regular, textAlign: "right", marginRight: 10, marginTop: 10 }}>{'Forgot password?'}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center", marginTop: '5%' }}>
          {/* <Button style={{ width: 274, height: 45, borderRadius: 10,...Fonts.White18Bold }}
            onPress={() => navigation.navigate("RegisterScreen")}>{'Login'}
          </Button> */}

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={()=>{checkValidation()}}>
            <Text style={[styles.buttonTextStyle, { ...Fonts.White18Bold }]}>Login</Text>

          </TouchableOpacity>
        </View>
        <Text style={{ ...Fonts.Black14Regular, textAlign: "center", marginTop: 10 }}>{'Or connect using'}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 15, }} >
          <TouchableOpacity activeOpacity={0.7} style={{ marginHorizontal: 10, }}>

            <Image
              source={require('../../Image/facebook.png')}
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
                margin: 0,
              }}
            />

          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={{ marginHorizontal: 10, }}>
            <Image
              source={require('../../Image/google-plus.png')}
              style={{
                width: 50,
                height: 50,
                resizeMode: 'contain',
                margin: 0,

              }}
            />

          </TouchableOpacity>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", marginBottom: 15 }}>
          <Text style={{ ...Fonts.Grey16Regular }}>Don't have an account? </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => {
            //navigation.navigate("RegisterScreen")
            navigation.navigate("RegisterScreen");
            }}>
            <Text style={{ ...Fonts.Primary16Bold }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    //backgroundColor: '#307ecc',
    backgroundColor: '#fff',
    alignContent: 'center',
  },

  buttonStyle: {
    backgroundColor: '#4EBCD5',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#4EBCD5',
    height: 45,
    width: '90%',
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 20,
    justifyContent:'center',

  },
  buttonTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
  },

  registerTextStyle: {
    color: '#0047ab',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '100%'
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  headingText: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: '700',
    padding: 0,
    //fontWeight: 'normal',
    color: '#000',
  },

  SectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    height: 45,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,

  },

  inputStyle: {
    flex: 1,
    paddingLeft: 45,
    paddingRight: 35,
    //borderWidth: 1,
    borderRadius: 10, // Adjust the padding to make room for the eye icon
    //borderColor: '#dadae8',
    width: '90%',
    height: 45
  },

  inputIcon: {
    paddingHorizontal: 5,
    top: '50%',
    transform: [{ translateY: -10 }],
  },

  lockIconContainer: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },

  eyeIconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
});
