// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useRef, useState, useEffect } from 'react';

import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Image, FlatList, ActivityIndicator, TextInput } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  useTheme,
  TouchableRipple,

} from 'react-native-paper';

import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import Animated, { floor } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker'
import Axios from 'axios';
import Loader from '../../Components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { InsertFamily, FormApi_view, Login, InsertMemberData, GeneralApi, FormApi } from '../../Components/keys'
import { useIsFocused } from '@react-navigation/native';



import { Fonts } from "../../../themes/fonts";
import ConstantStyle from "../../../themes/styles";
import { Colors } from "../../../themes/colors";
import recommendedAll from "../../data/recommendedAll";
import CourseCard from "../../Components/CourseCard";
//import { TagSelect } from 'react-native-tag-select';

const SearchScreen = ({ navigation }) => {

  const tags = [
    { id: 1, label: 'Design' },
    { id: 2, label: 'Programming' },
    { id: 3, label: 'React' },
    { id: 4, label: 'SEO' },
    { id: 5, label: 'Marketing' },
    { id: 6, label: 'Business' },
    { id: 7, label: 'Web Development' },

  ];

  const { colors } = useTheme();

  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const [imageData, setImageData] = useState('');

  const [FamilyMemberList, setFamilyMemberList] = useState([]);
  const isFocused = useIsFocused();



  const [editid, seteditid] = useState('0');
  const [userid, setuserid] = useState('');


  const [loading, setLoading] = useState(false);


  const _retrieveData = async () => {
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    setuserid(await AsyncStorage.getItem('user_id'));
    //const myArray = await AsyncStorage.getItem('@MySuperStore:key');
    let userid = await AsyncStorage.getItem('user_id');
    console.log("userid=", userid)

  };


  useEffect(() => {
    _retrieveData();
  }, [isFocused]);


  return (
    <SafeAreaView style={[ConstantStyle.container, { backgroundColor: Colors.primary }]}>
      <View style={{ backgroundColor: Colors.white, flex:1 }}>
        <View style={{ marginHorizontal: 15 }}>
          <View style={{ alignItems: "center", justifyContent: "space-between", marginTop: 10, flexDirection: "row", }}>
            <TextInput
              style={{
                ...Fonts.Black16Regular,
                width: '86%',
                height: 40,
                backgroundColor: Colors.lightGray4,
                borderRadius: 10,
                paddingHorizontal: 10,
                borderColor: '#fff',
                alignContent: 'center',
                underlineColorAndroid: 'transparent',

              }}
              keyboardType='default'
              placeholder={'Search'}
            />
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: Colors.lightGray4,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Ionicons name="filter" size={24} color={Colors.primary} onPress={() => navigation.openDrawer()} />
            </View>
          </View>
        </View>
        <View style={{ width: "100%", height: 2, backgroundColor: Colors.lightGray4, marginVertical: 10 }}></View>
        <FlatList
          nestedScrollEnabled={true}
          vertical
          showsVerticalScrollIndicator={false}
          style={{
            padding: 7.5,
          }}
          ListHeaderComponent={() => {
            return (<View style={{ marginHorizontal: 15 }}>
              {/* <Text style={{ ...Fonts.Black16Bold, marginBottom:10 }}>{"popular_Search"}</Text>
        <TagSelect
          data={tags}
          max={0}
        /> */}
              <Text style={{ ...Fonts.Black16Bold, paddingBottom: 10 }}>{"Popular Search"}</Text>

            </View>)
          }}
          numColumns={2}
          data={recommendedAll}
          renderItem={({ item, index }) => (
            <CourseCard
              navigation={navigation}
              image={item.image}
              course={item.course}
              by={item.by}
              review={item.review}
              price={item.price} />
          )}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    </SafeAreaView>

  );
};

export default SearchScreen;


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
    borderRadius: 5,
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
