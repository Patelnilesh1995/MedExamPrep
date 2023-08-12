// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useRef, useState, useEffect } from 'react';

import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Image, FlatList, ActivityIndicator, BackHandler, StatusBar } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  useTheme,
  TouchableRipple,
  TextInput,

} from 'react-native-paper';

import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import Animated, { floor } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Home } from '../../Components/keys'
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../Components/Loader';

import { Colors } from '../../../themes/colors';
import { Fonts } from "../../../themes/fonts";
import { AirbnbRating } from 'react-native-elements';
import recommended from "../../data/recommendedData";
import popular from "../../data/popularSearchData";
import Recommended from "../../Components/recommendedCard";
import LatestNews from '../../Components/latestNewsCard';
import feature from "../../data/featureData";
import badgeData from "../../data/badgeData";
import PopularCourse from "../../Components/popularCourseCard";
import Feature from "../../Components/FeatureCard";
import ConstantStyle from "../../../themes/styles";
//import { useTranslation } from "react-i18next";
import { AlertDialog, Button } from "native-base";
import Swiper from 'react-native-swiper';
import { checkConnectivity } from '../../ApiConfig/checkConnectivity';
import callApi from '../../ApiConfig/API/api_new';
import { useToast, Box } from "native-base";


const DashboardScreen = ({ navigation }) => {

  const { colors } = useTheme();
  const [userName, setuserName] = useState('');
  const [BannerList, setBannerList] = useState([]);
  const [CourseList, setCourseList] = useState([]);
  const [BlogList, setBlogList] = useState([]);
  const [NewsList, setNewsList] = useState([]);
  const [PreparationTipsList, setPreparationTipsList] = useState({});



  const isFocused = useIsFocused();
  const [editid, seteditid] = useState('0');
  const [userid, setuserid] = useState();
  const [loading, setLoading] = useState(false);

  const BadgeColor = ["#6B97F8", "#15A812", "#CD8025", "#AD5C5C"]
  //const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  const cancelRef = useRef(null)
  const toast = useToast();



  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    if (navigation.isFocused()) {
      setIsOpen(!isOpen)
      return true;
    }
  };

  const _retrieveData = async () => {
    const stringifiedData = await AsyncStorage.getItem('userInfo');
    if (stringifiedData) {
      const data = JSON.parse(stringifiedData); // Parse the string back to an object
      console.log('Retrieved data:', data.id);
      setuserName(data.name)
      setuserid(data.id)
    }
  };


  useEffect(() => {
    _retrieveData();
  }, []);

  useEffect(() => {
    console.log('userid===', userid);
    checkValidation();
  }, [userid]);


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
        Home,
        'GET',
        {}
      );


      if (responseJson.success === "true") {

        // const bannerData = responseJson.data.preparation_tips;
        setBannerList(responseJson.data.banner)
        setCourseList(responseJson.data.course)
        setBlogList(responseJson.data.blog)
        setNewsList(responseJson.data.news)
        setPreparationTipsList(responseJson.data.preparation_tips)
        //console.log(bannerData);

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


  const banners = [
    require('../../../assets/image/card.png'), // Replace with the actual image paths or URIs
    require('../../../assets/image/card.png'),
    require('../../../assets/image/card.png'),
  ];



  return (
    <SafeAreaView style={[ConstantStyle.container, {  }]}>
      <View style={{ backgroundColor: Colors.white, marginBottom: 45 }}>
        <View style={styles.headerContainer}>
          <StatusBar barStyle="dark-content" backgroundColor={Colors.primary} />
          <View style={styles.userImage}>
            <Image
              style={{
                width: 65,
                height: 65,
                borderRadius: 50
              }}
              source={require("../../../assets/image/user2.jpg")} />
          </View>
          <View style={styles.textContainer}>
            <Text style={{ ...Fonts.Black18Bold, letterSpacing: 1, paddingBottom: 10 }}>{userName}</Text>
            <Text style={{ ...Fonts.Black16Regular, lineHeight: 16 }}>{"Good Morning"}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Notification")} style={styles.iconContainer}>
            <View style={{ width: 10, height: 10, backgroundColor: Colors.danger, borderRadius: 10, position: "absolute", right: '25%' }}></View>
            <Ionicons name="notifications" size={32} color="black" />
          </TouchableOpacity>
        </View>

        <Loader loading={loading} />

        {
          loading ? null :
            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 25 }}>
              {/* <View>
                    <Image
                        style={styles.cardBackground} alt="abc"
                        source={require('../../../assets/image/card.png')}
                    />
                    <View style={{ position: "absolute", bottom: "8%", marginHorizontal: 15 }}>
                        <Text style={{ ...Fonts.White19Regular, letterSpacing: 1, lineHeight: 23 }}>Learn from basics</Text>
                        <Text style={{ ...Fonts.White20Bold, letterSpacing: 1, lineHeight: 23 }}>Full UI and UX designs</Text>
                        <TouchableOpacity activeOpacity={0.8}
                            style={{
                                marginTop: 3,
                                height: 35,
                                borderTopLeftRadius: 25,
                                justifyContent: "center",
                                borderBottomRightRadius: 25,
                                backgroundColor: Colors.primary
                            }}
                            onPress={() => navigation.navigate('DetailScreen')}>
                            <Text style={{ ...Fonts.White18Bold, textAlign: "center", lineHeight: 20 }}>{"know_More"}</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
              <Swiper
                autoplay
                showsPagination={false}
                style={styles.swiperContainer}>
                {BannerList.map((banner, index) => (
                  <View key={index} style={styles.bannerSlide}>
                    <Image source={{ uri: banner.image }} style={styles.bannerImage} />
                  </View>
                ))}
              </Swiper>


              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, marginTop: 20 }}>
                <Text style={{ ...Fonts.Black18Bold }}>{"Popular course"}</Text>
                <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.navigate('CourseScreen')}>
                  <Text style={{ ...Fonts.Primary14Regular }}>{"See All"}</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={CourseList}
                renderItem={({ item, index }) => (
                  <TouchableOpacity activeOpacity={0.8}
                    onPress={() => navigation.navigate("YourCourseDetails", { item })}>
                    {/* <View backgroundColor={BadgeColor[index]} style={styles.badge}> */}
                    <View backgroundColor={Colors.primary} style={styles.badge}>

                      <Image style={{
                        width: 40,
                        height: 40,
                        borderRadius: 6,
                      }} source={{ uri: item.icon }} />
                      <Text style={{ ...Fonts.White14Medium, letterSpacing: 0, paddingTop: 5 }}> {item.meta_title} </Text>
                    </View>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  padding: 10,
                }}
              />
              <View style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, }}>
                  <Text style={{ ...Fonts.Black18Bold }}>{"Latest Blogs"}</Text>
                  <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.navigate('RecommendedScreen', { name: "recommended_Text" })} >
                    <Text style={{ ...Fonts.Primary14Regular }}>{"See All"}</Text>
                  </TouchableOpacity>
                </View>
                {BlogList.length > 0 ? BlogList.map((item, index) => {
                  return (
                    <Recommended
                      key={index + ""}
                      navigation={navigation}
                      title={item.title}
                      image={item.image}
                      date={item.updated_at}
                      course={item.course}
                    />
                  )
                }) : null}
              </View>
              <View style={{ marginTop: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, }}>
                  <Text style={{ ...Fonts.Black18Bold }}>{"Latest News"}</Text>
                  <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.navigate('PopularCourseScreen')}>
                    <Text style={{ ...Fonts.Primary14Regular }}>{"See All"}</Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={NewsList}
                  renderItem={({ item, index }) => (
                    <LatestNews
                      key={index + ""}
                      navigation={navigation}
                      image={item.image}
                      desc={item.meta_title}
                      title={item.title}
                      date={item.updated_at} />
                  )}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    padding: 10,
                  }}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15, }}>
                  <Text style={{ ...Fonts.Black18Bold }}>{"Preparation Tips"}</Text>
                  <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.navigate('PopularCourseScreen')}>
                    {/* <Text style={{ ...Fonts.Primary14Regular }}>{"See All"}</Text> */}
                  </TouchableOpacity>
                </View>

                {/* {PreparationTipsList.length > 0 ? PreparationTipsList.map((item, index) => {
              console.log('data======',PreparationTipsList)
              return (
                <PopularCourse course={item.course}
                  key={index + ""}
                  navigation={navigation}
                  image={item.image}
                   />
              )
            }) : null} */}

                {
                  PreparationTipsList != undefined ?
                    <PopularCourse course={PreparationTipsList.created_at}
                      key={""}
                      navigation={navigation}
                      image={PreparationTipsList.image}
                      desc={PreparationTipsList.description}
                    /> : null
                }
              </View>
              {/* <View style={{ paddingHorizontal: 15 }}>
            <View style={{ marginTop: 15, flexDirection: "row", justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={{ flex: 1, marginRight: 7.5 }}
                onPress={() => navigation.navigate("DetailScreen")}
                activeOpacity={0.9}
              >
                <View
                  style={{
                    backgroundColor: Colors.lightGray,
                    borderRadius: 10,
                    ...ConstantStyle.shadow
                  }}>
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Image alt="abc"
                      style={{
                        width: '100%',
                        height: 150,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                      }}
                      source={require("../../../assets/image/course1.jpg")} >
                    </Image>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 10,
                    marginHorizontal: 10,
                    borderRadius: 10,
                  }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: "column" }}>
                      <Text style={{ ...Fonts.Black16Bold, textAlign: "left" }}>Google UX design</Text>
                      <Text style={{ ...Fonts.Grey14Regular, textAlign: "left" }}>Albert Portlia</Text>
                      <View style={{ flexDirection: "row" }}>
                        <AirbnbRating
                          isDisabled={true}
                          showRating={false}
                          size={15}
                          count={5}
                          defaultRating={5}
                          starContainerStyle={{ marginHorizontal: -3 }} />
                        <Text style={Fonts.Grey14Regular} > (225) </Text></View>
                      <Text style={{ ...Fonts.Primary16Bold, marginLeft: 2, textAlign: "left" }}>$ 889.00</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("DetailScreen")}
                activeOpacity={0.9}
                style={{ flex: 1, marginLeft: 7.5 }}>
                <View
                  style={{
                    // marginLeft: 15,
                    backgroundColor: Colors.lightGray,
                    borderRadius: 10,
                    ...ConstantStyle.shadow
                  }}>
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <Image alt="abc"
                      style={{
                        width: '100%',
                        height: 150,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                      }}
                      source={require("../../../assets/image/course2.jpg")} >
                    </Image>
                  </View>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 10,
                    marginHorizontal: 10,
                    borderRadius: 10,
                  }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: "column" }}>
                      <Text style={{ ...Fonts.Black16Bold, textAlign: "left" }}>Google UX design</Text>
                      <Text style={{ ...Fonts.Grey14Regular, textAlign: "left" }}>Albert Portlia</Text>
                      <View style={{ flexDirection: "row" }}>
                        <AirbnbRating
                          isDisabled={true}
                          showRating={false}
                          size={15}
                          count={5}
                          defaultRating={5}
                          starContainerStyle={{ marginHorizontal: -3 }} />
                        <Text style={Fonts.Grey14Regular} > (225) </Text></View>
                      <Text style={{ ...Fonts.Primary16Bold, marginLeft: 2, textAlign: "left" }}>$ 889.00</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginVertical: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15 }}>
              <Text style={{ ...Fonts.Black18Bold }}>{"feature_Courses"}</Text>
              <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.navigate('RecommendedScreen', { name: t("feature_Courses") })}>
                <Text style={{ ...Fonts.Primary14Regular }}>{"view_All_Text"}</Text>
              </TouchableOpacity>
            </View>
            {feature.length > 0 ? feature.map((item, index) => {
              return (
                <Feature
                  key={index + ""}
                  navigation={navigation}
                  course={item.course}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  star={item.star} />
              )
            }) : null}
          </View> */}
            </ScrollView>
        }
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}>
          <AlertDialog.Content bg={Colors.lightGray} py={2}>
            <AlertDialog.Body>
              <Text style={{ ...Fonts.Black18Bold, alignItems: 'center', textAlign: 'center', marginBottom: 10 }}>
                {"Are you sure you want to exit!"}
              </Text>
              <Button.Group style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Button bg={Colors.white} style={{ ...ConstantStyle.shadow }}
                  _text={{ ...Fonts.Grey16Regular }}
                  _pressed={{
                    bg: Colors.white,
                  }}
                  onPress={onClose}
                  ref={cancelRef} >{"Cancel"}
                </Button>
                <Button bg={Colors.orange} style={{ ...ConstantStyle.shadow }} _text={{ ...Fonts.White18Bold }}
                  onPress={() => BackHandler.exitApp()}
                  _pressed={{
                    bg: Colors.primary
                  }}
                >
                  {"Exit"}
                </Button>
              </Button.Group>
            </AlertDialog.Body>
          </AlertDialog.Content>
        </AlertDialog>

      </View>
    </SafeAreaView >
  );
};

export default DashboardScreen;


const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 0,
  },
  swiperContainer: {
    height: 200,
    //opacity: 0.7
  },
  bannerSlide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Adjust the image resizing mode as needed
  },
  userImage: {
    flex: 0.8,
    marginHorizontal: 15,
    marginVertical: 2
  },
  textContainer: {
    flex: 3.10,
  },
  iconContainer: {
    flex: 0.4,
    marginHorizontal: 15,
  },
  cardBackground: {
    width: '100%',
    backgroundColor: Colors.black,
    opacity: 0.7
  },
  cardButton: {
    marginVertical: 10,
    width: 150,
    height: 40,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: Colors.primary,
  },
  badge: {
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 20,
    flexDirection: 'column',
    alignItems: "center",
    marginHorizontal: 6,
    borderRadius: 10
  }
});
