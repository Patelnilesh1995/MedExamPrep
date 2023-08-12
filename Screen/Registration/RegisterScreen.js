// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';

import Loader from '../Components/Loader';
import Axios from 'axios';
import { FormApi, Registration, SendOTP, InsertOTP, CheckOtp } from '../Components/keys';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../themes/colors';
import { Fonts } from '../../themes/fonts';
import ConstantStyle from '../../themes/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { checkConnectivity } from '../ApiConfig/checkConnectivity';
import OTPInputView from './OTPInputView';
import callApi from '../ApiConfig/API/api_new';
import { useToast, Box } from "native-base";
import callApi_PATCH from '../ApiConfig/API/api_patch';

const RegisterScreen = ({ navigation, props }) => {
  const [userName, setUserName] = useState('');
  const [userDob, setUserDob] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailotp, setEmailotp] = useState('');
  const [userId, setUserId] = useState('');

  const [isSendOtp, setIsSendOtp] = useState(false);
  const toast = useToast();
  const emailInputRef = createRef();
  const phoneInputRef = createRef();
  const confirmPassInputRef = createRef();
  const passwordInputRef = createRef();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [conpasswordVisible, setConPasswordVisible] = useState(false);

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isUserFocused, setIsUserFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConPasswordFocused, setIsConPasswordFocused] = useState(false);


  const handleOTPSubmit = (enteredOTP) => {
    // Here, you can make the API call using the OTP
    console.log('Submitted OTP:', enteredOTP);
    // Perform the API call with the entered OTP
    // ...

    if(enteredOTP.length !=4){
      alert('Please insert valid OTP!')
      return;
    }else{

      handleOTPSubmitPress(enteredOTP);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleConPasswordVisibility = () => {
    setConPasswordVisible((prev) => !prev);
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

  const handleUserFocus = () => {
    setIsUserFocused(true);
  };

  const handleUserBlur = () => {
    setIsUserFocused(false);
  };

  const handleMobileFocus = () => {
    setIsPhoneFocused(true);
  };

  const handleMobileBlur = () => {
    setIsPhoneFocused(false);
  };

  const handleConfirPasswordFocus = () => {
    setIsConPasswordFocused(true);
  };

  const handleConfirmPasswordBlur = () => {
    setIsConPasswordFocused(false);
  };


  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };


  const checkValidation = async () => {
    const isConnected = await checkConnectivity();

    if (!userName) {
      alert('Please fill Name');
      return;
    }
   else if (!isEmailValid(userEmail)) {
      alert('Please insert valid email-id');
      return;
    }
    else if (!userMobile || userMobile.length != 10) {
      alert('Please insert valid Mobile No');
      return;
    }
    else if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    else if (!confirmPassword) {
      alert('Please fill Re-enter Password');
      return;
    }
    else if (userPassword != confirmPassword) {
      alert('Password and Re-enter Password does not match');
      return;
    }else if (!isConnected) {
      alert('Please check your network connection!');
      return;
    } else {
      handleSubmitPress();
    }
    //Show Loader
   
  };

  //arun1234321@gmail.com


  const handleSubmitPress1 = async () => {
    try {
      setLoading(true); // Set loading to true before making the API call

      const responseJson = await callApi(
        Registration,
        'POST',
        { name: userName,email: userEmail, password: userPassword,mobile:userMobile,dob:userDob }
      );

      console.log(responseJson);

      if (responseJson.success === "true") {
        toast.show({
          render: () => {
              return <Box bg={Colors.white} px="4" py="2" rounded="md" mb={5}>
                  {responseJson.message}
              </Box>;
          }
        })
        
        setIsSendOtp(true);
        setUserId(responseJson.data.id);
        setEmailotp(responseJson.otp);

      } else {
        console.log('Please check your email id or password');
      //   toast.show({
      //     render: () => {
      //         return <Box bg={Colors.white} px="4" py="2" rounded="md" mb={5}>
      //             {responseJson.errors.email}
      //         </Box>;
      //     }
      // })
      alert(responseJson.errors.email)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after the API call is complete
    }
  };



  const handleSubmitPress = async () => {
    const patchData = { name: userName,email: userEmail, password: userPassword,mobile:userMobile,dob:userDob};

    console.log(patchData)
    try {
        setLoading(true);
        const responseJson = await callApi_PATCH(Registration, 'POST', patchData);
        if (responseJson.success === "true") {
          toast.show({
            render: () => {
                return <Box bg={Colors.white} px="4" py="2" rounded="md" mb={5}>
                    {responseJson.message}
                </Box>;
            }
          })
          setUserId(responseJson.data.id);
          setEmailotp(responseJson.otp);
          setIsSendOtp(true);

        } else {
          alert(responseJson.errors.email)
        }
        console.log('PATCH request response:', responseJson);
    } catch (error) {
        console.error('Error making PATCH request:', error);
    } finally {
        setLoading(false); // Set loading to false after the API call is complete
    }
};



  const handleOTPSubmitPress1 = async (user_otp) => {
    console.log("otp==",user_otp,emailotp,userId)
    try {
      setLoading(true); // Set loading to true before making the API call

      const responseJson = await callApi(
        CheckOtp,
        'POST',
        { otp: user_otp,resp_otp: emailotp, id: userId }
      );

      console.log(responseJson);

      if (responseJson.success === "true") {
        toast.show({
          render: () => {
              return <Box bg={Colors.white} px="4" py="2" rounded="md" mb={5}>
                  {responseJson.message}
              </Box>;
          }
        })
        handleGoBack;
        

      } else {
        console.log('Please check your email id or password');
      //   toast.show({
      //     render: () => {
      //         return <Box bg={Colors.white} px="4" py="2" rounded="md" mb={5}>
      //             {responseJson.errors.email}
      //         </Box>;
      //     }
      // })
      alert('Please insert valid OTP')
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after the API call is complete
    }
  };


  const handleOTPSubmitPress = async (user_otp) => {
    const patchData = { otp: user_otp,resp_otp: emailotp, id: userId };

    console.log(patchData)
    try {
        setLoading(true);
        const responseJson = await callApi_PATCH(CheckOtp, 'POST', patchData);
        if (responseJson.success === "true") {
          toast.show({
            render: () => {
                return <Box bg={Colors.white} px="4" py="2" rounded="md" mb={5}>
                    {responseJson.message}
                </Box>;
            }
          })
          navigation.goBack();
        } else {
          alert('Please insert valid OTP')
        }
        console.log('PATCH request response:', responseJson);
    } catch (error) {
        console.error('Error making PATCH request:', error);
    } finally {
        setLoading(false); // Set loading to false after the API call is complete
    }
};


  if (isSendOtp) {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#fff',
        //backgroundColor: '#307ecc'
      }}>
        <Loader loading={loading} />
        <View>
        
        <OTPInputView onSubmitOTP={handleOTPSubmit} />
      </View>
      </View>
      );
  }


  return (


    <SafeAreaView style={{ ...ConstantStyle.container }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <Loader loading={loading} />
     
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: "center", marginTop: "1%" }}>
          <Image
            source={require('../../Image/medexam.png')}
            style={{
              width: 120,
              height: 120,
              resizeMode: 'contain',
              margin: 0,
            }}
          />
          <Text style={{ ...Fonts.Black24Bold, marginBottom: 5, marginTop: 10 }}>Let's get started!</Text>
          <Text style={{ ...Fonts.Grey14Regular, marginBottom: 20, marginTop: 15 }}>{'Carate an account to e-learning to get all features'}</Text>
        </View>
        <View style={{ marginHorizontal: 10, marginTop: "1%", }}>
          <KeyboardAvoidingView enabled>
            <View style={[
              styles.SectionStyle,
              {
                borderColor: isUserFocused ? '#4EBCD5' : '#dadae8',
                backgroundColor: isUserFocused ? '#f9f9f9' : '#fff',
              },
            ]}>
              <View style={styles.lockIconContainer}>
                <Icon name="user" size={20} color="#aaaaaa" style={styles.inputIcon} />
              </View>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(Username) =>
                  setUserName(Username)
                }
                placeholder="Name" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType='default'
                returnKeyType="next"
                onSubmitEditing={() =>
                  emailInputRef.current &&
                  emailInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                onFocus={handleUserFocus}
                onBlur={handleUserBlur}
              />

            </View>
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
                ref={emailInputRef}
                onSubmitEditing={() =>
                  phoneInputRef.current &&
                  phoneInputRef.current.focus()
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
                borderColor: isPhoneFocused ? '#4EBCD5' : '#dadae8',
                backgroundColor: isPhoneFocused ? '#f9f9f9' : '#fff',
              },
            ]}>
              <View style={styles.lockIconContainer}>
                <Icon name="mobile" size={20} color="#aaaaaa" style={styles.inputIcon} />
              </View>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(Usermobile) =>
                  setUserMobile(Usermobile)
                }
                placeholder="Mobile number" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="numeric"
                returnKeyType="next"
                maxLength={10}
                ref={phoneInputRef}
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
                onFocus={handleMobileFocus}
                onBlur={handleMobileBlur}
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
                blurOnSubmit={false}
                secureTextEntry={!passwordVisible}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                onSubmitEditing={() =>
                  confirmPassInputRef.current &&
                  confirmPassInputRef.current.focus()
                }
                onFocus={handlePasswordFocus}
                onBlur={handlePasswordBlur}
              />

              
              <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
                <MaterialCommunityIcons
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  color="#aaaaaa"
                  style={styles.inputIcon}
                />
              </TouchableOpacity>

            </View>

            <View style={[
              styles.SectionStyle,
              {
                borderColor: isConPasswordFocused ? '#4EBCD5' : '#dadae8',
                backgroundColor: isConPasswordFocused ? '#f9f9f9' : '#fff',
              },
            ]}>
              <View style={styles.lockIconContainer}>
                <Icon name="lock" size={20} color="#aaaaaa" style={styles.inputIcon} />
              </View>

              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setConfirmPassword(UserPassword)}
                placeholder="Confirm Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={confirmPassInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={!conpasswordVisible}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                onFocus={handleConfirPasswordFocus}
                onBlur={handleConfirmPasswordBlur}
              />

             
              <TouchableOpacity onPress={toggleConPasswordVisibility} style={styles.eyeIconContainer}>
                <MaterialCommunityIcons
                  name={conpasswordVisible ? 'eye-off' : 'eye'}
                  size={20}
                  color="#aaaaaa"
                  style={styles.inputIcon}
                />
              </TouchableOpacity>

            </View>


          </KeyboardAvoidingView>

        </View>

        <View style={{ alignItems: "center", marginTop: '5%' }}>
         

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={checkValidation}>
            <Text style={[styles.buttonTextStyle, { ...Fonts.White18Bold }]}>Sign Up</Text>

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
          <Text style={{ ...Fonts.Grey16Regular }}>Already have an account? </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={handleGoBack}>
            <Text style={{ ...Fonts.Primary16Bold }}>Login Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
    </SafeAreaView>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({

  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  headingText: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 0,
    fontWeight: '700',
    padding: 10,
    //fontWeight: 'normal',
    color: '#000',
  },
  successTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '100%'
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
