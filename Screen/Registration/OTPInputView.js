import React, { useRef ,useState} from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text ,SafeAreaView,ScrollView,Button,Image} from 'react-native';
import { Fonts } from '../../themes/fonts';
import ConstantStyle from '../../themes/styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import CustomHeader from '../Components/CustomHeader';

const OTPInputView = ({ onSubmitOTP }) => {
    const firstDigitRef = useRef();
    const secondDigitRef = useRef();
    const thirdDigitRef = useRef();
    const fourthDigitRef = useRef();
  
    const [firstDigit, setFirstDigit] = useState('');
    const [secondDigit, setSecondDigit] = useState('');
    const [thirdDigit, setThirdDigit] = useState('');
    const [fourthDigit, setFourthDigit] = useState('');
  
    const handleFirstDigitChange = (text) => {
      setFirstDigit(text);
      if (text.length === 1) {
        secondDigitRef.current.focus();
      }
    };
  
    const handleSecondDigitChange = (text) => {
      setSecondDigit(text);
      if (text.length === 1) {
        thirdDigitRef.current.focus();
      }
    };
  
    const handleThirdDigitChange = (text) => {
      setThirdDigit(text);
      if (text.length === 1) {
        fourthDigitRef.current.focus();
      }
    };
  
    const handleOTPSubmit = () => {
      const otp = firstDigit + secondDigit + thirdDigit + fourthDigit;
      onSubmitOTP(otp);
    };
  
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
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
          <Text style={{ ...Fonts.Black24Bold,marginBottom:5,marginTop:10 }}>{'Verify Email'}</Text>
          <Text style={{ ...Fonts.Grey14Regular, marginBottom: 20, marginTop: 15 }}>A verification code has been sent to your Email id</Text>
        </View>
        <View style={{ marginHorizontal: 30, marginTop: "1%", }}>
       
        <View style={styles.container}>
        <TextInput
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          ref={firstDigitRef}
          onChangeText={handleFirstDigitChange}
          onSubmitEditing={() => secondDigitRef.current.focus()}
        />
        <TextInput
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          ref={secondDigitRef}
          onChangeText={handleSecondDigitChange}
          onSubmitEditing={() => thirdDigitRef.current.focus()}
        />
        <TextInput
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          ref={thirdDigitRef}
          onChangeText={handleThirdDigitChange}
          onSubmitEditing={() => fourthDigitRef.current.focus()}
        />
        <TextInput
          style={styles.input}
          maxLength={1}
          keyboardType="numeric"
          ref={fourthDigitRef}
          onChangeText={(text) => setFourthDigit(text)}
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
            onPress={handleOTPSubmit}>
            <Text style={[styles.buttonTextStyle, {...Fonts.White18Bold }]}>Submit</Text>

          </TouchableOpacity>
        </View>
        
      </ScrollView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    height:50
  },
  input: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 24,
    textAlign: 'center',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#307ecc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
});

export default OTPInputView;