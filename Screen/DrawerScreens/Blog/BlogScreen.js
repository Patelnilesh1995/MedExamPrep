// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useRef, useState, useEffect } from 'react';

import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Image, FlatList, ActivityIndicator } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  useTheme,
  TouchableRipple,
  TextInput,

} from 'react-native-paper';


import Axios from 'axios';
import Loader from '../../Components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { InsertFamily, FormApi_view, Login, InsertMemberData, GeneralApi, FormApi, Courses, Blogs } from '../../Components/keys'
import { useIsFocused } from '@react-navigation/native';

import ConstantStyle from "../../../themes/styles";
import { Progress } from "native-base";
import { Fonts } from "../../../themes/fonts";
import { Colors } from "../../../themes/colors";
// import { useTranslation } from "react-i18next";
import icons from "../../../themes/icons";
import { checkConnectivity } from '../../ApiConfig/checkConnectivity';
import callApi from '../../ApiConfig/API/api_new';
import { useToast, Box } from "native-base";
import BlogListing from '../../Components/blogCard';




const BlogScreen = ({ navigation }) => {

  const { colors } = useTheme();

  const [BlogList, setBlogList] = useState([]);
  const isFocused = useIsFocused();
  const [editid, seteditid] = useState('0');
  const [userid, setuserid] = useState('');
  const toast = useToast();


  const [loading, setLoading] = useState(false);


  const yourCourse = [
    {
      id: 1,
      courseName: "Web development course",
      description: "Total 20 lessons",
      time: "40 hr 50 min",
      image: icons.course1,
    },
    {
      id: 2,
      courseName: "Web development bootcamp",
      description: "Total 15 lessons",
      time: "20 hr 15 min",
      image: icons.course2,
    },
    {
      id: 3,
      courseName: "React the complete guide",
      description: "Total 30 lessons",
      time: "15 hr 20 min",
      image: icons.course3,
    },
    {
      id: 4,
      courseName: "Javascript zero to hero",
      description: "Total 45 lessons",
      time: "45 hr 45 min",
      image: icons.course4,
    },
    {
      id: 5,
      courseName: "Python mega course",
      description: "Total 35 lessons",
      time: "10 hr 15 min",
      image: icons.course5,
    },
  ]


  const _retrieveData = async () => {
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    setuserid(await AsyncStorage.getItem('user_id'));
    //const myArray = await AsyncStorage.getItem('@MySuperStore:key');
    let userid = await AsyncStorage.getItem('user_id');
    console.log("userid=", userid)

    checkValidation();
  };


  useEffect(() => {
    _retrieveData();
  }, []);


  const checkValidation = async () => {
    const isConnected = await checkConnectivity();
    if (!isConnected) {
      alert('Please check your network connection!');
      return;
    } else {
      handleData();
    }
  }

  const handleData = async () => {
    try {
      setLoading(true); // Set loading to true before making the API call

      const responseJson = await callApi(
        Blogs,
        'GET',
        {}
      );

      if (responseJson.success === "true") {

        const bannerData = responseJson.data;
        setBlogList(responseJson.data.blogs)
        //console.log("data=========",bannerData);

      } else {
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



  return (
    <SafeAreaView style={[ConstantStyle.container, { backgroundColor: Colors.primary }]}>
      <View style={{ alignItems: "center", marginHorizontal: 15, justifyContent: "center", paddingVertical: 5, flexDirection: "row" }}>
        <Text style={{ ...Fonts.Black22Bold, }}>{"Blogs"}</Text>
        {/* <Ionicons name="search" size={24} color="black" /> */}
      </View>
      {/* <View style={{ width: "100%", height: 2, backgroundColor: Colors.lightGray4, marginVertical: 5 }}></View> */}
      <View style={{ backgroundColor: Colors.white, flex: 1 }}>
        {/* <View
        style={{
          backgroundColor: Colors.white,
          margin: 15,
          borderRadius: 10,
          paddingVertical: 10,
          ...ConstantStyle.shadow
        }}>
        <Text style={{ ...Fonts.Purple22Bold, marginHorizontal: 15, marginTop: 0 }}>{"ongoing_Course"}</Text>
        <View style={{ alignItems: "center", marginVertical: 8, flexDirection: "row" }}>
          <View style={{ marginHorizontal: 15, flex: 0.3, }}>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 50
              }}
              source={require("../../../assets/image/popular1.jpg")} >
            </Image>
          </View>
          <View style={{ flex: 1.5, flexDirection: "column" }}>
            <Text style={{ ...Fonts.Primary16Bold }}>Full UX/UI Design</Text>
            <Progress rounded="5" mt={2} w="95%" colorScheme="primary" bg={Colors.lightGray4} value={45} />
            <Text style={{ ...Fonts.Primary14Bold, textAlign: "right", right: 15, marginTop: 5 }}>45% {"completed"}</Text>
          </View>
        </View>
      </View>
      <View style={{ marginHorizontal: 15, marginBottom: 10 }}>
        <Text style={{ ...Fonts.Black18Bold, }}>{"your_Purchase_Course"}</Text>
      </View> */}


<ScrollView>
        <Loader loading={loading} />
        {/* <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
          data={BlogList}
          renderItem={({ item, index }) => (
            // <TouchableOpacity activeOpacity={0.7} onPress={() => {navigation.navigate('YourCourseDetails', { title: item.title, id: item.slug })}}
            <TouchableOpacity activeOpacity={0.7} onPress={() => { navigation.navigate('YourCourseDetails', { item }) }}

              style={{
                marginVertical: 7,
                marginHorizontal: 15,
                backgroundColor: Colors.white,
                borderRadius: 10,
                ...ConstantStyle.shadow
              }}>
              <View style={{ alignItems: "center", margin: 10, flexDirection: "row" }}>
                <Image alt="abc"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10
                  }}
                  source={{ uri: item.image }} >
                </Image>
                <View style={{ marginHorizontal: 10, flexDirection: "column", alignSelf: 'flex-start', }}>
                  <Text style={{ ...Fonts.Primary16Bold, lineHeight: 22 }}>{item.title}</Text>
                  <Text numberOfLines={2} ellipsizeMode='tail' style={{ ...Fonts.Black14Bold, lineHeight: 22, textAlign: "left" }}>{item.meta_description}</Text>
                  {/* <Text style={{ ...Fonts.Grey14Regular, lineHeight: 22, textAlign: "left" }}>{item.time}</Text> *


                </View>
                <View style={{ position: "absolute", right: "2%", bottom: "2%" }}>
                  {/* <AntDesign name="play" size={28} color={Colors.primary} /> *

                  <TouchableOpacity style={{ backgroundColor: Colors.primary, marginTop: 5, borderRadius: 5, alignSelf: 'flex-end' }} onPress={() => { navigation.navigate('YourCourseDetails', { item }) }}>
                    <Text style={[Fonts.White13Bold, { textAlign: "center", padding: 6 }]}>{'View More'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          )}
          scrollEnabled={true}
          keyExtractor={(item) => `${item.id}`} /> */}


        {BlogList.length > 0 ? BlogList.map((item, index) => {
          return (
            <BlogListing
              key={index + ""}
              item ={item}
              navigation={navigation}
              title={item.title}
              image={item.image}
              date={item.start_date}
              desc={item.meta_description}
            />
          )
        }) : null}

</ScrollView>

      </View>
    </SafeAreaView>
  );
};

export default BlogScreen;


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
