// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useRef, useState, useEffect } from 'react';

import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, Image, FlatList ,ActivityIndicator} from 'react-native';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker'
import Axios from 'axios';
import Loader from '../../Components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { InsertFamily, FormApi_view, Login, InsertMemberData, GeneralApi, FormApi } from '../../Components/keys'
import { useIsFocused } from '@react-navigation/native';



const MemberDetailScreen = ({ navigation, route }) => {

  const { colors } = useTheme();

  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const [imageData, setImageData] = useState('');
  const isFocused = useIsFocused();

  const [MemberDetailList, setMemberDetailList] = useState([]);

  const [editid, seteditid] = useState('0');
  const [userid, setuserid] = useState(route.params.id);


  const [loading, setLoading] = useState(false);


  const _retrieveData = async () => {
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    // setuserid(await AsyncStorage.getItem('user_id'));
    //const myArray = await AsyncStorage.getItem('@MySuperStore:key');
    console.log('id=', route.params.id);

    getMemberDetail(route.params.id);

  };


  useEffect(() => {
    _retrieveData();
  }, [isFocused]);




  const getMemberDetail = async (userid) => {
    setLoading(true);
    const APIurl = FormApi + 'FormID=1&whereCon=family_details.ID=' + userid;
    await Api_Family(APIurl)
    console.log("Loginapi=", APIurl);
  }

  async function Api_Family(APIurl) {
    Axios.get(APIurl)
      .then(function (response) {
        // console.log(response.data.data.error)
        setLoading(false);

        if (response.data.data.error === "0") {

          setMemberDetailList(response.data.data.result_set[0]);

        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);

      })
  }




  const FamilyList = ({ item }) => {

    return <TouchableOpacity style={styles.card} onPress={() => { }}>
      <View style={{ flex: 1 }}>

        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ width: 105, height: 105 }}>
            <Image
              source={require('../../../Image/user_icon.png')}
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
                margin: 0,
              }}
            />

          </View>

          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.cardtext} numberOfLines={1}>{item.fname + ' ' + item.fhname + ' ' + item.lname}  </Text>
            <Text style={styles.cardtextsmall} numberOfLines={1}>{item.dateofbirth}  </Text>
            <Text style={[styles.cardtextsmall, { paddingTop: 0 }]} numberOfLines={1}>{item.relation_with_headf}  </Text>

          </View>

        </View>

      </View>
    </TouchableOpacity>
  };


  return (
    <View style={{ flex: 1, padding: 0 }}>

      <SafeAreaView style={{ flex: 1, padding: 6 }}>
        {/* <Loader loading={loading} /> */}
        <ScrollView style={styles.container}>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <View style={{ width: 130, height: 130 }}>
              <Image
                source={require('../../../Image/user_icon.png')}
                style={{
                  width: 150,
                  height: 150,
                  resizeMode: 'contain',
                  margin: 0,
                }}
              />

            </View>

            <Text style={styles.title}>{MemberDetailList.fname + ' ' + MemberDetailList.fhname + ' ' + MemberDetailList.lname}</Text>
            <View style={[styles.sabview, { alignItems: 'center', alignSelf: 'center' }]}>
              <Text style={[styles.rightText, { alignSelf: 'center', textAlign: 'center' }]}>{'Relationship: ' + MemberDetailList.relation_with_headf}</Text>
            </View>


          </View>
          <View>
            <View style={styles.action}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 , backgroundColor:'#307ecc'}}>
                <Text style={styles.headingText}>PERSONAL DETAILS</Text>
                <TouchableOpacity style={{ height: 22, width: 22, alignSelf: 'flex-end',marginRight:5 }} onPress={() => { navigation.navigate('AddEditMemberScreen', { title: 'Add/Edit Member Detail', nextTitle: 'Call', id: userid }) }}>      
                    <AntDesign style={styles.icon} color="white" name="edit" size={20} />
                </TouchableOpacity>
              </View>

            </View>

            <View style={styles.sabview}>
              <Text style={styles.leftText}>{'Mobile:'}</Text>
              <Text style={styles.rightText}>{MemberDetailList.contactno}</Text>
            </View>

            <View style={styles.sabview}>
              <Text style={styles.leftText}>Whatsapp:</Text>
              <Text style={styles.rightText}>{MemberDetailList.whatsappno}</Text>
            </View>

            <View style={styles.sabview}>
              <Text style={styles.leftText}>B'day:</Text>
              <Text style={styles.rightText}>{MemberDetailList.dateofbirth}</Text>
            </View>

            <View style={styles.sabview}>
              <Text style={styles.leftText}>Native:</Text>
              <Text style={styles.rightText}>{MemberDetailList.nativeplaceb}</Text>
            </View>

            <View style={styles.sabview}>
              <Text style={styles.leftText}>Residence:</Text>
              <Text style={[styles.rightText, { flex: 1 }]}>{MemberDetailList.line1 + ', ' + MemberDetailList.area + ', ' + MemberDetailList.city + ', ' + MemberDetailList.statem + '-' + MemberDetailList.pincode}</Text>
            </View>

            <View style={styles.sabview}>
              <Text style={styles.leftText}>Panth:</Text>
              <Text style={styles.rightText}>{MemberDetailList.panthj}</Text>
            </View>

            <View style={styles.sabview}>
              <Text style={styles.leftText}>Email:</Text>
              <Text style={styles.rightText}>{MemberDetailList.email}</Text>
            </View>

            <View style={styles.sabview}>
              <Text style={styles.leftText}>Education:</Text>
              <Text style={styles.rightText}>{MemberDetailList.qualification}</Text>
            </View>

            <View style={styles.sabview}>
              <Text style={styles.leftText}>Blood Group:</Text>
              <Text style={styles.rightText}>{MemberDetailList.bloodgroupc}</Text>
            </View>

            <View style={styles.sabview}>
              <Text style={styles.leftText}>Gender:</Text>
              <Text style={styles.rightText}>{MemberDetailList.gendera}</Text>
            </View>

            <View style={styles.sabview}>
              <Text style={styles.leftText}>Marital Status:</Text>
              <Text style={styles.rightText}>{MemberDetailList.martialstatusd}</Text>
            </View>

            {
              MemberDetailList.martialstatusd == 'Single' ? <View>
                {/* <View style={styles.sabview}>
                  <Text style={styles.leftText}>Sakhe Self:</Text>
                  <Text style={styles.rightText}>{MemberDetailList.shakhe}</Text>
                </View>

                <View style={styles.sabview}>
                  <Text style={styles.leftText}>Sakhe Mama:</Text>
                  <Text style={styles.rightText}>{MemberDetailList.sakhe_mama}</Text>
                </View>

                <View style={styles.sabview}>
                  <Text style={styles.leftText}>Sakhe Papa-Mama:</Text>
                  <Text style={styles.rightText}>{MemberDetailList.sakhe_papa_mama}</Text>
                </View>

                <View style={styles.sabview}>
                  <Text style={styles.leftText}>Sakhe Mummy-Mama:</Text>
                  <Text style={styles.rightText}>{MemberDetailList.sakhe_mummy_mama}</Text>
                </View> */}

              </View> : <View>
                <View style={styles.sabview}>
                  <Text style={styles.leftText}>Daughter(s):</Text>
                  <Text style={styles.rightText}>{MemberDetailList.daughterh}</Text>
                </View>

                <View style={styles.sabview}>
                  <Text style={styles.leftText}>Son(s):</Text>
                  <Text style={styles.rightText}>{MemberDetailList.song}</Text>
                </View>

                <View style={styles.sabview}>
                  <Text style={styles.leftText}>Anniversary:</Text>
                  <Text style={styles.rightText}>{MemberDetailList.dateanniv}</Text>
                </View>

              </View>
            }
          </View>



          <View>
            <View style={styles.action}>
              <Text style={styles.headingText}>OCCUPATION DETAILS</Text>
            </View>

            <View style={styles.sabview}>
              <Text style={styles.leftText}>{'Occupation:'}</Text>
              <Text style={styles.rightText}>{MemberDetailList.businessprofessione}</Text>
            </View>
            {
              MemberDetailList.businessprofessione != 'Home Maker' || MemberDetailList.businessprofessione != 'Student' || MemberDetailList.businessprofessione != 'Retired' ? <View>
                <View style={styles.sabview}>
                  <Text style={styles.leftText}>Company Name:</Text>
                  <Text style={styles.rightText}>{MemberDetailList.firmname}</Text>
                </View>

                <View style={styles.sabview}>
                  <Text style={styles.leftText}>Category of Company:</Text>
                  <Text style={styles.rightText}>{MemberDetailList.category_businessk}</Text>
                </View>

                <View style={styles.sabview}>
                  <Text style={styles.leftText}>Type of Company:</Text>
                  <Text style={styles.rightText}>{MemberDetailList.type_businessl}</Text>
                </View>

                <View style={styles.sabview}>
                  <Text style={styles.leftText}>Address:</Text>
                  <Text style={[styles.rightText, { flex: 1 }]}>{MemberDetailList.firmaddress}</Text>
                </View>

                <View style={styles.sabview}>
                  <Text style={styles.leftText}>Number:</Text>
                  <Text style={styles.rightText}>{MemberDetailList.firmcontact}</Text>
                </View>

                <View style={styles.sabview}>
                  <Text style={styles.leftText}>Office Email:</Text>
                  <Text style={styles.rightText}>{MemberDetailList.firm_email}</Text>
                </View>

                <View style={styles.sabview}>
                  <Text style={styles.leftText}>Website:</Text>
                  <Text style={styles.rightText}>{MemberDetailList.firmwebsite}</Text>
                </View>
              </View> : null
            }


          </View>


        </ScrollView>
      </SafeAreaView>

      {loading && (
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          )}

    </View>

  );
};

export default MemberDetailScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },

  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'darkgrey'
  },

  leftText: {
    // alignSelf: 'left',
    fontSize: 14,
    //paddingHorizontal: 10,
    paddingLeft: 10,
    fontWeight: '600',
    color: '#333',
  },
  rightText: {
    //alignSelf: 'left',
    fontSize: 14,
    paddingHorizontal: 0,
    paddingLeft: 5,
    textAlign: 'left',
    color: '#333',
  },

  sabview: {
    flexDirection: 'row',
    marginBottom: 15,
  },


  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 0,
    marginLeft: 0,
    borderBottomColor: '#f2f2f2',
    backgroundColor: '#307ecc',
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
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 20,
    marginBottom: 20,
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
