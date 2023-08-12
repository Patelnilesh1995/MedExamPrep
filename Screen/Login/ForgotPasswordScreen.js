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
  Button,
  StatusBar
} from 'react-native';

import Loader from '../Components/Loader';
import { ForgotPassword, Login } from '../Components/keys';
import { requestUserPermission, notificationlistener } from '../Utils/NotificationService';

// import { Input, Icon, Button,  } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../themes/colors';
import { Fonts } from '../../themes/fonts';
import ConstantStyle from '../../themes/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomHeader from '../Components/CustomHeader';
import { color } from 'react-native-reanimated';
import { useToast, Box } from "native-base";
import callApi from '../ApiConfig/API/api_new';
import { checkConnectivity } from '../ApiConfig/checkConnectivity';
import callApi_PATCH from '../ApiConfig/API/api_patch';


const ForgotPasswordScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const toast = useToast();



  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleEmailFocus = () => {
    setIsEmailFocused(true);
  };

  const handleEmailBlur = () => {
    setIsEmailFocused(false);
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
    }else if (!isConnected) {
      alert('Please check your network connection!');
      return;
    }  else {
      handleSubmitPress();
    }
  }

  const handleSubmitPress1 = async () => {
    try {
      setLoading(true); // Set loading to true before making the API call

      const responseJson = await callApi(
        ForgotPassword,
        'POST',
        { email: userEmail}
      );

      console.log(responseJson);

      if (responseJson.success === "true") {
        toast.show({
          render: () => {
            return <Box bg={Colors.white} px="4" py="2" rounded="md" mb={5}>
              {responseJson.message}
            </Box>;
          }
        }),
        alert(responseJson.message)
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


  const handleSubmitPress = async () => {
    const patchData = { email: userEmail};

    console.log(patchData)
    try {
        setLoading(true);
        const responseJson = await callApi_PATCH(ForgotPassword, 'POST', patchData);
        if (responseJson.success === "true") {
          toast.show({
            render: () => {
              return <Box bg={Colors.white} px="4" py="2" rounded="md" mb={5}>
                {responseJson.message}
              </Box>;
            }
          }),
          alert(responseJson.message)
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


  return (

    <SafeAreaView style={{ ...ConstantStyle.container, }}>
      <View style={styles.headerContainer}>
          <TouchableOpacity onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity> 
        </View>

      <Loader loading={loading} />


      {/* <CustomHeader></CustomHeader> */}

      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={{ alignItems: "center", marginTop: "15%" }}>
          <Image
            source={require('../../Image/medexam.png')}
            style={{
              width: 180,
              height: 180,
              resizeMode: 'contain',
              margin: 0,
            }}
          />
          <Text style={{ ...Fonts.Black24Bold, marginBottom: 5, marginTop: 10 }}>{'Forgot Password?'}</Text>
          <Text style={{ ...Fonts.Grey14Regular, marginBottom: 20, marginTop: 15 }}>Dont't worry! It happens. Please enter email</Text>
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
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
            />

          </View>

        </View>

        <View style={{ alignItems: "center", marginTop: '5%' }}>
          {/* <Button style={{ width: 274, height: 45, borderRadius: 10,...Fonts.White18Bold }}
            onPress={() => navigation.navigate("RegisterScreen")}>{'Login'}
          </Button> */}

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={()=>{checkValidation()}}>
            <Text style={[styles.buttonTextStyle, { ...Fonts.White18Bold }]}>Submit</Text>

          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ForgotPasswordScreen;

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



  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //backgroundColor: '#307ecc',
    height: 50,
    paddingHorizontal: 16,
  },
  placeholderIcon: {
    width: 24,
  },
});
