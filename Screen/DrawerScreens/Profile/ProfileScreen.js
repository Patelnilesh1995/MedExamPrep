// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useRef, useState, useEffect } from 'react';

import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Image, FlatList ,ActivityIndicator,I18nManager} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  useTheme,
  TouchableRipple,
  TextInput,

} from 'react-native-paper';

import SelectDropdown from 'react-native-select-dropdown'
import ImagePicker from 'react-native-image-crop-picker';
import Animated, { floor } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker'
import Axios from 'axios';
import Loader from '../../Components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import { InsertFamily, FormApi_view, Login, InsertMemberData, GeneralApi, FormApi } from '../../Components/keys'
import { useIsFocused } from '@react-navigation/native';

import { Button, AlertDialog } from "native-base";
import { Colors } from "../../../themes/colors";
import { Fonts } from "../../../themes/fonts";
import ConstantStyle from '../../../themes/styles';
//import { useDispatch } from "react-redux";
//import * as auth from '../../store/action/auth';
//import { useTranslation } from "react-i18next";

const ProfileScreen = ({ navigation }) => {

  const { colors } = useTheme();

  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const [imageData, setImageData] = useState('');

  const [FamilyMemberList, setFamilyMemberList] = useState([]);
  const isFocused = useIsFocused();

  const [userName, setuserName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [userid, setuserid] = useState('');
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef(null)
  
  const _retrieveData = async () => {
    const stringifiedData = await AsyncStorage.getItem('userInfo');
    if (stringifiedData) {
      const data = JSON.parse(stringifiedData); // Parse the string back to an object
      console.log('Retrieved data:', data.id);
      setuserName(data.name)
      setuserid(data.id)
      setuserEmail(data.email)
    }
  };


  useEffect(() => {
    _retrieveData();
  }, []);


  return (
    <SafeAreaView style={[ConstantStyle.container,{backgroundColor:Colors.primary}]}>
      {/* <View style={{ alignItems: "center", marginHorizontal: 15, paddingVertical: 5, flexDirection: "row" }}>
        <Text style={{ ...Fonts.Black22Bold, lineHeight: 26 }}>{"profile_Text"}</Text>
      </View> */}
      <View style={{backgroundColor:Colors.white, flex:1}}>
      <View style={{ alignItems: "center", marginTop: 0, backgroundColor:Colors.primary }}>
        <Image alt="abc"
          style={{
            width: 105,
            height: 105,
            borderRadius: 50,
            marginTop:20
          }}
          source={require("../../../assets/image/user2.jpg")} >
        </Image>
        <Text style={{ ...Fonts.White18Bold, lineHeight: 30,marginTop:20 }}>{userName}</Text>
        <Text style={{ ...Fonts.White14Medium, lineHeight: 15 ,marginBottom:15}}>{userEmail}</Text>
      </View>
      <ScrollView>
      <View style={{ marginHorizontal: 1, backgroundColor: Colors.white, borderRadius: 0,marginTop: 20, ...ConstantStyle.shadow }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("EditProfile")}>
          <View style={{ justifyContent: 'space-between', alignItems: "center", paddingVertical: 15, flexDirection: "row" ,}}>
            <View style={{ alignItems: "center", marginLeft: 15 }}>
              <FontAwesome name="user" size={20} color="black" />
            </View>
            <View style={{ flex: 1, marginHorizontal: 15 }}>
              <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: "row" }}>
                <Text style={{ ...Fonts.Black16Bold }}> {"Edit Profile"}</Text>
                <Entypo name={I18nManager.isRTL ? "chevron-small-left" : "chevron-small-right"} size={24} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
       
        <View style={{ width: "100%", height: 2, backgroundColor: Colors.lightGray4 }}></View>
        <TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.navigate("MyPacakges")}}>
          <View style={{ justifyContent: 'space-between', alignItems: "center", paddingVertical: 15, flexDirection: "row" ,}}>
            <View style={{ alignItems: "center", marginLeft: 15 }}>
              <FontAwesome name="user" size={20} color="black" />
            </View>
            <View style={{ flex: 1, marginHorizontal: 15 }}>
              <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: "row" }}>
                <Text style={{ ...Fonts.Black16Bold }}> {"My Packages"}</Text>
                <Entypo name={I18nManager.isRTL ? "chevron-small-left" : "chevron-small-right"} size={24} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ width: "100%", height: 2, backgroundColor: Colors.lightGray4 }}></View>

        <TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.navigate("MyTransaction")}}>
          <View style={{ justifyContent: 'space-between', alignItems: "center", paddingVertical: 15, flexDirection: "row" ,}}>
            <View style={{ alignItems: "center", marginLeft: 15 }}>
              <FontAwesome name="rupee" size={20} color="black" />
            </View>
            <View style={{ flex: 1, marginHorizontal: 15 }}>
              <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: "row" }}>
                <Text style={{ ...Fonts.Black16Bold }}> {"My Transaction"}</Text>
                <Entypo name={I18nManager.isRTL ? "chevron-small-left" : "chevron-small-right"} size={24} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ width: "100%", height: 2, backgroundColor: Colors.lightGray4 }}></View>


        <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
          <View style={{ justifyContent: 'space-between', alignItems: "center", paddingVertical: 15, flexDirection: "row" }}>
            <View style={{ alignItems: "center", marginLeft: 13 }}>
              <Ionicons name="notifications" size={20} color="black" />
            </View>
            <View style={{ flex: 1, marginHorizontal: 14 }}>
              <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: "row" }}>
                <Text style={{ ...Fonts.Black16Bold }}>{"Notification"}</Text>
                <Entypo name={I18nManager.isRTL ? "chevron-small-left" : "chevron-small-right"} size={24} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ width: "100%", height: 2, backgroundColor: Colors.lightGray4 }}></View>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Settings')}>
          <View style={{ justifyContent: 'space-between', alignItems: "center", paddingVertical: 15, flexDirection: "row" }}>
            <View style={{ alignItems: "center", marginLeft: 15 }}>
              <Ionicons name="settings" size={20} color="black" />
            </View>
            <View style={{ flex: 1, marginHorizontal: 15 }}>
              <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: "row" }}>
                <Text style={{ ...Fonts.Black16Bold }}>{"Seetings"}</Text>
                <Entypo name={I18nManager.isRTL ? "chevron-small-left" : "chevron-small-right"} size={24} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ width: "100%", height: 2, backgroundColor: Colors.lightGray4 }}></View>
        <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
          <View style={{ justifyContent: 'space-between', alignItems: "center", paddingVertical: 15, flexDirection: "row" }}>
            <View style={{ alignItems: "center", marginLeft: 15 }}>
              <AntDesign name="download" size={20} color="black" />
            </View>
            <View style={{ flex: 1, marginHorizontal: 15 }}>
              <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: "row" }}>
                <Text style={{ ...Fonts.Black16Bold }}>{"Download"}</Text>
                <Entypo name={I18nManager.isRTL ? "chevron-small-left" : "chevron-small-right"} size={24} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ width: "100%", height: 2, backgroundColor: Colors.lightGray4 }}></View>
        {/* <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Languages")}>
          <View style={{ justifyContent: 'space-between', alignItems: "center", paddingVertical: 15, flexDirection: "row" }}>
            <View style={{ alignItems: "center", marginLeft: 15 }}>
              <MaterialIcons name="language" size={20} color="black" />
            </View>
            <View style={{ flex: 1, marginHorizontal: 15 }}>
              <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: "row" }}>
                <Text style={{ ...Fonts.Black16Bold }}>{"languages"}</Text>
                <Entypo name={I18nManager.isRTL ? "chevron-small-left" : "chevron-small-right"} size={24} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity activeOpacity={0.5} onPress={() => {navigation.navigate('TermAndConditions')}}>
          <View style={{ justifyContent: 'space-between', alignItems: "center", paddingVertical: 15, flexDirection: "row" }}>
            <View style={{ alignItems: "center", marginLeft: 15 }}>
            <MaterialIcons name="privacy-tip" size={20} color="black" />
            </View>
            <View style={{ flex: 1, marginHorizontal: 15 }}>
              <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: "row" }}>
                <Text style={{ ...Fonts.Black16Bold }}>{"Terms And Condition"}</Text>
                <Entypo name={I18nManager.isRTL ? "chevron-small-left" : "chevron-small-right"} size={24} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ width: "100%", height: 2, backgroundColor: Colors.lightGray4 }}></View>
        <TouchableOpacity activeOpacity={0.5} onPress={() =>{navigation.navigate('PrivacyPolicy')}}>
          <View style={{ justifyContent: 'space-between', alignItems: "center", paddingVertical: 15, flexDirection: "row" ,}}>
            <View style={{ alignItems: "center", marginLeft: 15 }}>
              <MaterialIcons name="privacy-tip" size={20} color="black" />
            </View>
            <View style={{ flex: 1, marginHorizontal: 15 }}>
              <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: "row" }}>
                <Text style={{ ...Fonts.Black16Bold }}> {"Privacy Policy"}</Text>
                <Entypo name={I18nManager.isRTL ? "chevron-small-left" : "chevron-small-right"} size={24} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ width: "100%", height: 2, backgroundColor: Colors.lightGray4 }}></View>

        <TouchableOpacity activeOpacity={0.5} onPress={() => setIsOpen(!isOpen)} >
          <View style={{ justifyContent: 'space-between', alignItems: "center", paddingVertical: 15, flexDirection: "row" }}>
            <View style={{ alignItems: "center", marginLeft: 15 }}>
              <MaterialCommunityIcons name="logout-variant" size={21} color={Colors.primary} />
            </View>
            <View style={{ flex: 1, marginHorizontal: 15 }} >
              <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: "row" }}>
                <Text style={{ ...Fonts.Primary16Bold }}>{"Logout"}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>
      {/* <Loader visible={loading} /> */}
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}  >
        <AlertDialog.Content bg={Colors.lightGray} py={3}>
          <AlertDialog.Body>
            <Text style={{ ...Fonts.Black18Bold, alignItems: 'center', textAlign: 'center', paddingBottom: 10, }}>
              {"Are you sure you want to logout?"}
            </Text>
            <Button.Group style={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
              <Button bg={Colors.white} style={{ width: 125, height: 45, ...ConstantStyle.shadow }}
                _text={{ ...Fonts.Grey16Regular }}
                _pressed={{
                  bg: Colors.white,
                }}
                onPress={onClose}
                ref={cancelRef} >{"Cancel"}
              </Button>
              <Button bg={Colors.orange} style={{ width: 125, height: 45, ...ConstantStyle.shadow }} _text={{ ...Fonts.White18Bold }}

                onPress={() => { 
                  //loaderShow(),
                  AsyncStorage.clear();
                  navigation.replace('Auth');
                   onClose() }}
                _pressed={{
                  bg: Colors.primary
                }}
              >
                {"Logout"}
              </Button>
            </Button.Group>
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>

      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#ffffff'
  },


  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 0,
    marginLeft: 0,
    borderBottomColor: '#f2f2f2',
    backgroundColor: 'blue',
    alignItems: 'center',
    padding: 3


  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  textinput: {
    //fontFamily: themes.font.medium,
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 1,
    height: 55,
    textTransform: "capitalize",
    color: '#545454',
    backgroundColor: '#ffffff'
  },
  sliderContainer: {
    width: '95%',
    marginTop: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { x: -2, y: 2 },
  },
  headingText: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 0,
    fontWeight: '700',
    paddingHorizontal: 0,
    //fontWeight: 'normal',
    color: '#fff',
  },
  leftText: {
    alignSelf: 'center',
    fontSize: 14,
    paddingHorizontal: 10,
    color: '#333',
    flex: 1,
  },
  rightText: {
    alignSelf: 'flex-end',
    fontSize: 14,
    paddingHorizontal: 10,
    textAlign: 'right',
    flex: 1,
    color: '#333',
  },
  right_LastText: {
    alignSelf: 'flex-end',
    fontSize: 14,
    paddingHorizontal: 10,
    marginRight: 10,
    textAlign: 'right',
    flex: 1,
    color: '#333',
  },
  textwrap: {
    padding: 5,
    marginBottom: 0,
  },
  textheader: {
    //fontFamily: themes.font.medium,
    marginLeft: 10,
    fontSize: 12,
    color: '#545454',
  },
  buttonStyle: {
    backgroundColor: '#317ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#317ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 20,
    //position: 'absolute',
    bottom: 0,
    left: 0,
  },
  buttonTextStyle: {
    color: '#FFFfFF',
    paddingVertical: 10,
    fontSize: 16,
  },

  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },

  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  dropdown: {
    //margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: 10,
    color: '#545454'
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingLeft: 10,
    color: '#545454'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  card: {
    marginVertical: 5,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderRadius:5,
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    flex: 0.5,
    //width: CARD_NEW_WIDTH,
    margin: 5
  },
  cardtext: {
    paddingTop: 10,
    fontSize: 16,
    marginTop: 0,
    fontWeight: '700',
    paddingHorizontal: 10,
    //fontWeight: 'normal',
    color: '#343a40',
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  cardtextsmall: {
    paddingTop: 5,
    fontSize: 14,
    marginTop: 5,
    fontWeight: '600',
    color: '#343a40',
    textAlign: 'left',
    paddingHorizontal: 10,
    flex: 1
  },

  cardtextsmall1: {
    paddingTop: 0,
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: '700',
    fontWeight: 'normal',
    color: '#343a40',
    marginRight: 5,
    flex: 1
  },

  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
