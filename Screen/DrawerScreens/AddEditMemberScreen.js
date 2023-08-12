// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useRef, useState, useEffect } from 'react';

import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, ImageBackground, FlatList,ActivityIndicator } from 'react-native';
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
import BottomSheet from 'reanimated-bottom-sheet';
import Animated, { floor } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-date-picker'
import Axios from 'axios';
import Loader from '../Components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { InsertFamily, FormApi_view, Login, InsertMemberData, GeneralApi } from '../Components/keys'
import MyTextInput from '../Components/MyTextInput';

import { useNavigation } from '@react-navigation/native';



const AddEditMemberScreen = ({ navigation, route }) => {

  const { colors } = useTheme();


  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const [imageData, setImageData] = useState('');
  const [visible, setvisible] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [open, setOpen] = useState(false)
  const [serviceid, setserviceid] = useState('');

  const [isApiLoading, setIsApiLoading] = useState(true);


  const [maritalList, setmaritalList] = useState([]);
  const [bloodList, setbloodList] = useState([]);
  const [comp_categoryList, setcomp_categoryList] = useState([]);
  const [comp_typeList, setcomp_typeList] = useState([]);
  const [genderList, setgenderList] = useState([]);
  const [relationList, setRelationList] = useState([]);
  const [occupationList, setoccupationList] = useState([]);
  const [stateList, setstateList] = useState([]);
  const [nativePlaceList, setNativePlaceList] = useState([]);
  const [SonList, setSonListList] = useState([]);
  const [DaughterList, setDaughterList] = useState([]);


  const [editid, seteditid] = useState(route.params.id);
  const [userid, setuserid] = useState('');


  const [dob, setDob] = useState('');
  const [m_dob, set_m_Dob] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const [RelationId, setRelationId] = useState('');

  const [firstname, setfirstname] = useState('');
  const [middlename, setmiddlename] = useState('');
  const [lastname, setlastname] = useState('');
  const [genderid, setgenderid] = useState('');
  const [NativePlaceid, setNativePlaceid] = useState('');
  const [BloodGroup, setBloodGroup] = useState('');
  const [BloodGroupId, setBloodGroupID] = useState('');
  const [MaritalStatus, setMaritalStatus] = useState('');
  const [MaritalStatusId, setMaritalStatusId] = useState('1');
  const [Sonid, setSonid] = useState('');
  const [Daughterid, setDaughterid] = useState('');

  const [SakheSelf, setSakheSelf] = useState('');
  const [SakheMama, setSakheMama] = useState('');
  const [SakhePapaMama, setSakhePapaMama] = useState('');
  const [SakheMummyMama, setSakheMummyMama] = useState('');
  const [Education, setEducation] = useState('');
  const [EducationId, setEducationId] = useState('');
  const [PanthName, setPanthName] = useState('Murtipujak');
  const [mobileno, setmobileno] = useState('');
  const [whatsappno, setwhatsappno] = useState('');
  const [emailid, setemailid] = useState('');

  const [Addressline, setAddressline] = useState('');
  const [Area, setArea] = useState('');
  const [City, setCity] = useState('');
  const [StateID, setStateID] = useState('');
  const [statename, setstatename] = useState('');
  const [Pincode, setPincode] = useState('');

  const [OccupationID, setOccupationID] = useState('');
  const [Occupation, setOccupation] = useState('');
  const [NameofCompany, setNameofCompany] = useState('');
  const [CategoryOfCompany, setCategoryOfCompany] = useState('');
  const [CategoryOfCompanyId, setCategoryOfCompanyId] = useState('');
  const [TypeOfCompany, setTypeOfCompany] = useState('');
  const [TypeOfCompanyId, setTypeOfCompanyId] = useState('');


  const [Off_Address, setOff_Address] = useState('');
  const [Off_Area, setOff_Area] = useState('');
  const [Off_City, setOff_City] = useState('');
  const [Off_StateId, setOff_StateId] = useState('');
  const [Off_Statename, setOff_Statename] = useState('');

  const [Off_Pincode, setOff_Pincode] = useState('');
  const [Off_Number, setOff_Number] = useState('');
  const [Off_Website, setOff_Website] = useState('');
  const [Off_EmailId, setOff_EmailId] = useState('');

  const [FbLink, setFbLink] = useState('');
  const [InstaLink, setInstaLink] = useState('');
  const [TwitterLink, setTwitterLink] = useState('');
  const [YoutubeLink, setYoutubeLink] = useState('');

  const [photoid, setphotoid] = useState('');
  const [dob_show ,setdob_show] = useState('');



  const Relation_DropdownComponent = () => {
    return (
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={styles.inputTextStyle}
        data={relationList}
        search
        maxHeight={300}
        labelField="label"
        valueField="Id"
        placeholder={RelationId}
        searchPlaceholder="Search..."
        value={RelationId}
        onChange={item => {
          setRelationId(item.Id);
        }}
        renderRightIcon={() => (
          <AntDesign style={styles.icon} color="black" name="down" size={20} />
        )}
      />
    );
  };

  const Gender_DropdownComponent = () => {
    return (
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={styles.inputTextStyle}
        data={genderList}
        search
        maxHeight={300}
        labelField="label"
        valueField="Id"
        placeholder={genderid}
        searchPlaceholder="Search..."
        value={genderid}
        onChange={item => {
          setgenderid(item.Id);
        }}
        renderRightIcon={() => (
          <AntDesign style={styles.icon} color="black" name="down" size={20} />
        )}
      />
    );
  };

  const Nativeplace_DropdownComponent = () => {
    return (
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={nativePlaceList}
        itemTextStyle={styles.inputTextStyle}
        search
        maxHeight={300}
        labelField="label"
        valueField="Id"
        //placeholder={}
        searchPlaceholder="Search..."
        value={NativePlaceid}
        onChange={item => {
          setNativePlaceid(item.Id);
        }}
        renderRightIcon={() => (
          <AntDesign style={styles.icon} color="black" name="down" size={20} />
        )}
      />
    );
  };

  const BloodGp_DropdownComponent = () => {
    return (
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={bloodList}
        itemTextStyle={styles.inputTextStyle}
        search
        maxHeight={300}
        labelField="label"
        valueField="Id"
        placeholder={BloodGroup}
        searchPlaceholder="Search..."
        value={BloodGroupId}
        onChange={item => {
          setBloodGroupID(item.Id);
        }}
        renderRightIcon={() => (
          <AntDesign style={styles.icon} color="black" name="down" size={20} />
        )}
      />
    );
  };

  const Marital_DropdownComponent = () => {
    return (
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={maritalList}
        itemTextStyle={styles.inputTextStyle}
        search
        maxHeight={300}
        labelField="label"
        valueField="Id"
        placeholder={MaritalStatus}
        searchPlaceholder="Search..."
        value={MaritalStatusId}
        onChange={item => {
          setMaritalStatusId(item.Id);
        }}
        renderRightIcon={() => (
          <AntDesign style={styles.icon} color="black" name="down" size={20} />
        )}
      />
    );
  };

  const Son_DropdownComponent = () => {
    return (
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={styles.inputTextStyle}
        data={SonList}
        search
        maxHeight={300}
        labelField="label"
        valueField="Id"
        //placeholder={BloodGroup}
        searchPlaceholder="Search..."
        value={Sonid}
        onChange={item => {
          setSonid(item.Id);
        }}
        renderRightIcon={() => (
          <AntDesign style={styles.icon} color="black" name="down" size={20} />
        )}
      />
    );
  };

  const Daughter_DropdownComponent = () => {
    return (
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={DaughterList}
        itemTextStyle={styles.inputTextStyle}
        search
        maxHeight={300}
        labelField="label"
        valueField="Id"
        //placeholder={daughter}
        searchPlaceholder="Search..."
        value={Daughterid}
        onChange={item => {
          setDaughterid(item.Id);
        }}
        renderRightIcon={() => (
          <AntDesign style={styles.icon} color="black" name="down" size={20} />
        )}
      />
    );
  };

  const State_DropdownComponent = () => {
    return (
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={stateList}
        itemTextStyle={styles.inputTextStyle}
        search
        maxHeight={300}
        labelField="StateName"
        valueField="StateId"
        placeholder={statename}
        searchPlaceholder="Search..."
        value={StateID}
        onChange={item => {
          setStateID(item.StateId);
        }}
        renderRightIcon={() => (
          <AntDesign style={styles.icon} color="black" name="down" size={20} />
        )}
      />
    );
  };

  const Office_State_DropdownComponent = () => {
    return (
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={stateList}
        itemTextStyle={styles.inputTextStyle}
        search
        maxHeight={300}
        labelField="StateName"
        valueField="StateId"
        placeholder={Off_Statename}
        searchPlaceholder="Search..."
        value={Off_StateId}
        onChange={item => {
          setOff_StateId(item.StateId);
        }}
        renderRightIcon={() => (
          <AntDesign style={styles.icon} color="black" name="down" size={20} />
        )}
      />
    );
  };

  const Occupation_DropdownComponent = () => {
    return (
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={occupationList}
        itemTextStyle={styles.inputTextStyle}
        search
        maxHeight={300}
        labelField="label"
        valueField="Id"
        placeholder={Occupation}
        searchPlaceholder="Search..."
        value={OccupationID}
        onChange={item => {
          setOccupationID(item.Id);
        }}
        renderRightIcon={() => (
          <AntDesign style={styles.icon} color="black" name="down" size={20} />
        )}
      />
    );
  };

  const Comp_category_DropdownComponent = () => {
    return (
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={comp_categoryList}
        itemTextStyle={styles.inputTextStyle}
        search
        maxHeight={300}
        labelField="label"
        valueField="Id"
        placeholder={CategoryOfCompany}
        searchPlaceholder="Search..."
        value={CategoryOfCompanyId}
        onChange={item => {
          setCategoryOfCompanyId(item.Id);
        }}
        renderRightIcon={() => (
          <AntDesign style={styles.icon} color="black" name="down" size={20} />
        )}
      />
    );
  };

  const Comp_type_DropdownComponent = () => {
    return (
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.containerStyle}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={comp_typeList}
        itemTextStyle={styles.inputTextStyle}
        search
        maxHeight={300}
        labelField="label"
        valueField="Id"
        placeholder={TypeOfCompany}
        searchPlaceholder="Search..."
        value={TypeOfCompanyId}
        onChange={item => {
          setTypeOfCompanyId(item.Id);
        }}
        renderRightIcon={() => (
          <AntDesign style={styles.icon} color="black" name="down" size={20} />
        )}
      />
    );
  };




  const _retrieveData = async () => {
    const email = await AsyncStorage.getItem('email');
    const password = await AsyncStorage.getItem('password');
    setuserid(await AsyncStorage.getItem('user_id'));
    //const myArray = await AsyncStorage.getItem('@MySuperStore:key');
    //getLogin(email, password);

    getFormData();
    console.log("userid====", await AsyncStorage.getItem('user_id'))


    console.log("id====", route.params.id)

  };


  useEffect(() => {
    (async () => {
      _retrieveData();
    })();
  }, []);

  useEffect(() => {
    if (!isApiLoading) {
      // the API call has finished, navigate back to the previous screen
      navigation.goBack();
    }
  }, [isApiLoading]);


  const getFormData = async () => {
    setLoading(true);
    const APIurl = FormApi_view + 'FormID=1&editID=' + editid;
    await Api_FormData(APIurl)
    console.log("api=", APIurl);
  }

  async function Api_FormData(APIurl) {
    Axios.get(APIurl)
      .then(function (response) {
        //console.log(response.data)
        setLoading(false);
        if (response.data.code != undefined) {
          console.log('Country==', response.data.code[1][4]);

          setRelationList(response.data.relation_with_head.result_set);
          setNativePlaceList(response.data.nativeplace.result_set);
          setgenderList(response.data.gender.result_set);
          setbloodList(response.data.bloodgroup.result_set);
          setmaritalList(response.data.martialstatus.result_set);
          setSonListList(response.data.son.result_set);
          setDaughterList(response.data.daughter.result_set);

          setoccupationList(response.data.businessprofession.result_set);
          setcomp_categoryList(response.data.category_business.result_set);
          setcomp_typeList(response.data.type_business.result_set);
          setstateList(response.data.state.result_set);


          setRelationId(response.data.code[20][4]);
          setfirstname(response.data.code[1][4]);
          setmiddlename(response.data.code[3][4]);
          setlastname(response.data.code[2][4]);
          setDob(response.data.code[4][4]);
          setgenderid(response.data.code[5][4]);
          setNativePlaceid(response.data.code[6][4]);
          setBloodGroupID(response.data.code[7][4]);
          setMaritalStatusId(response.data.code[8][4]);
          setSonid(response.data.code[24][4]);
          setDaughterid(response.data.code[25][4]);

          setSakheSelf(response.data.code[9][4]);
          setSakheMama(response.data.code[21][4]);
          setSakhePapaMama(response.data.code[22][4]);
          setSakheMummyMama(response.data.code[23][4]);
          setEducation(response.data.code[10][4]);
          setmobileno(response.data.code[13][4]);
          setwhatsappno(response.data.code[14][4]);
          setemailid(response.data.code[15][4]);
          setAddressline(response.data.code[34][4]);
          setArea(response.data.code[35][4]);
          setCity(response.data.code[36][4]);
          setStateID(response.data.code[37][4]);
          setPincode(response.data.code[38][4]);
          setOccupationID(response.data.code[11][4]);
          setNameofCompany(response.data.code[16][4])
          setCategoryOfCompanyId(response.data.code[31][4]);
          setTypeOfCompanyId(response.data.code[32][4]);
          setOff_Address(response.data.code[17][4]);
          setOff_Area(response.data.code[41][4]);
          setOff_City(response.data.code[42][4]);
          setOff_StateId(response.data.code[43][4]);
          setOff_Pincode(response.data.code[44][4]);
          setOff_Number(response.data.code[18][4]);
          setOff_Website(response.data.code[19][4]);
          setOff_EmailId(response.data.code[33][4]);

          setFbLink(response.data.code[28][4]);
          setInstaLink(response.data.code[30][4]);
          setTwitterLink(response.data.code[29][4]);
          setYoutubeLink(response.data.code[27][4]);

          setphotoid(response.data.code[40][4]);
          //setuserid(response.data.code[39][4]);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  const setApi_insertmember = async () => {

    setErrortext('');
    if (!firstname) {
      alert('Please fill firstname');
      return;
    }
    // else if (!emailid) {
    //   alert('Please fill emailid');
    //   return;
    // }
    else {

      handleApiCall();
      setLoading(true);
      const APIurl = InsertMemberData + 'FormID=1&user_id=' + userid +
        '&photo=' + photoid +
        '&editID=' + editid +
        '&fname=' + firstname +
        '&fhname=' + middlename +
        '&lname=' + lastname +
        '&dateofbirth=' + dob +
        '&gender=' + genderid +
        '&nativeplace=' + NativePlaceid +
        '&bloodgroup=' + BloodGroupId +
        '&martialstatus=' + MaritalStatusId +
        '&shakhe=' + SakheSelf +
        '&email=' + emailid +
        '&qualification=' + Education +
        '&businessprofession=' + OccupationID +
        '&contactno=' + mobileno +
        '&whatsappno=' + whatsappno +
        '&firmname=' + ReplaceTextFunction(NameofCompany, "&", "%26") +
        '&firmaddress=' + ReplaceTextFunction(Off_Address, "&", "%26") +
        '&firm_area=' + ReplaceTextFunction(Off_Area, "&", "%26") +
        '&firm_city=' + Off_City +
        '&firm_state=' + Off_StateId +
        '&firm_pincode=' + Off_Pincode +
        '&firmcontact=' + Off_Number +
        '&firmwebsite=' + Off_Website +
        '&firm_email=' + Off_EmailId +
        '&relation_with_head=' + RelationId +
        '&sakhe_mama=' + SakheMama +
        '&sakhe_papa_mama=' + SakhePapaMama +
        '&sakhe_mummy_mama=' + SakheMummyMama +
        '&son=' + Sonid +
        '&daughter=' + Daughterid +
        '&panth=' + PanthName +
        '&youtube=' + YoutubeLink +
        '&facebook=' + FbLink +
        '&twitter=' + ReplaceTextFunction(TwitterLink, "@", "") +
        '&insta=' + ReplaceTextFunction(InstaLink, "@", "") +
        '&category_business=' + CategoryOfCompanyId +
        '&type_business=' + TypeOfCompanyId +
        '&line1=' + ReplaceTextFunction(Addressline, "&", "%26") +
        '&area=' + ReplaceTextFunction(Area, "&", "%26") +
        '&city=' + City +
        '&state=' + StateID +
        '&pincode=' + Pincode +
        '&dateanniv=' + '';
      await Api_InsertMember(APIurl)
      console.log("insert=", APIurl);
    }

  }

  async function Api_InsertMember(APIurl) {
    Axios.get(APIurl)
      .then(function (response) {
        console.log(response.data)
        setLoading(false);

        if (response.data.response === "true") {
          //alert(response.data.request_code);
          alert('Data inserted successfully...');

          handleApiResponse();

        } else {

          alert(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const handleApiCall = () => {
    setIsApiLoading(true);
    // make your API call here
  };

  const handleApiResponse = () => {
    setIsApiLoading(false);
  };

  const ReplaceTextFunction = (replaceText, replacefrom, replaceTo) => {

    var NewText = replaceText.replace(replacefrom, replaceTo);
    return NewText;
  }



  const showDatepicker = () => {
    //showMode('datetime');
    setOpen(!open);
  };

  const setDateTime = (id) => {
    if (id === '1') {
      setserviceid('1')
    } else {
      setserviceid('2')
    }
    showDatepicker()
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: imageData })
  };

  const postExample = async () => {
    try {
      await fetch(
        'https://sheoganj.kreonsolutions.com/api/media.php', requestOptions)
        .then(response => {
          response.json()
            .then(data => {
              // Alert.alert("Post created at : ",  data.createdAt);
              console.log("Data====", data);
            });
        })
    }
    catch (error) {
      console.error("error=====", error);
    }
  }


  let uploadImage = async (data1) => {
    //Check if any file is selected or not
    if (data1 != null) {
      //If file selected then create FormData
      const fileToUpload = data1;
      const data = new FormData();
      data.append('image', fileToUpload);
      data.append('path', ".");
      //console.log("image====",fileToUpload);
      let res = await fetch(
        'https://sheoganj.kreonsolutions.com/api/media.php',
        {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        }
      );
      let responseJson = await res.json();
      console.log("json=====", responseJson);
      if (responseJson.status == 1) {
        alert('Upload Successful');
      }
    } else {
      //if no file selected the show alert
      alert('Please Select File first');
    }
  };



  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7
    }).then(image => {
      //console.log(image);
      setImageData(image.data);
      setImage(image.path);
      this.bs.current.snapTo(1);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
      includeBase64: true,
      includeExif: true,
    }).then(image => {
      //console.log(image);
      setImageData(image.data);
      setImage(image.path);
      this.bs.current.snapTo(1);

      //uploadImage(image.data);
    })
      .catch((e) => alert(e));
  }




  renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  bs = React.createRef();
  fall = new Animated.Value(1);





  return (
    <View style={{ flex: 1, padding: 0 }}>

      <BottomSheet
        visible={visible}
        ref={this.bs}
        snapPoints={[330, 0]}
        renderContent={this.renderInner}
        renderHeader={this.renderHeader}
        initialSnap={1}
        callbackNode={this.fall}
        enabledGestureInteraction={true}
      />

      <SafeAreaView style={{ flex: 1, padding: 6 }}>
        {/* <Loader loading={loading} /> */}
        <ScrollView style={styles.container}>

          <Animated.View style={{
            margin: 0,
            opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
          }}>

            <View style={styles.sliderContainer}>

              <View style={styles.action}>
                <Text style={styles.headingText}>General Details </Text>
              </View>

              <View style={styles.textwrap}>
                <Text style={styles.textheader}>Relation with Head</Text>

                <Relation_DropdownComponent></Relation_DropdownComponent>
              </View>

              {/* <MyTextInput
                label="Twitter Handle (@yourname)"
                value={TwitterLink}
                onChangeText={setTwitterLink}
                //containerStyle={styles.textInputContainer}
                //inputStyle={styles.textInput}
              /> */}


              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>First Name * </Text> */}
                <TextInput
                  label="First Name *"
                  mode='flat'
                  style={styles.textinput}
                  value={firstname}
                  onChangeText={(name) =>
                    setfirstname(name)
                  }>

                </TextInput>
              </View>

              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>Middle Name *</Text> */}
                <TextInput
                  label="Father's / Husband's Name *"
                  mode='flat'
                  style={styles.textinput}
                  value={middlename}
                  onChangeText={(name) =>
                    setmiddlename(name)
                  }>


                </TextInput>
              </View>

              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>Last Name *</Text> */}
                <TextInput
                  label="Surname *"
                  mode='flat'
                  style={styles.textinput}
                  value={lastname}
                  onChangeText={(name) =>
                    setlastname(name)
                  }>


                </TextInput>
              </View>

               <TouchableOpacity style={styles.textwrap} onPress={() => { setDateTime('1') }}> 

                <View style={{
                 borderBottomWidth:1, borderBottomColor:'#a1a1a1', marginTop:10
                }}>
                  <Text style={[styles.textheader,{fontSize: 15,paddingBottom:15}]}>{dob == '' ? 'Dob *': 'Dob :'+dob_show}</Text>
                  {/* <TextInput
                    label="DoB *"
                    mode='flat'
                    value={dob}
                    disabled={true}
                    style={styles.textinput}
                    onChangeText={(name) =>
                      setDob(name)
                    }> 
                  </TextInput> */}
                </View>
              </TouchableOpacity> 


              <View style={styles.textwrap}>
                <Text style={styles.textheader}>Gender * </Text>

                <Gender_DropdownComponent></Gender_DropdownComponent>
              </View>


              <View style={styles.textwrap}>
                <Text style={styles.textheader}>Native Place * </Text>
                <Nativeplace_DropdownComponent></Nativeplace_DropdownComponent>
              </View>


              <View style={styles.textwrap}>
                <Text style={styles.textheader}>Blood group* </Text>
                <BloodGp_DropdownComponent></BloodGp_DropdownComponent>
              </View>

              <View style={styles.textwrap}>
                <Text style={styles.textheader}>Marital Status* </Text>
                <Marital_DropdownComponent></Marital_DropdownComponent>
              </View>

              {/* {MaritalStatusId == '1' ? <View>
                <View style={styles.textwrap}>
                  <TextInput
                    label="Sakhe Self*"
                    mode='flat'
                    style={styles.textinput}
                    value={SakheSelf}
                    onChangeText={(name) =>
                      setSakheSelf(name)
                    }>
                  </TextInput>
                </View>

                <View style={styles.textwrap}>
                  <TextInput
                    label="Sakhe Mama"
                    mode='flat'
                    style={styles.textinput}
                    value={SakheMama}
                    onChangeText={(name) =>
                      setSakheMama(name)
                    }>
                  </TextInput>
                </View>

                <View style={styles.textwrap}>
                  <TextInput
                    label="Sakhe Papa-Mama"
                    mode='flat'
                    style={styles.textinput}
                    value={SakhePapaMama}
                    onChangeText={(name) =>
                      setSakhePapaMama(name)
                    }>
                  </TextInput>
                </View>

                <View style={styles.textwrap}>
                  <TextInput
                    label="Sakhe Mummy-Mama"
                    mode='flat'
                    style={styles.textinput}
                    value={SakheMummyMama}
                    onChangeText={(name) =>
                      setSakheMummyMama(name)
                    }>
                  </TextInput>
                </View>

              </View> :  */}

              {MaritalStatusId != '1' ? <View>

                <View style={styles.textwrap}>
                  <Text style={styles.textheader}>{"Son(s)* "}</Text>
                  <Son_DropdownComponent></Son_DropdownComponent>
                </View>

                <View style={styles.textwrap}>
                  <Text style={styles.textheader}>{"Daughter(s)*"} </Text>
                  <Daughter_DropdownComponent></Daughter_DropdownComponent>
                </View>
              </View> : <View></View>}


              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>Aadhaar * </Text> */}
                <TextInput
                  label="Qualification *"
                  mode='flat'
                  style={styles.textinput}
                  value={Education}
                  onChangeText={(name) =>
                    setEducation(name)
                  }>
                </TextInput>
              </View>

              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>Aadhaar * </Text> */}
                <TextInput
                  label="Panth *"
                  mode='flat'
                  style={styles.textinput}
                  value={PanthName}
                  onChangeText={(name) =>
                    setPanthName(name)
                  }>
                </TextInput>
              </View>

              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>Whatsapp Number * </Text> */}
                <TextInput
                  label="Primary Mobile Number"
                  mode='flat'
                  style={styles.textinput}
                  value={mobileno}
                  onChangeText={(name) =>
                    setmobileno(name)
                  }>


                </TextInput>
              </View>
              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>Whatsapp Number * </Text> */}
                <TextInput
                  label="Whatsapp Number "
                  mode='flat'
                  style={styles.textinput}
                  value={whatsappno}
                  onChangeText={(name) =>
                    setwhatsappno(name)
                  }>


                </TextInput>
              </View>

              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>Email * </Text> */}
                <TextInput
                  label="Email "
                  mode='flat'
                  style={styles.textinput}
                  value={emailid}
                  onChangeText={(name) =>
                    setemailid(name)
                  }>


                </TextInput>
              </View>




              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>Profile Pic * </Text> */}
                {/* <TextInput
                  label="Profile Pic *"
                  mode='flat'
                  style={styles.textinput}>

                </TextInput> */}

                {/* <Text style={{ marginTop: 10, fontSize: 18, fontWeight: 'bold' }}>Select Profile pic* </Text>

                <View style={{ alignItems: 'center' }}>
                  <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
                    <View
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <ImageBackground
                        source={{
                          uri: image,
                        }}
                        style={{ height: 100, width: 100 }}
                        imageStyle={{ borderRadius: 15 }}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Icon
                            name="camera"
                            size={35}
                            color="#a1a1a1"
                            style={{
                              opacity: 0.7,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderWidth: 1,
                              borderColor: '#a1a1a1',
                              borderRadius: 10,
                            }}
                          />
                        </View>
                      </ImageBackground>
                    </View>
                  </TouchableOpacity>

                </View> */}
              </View>

            </View>



            <View style={styles.sliderContainer}>

              <View style={styles.action}>
                <Text style={styles.headingText}>Residential Address </Text>
              </View>

              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>Flat Num/ Floor </Text> */}
                <TextInput
                  label="Address Line 1*"
                  mode='flat'
                  style={styles.textinput}
                  value={Addressline}
                  onChangeText={(name) =>
                    setAddressline(name)
                  }>

                </TextInput>
              </View>


              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>Area </Text> */}
                <TextInput
                  label="Area*"
                  mode='flat'
                  style={styles.textinput}
                  value={Area}
                  onChangeText={(name) =>
                    setArea(name)
                  }>

                </TextInput>
              </View>

              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>City </Text> */}
                <TextInput
                  label="City*"
                  mode='flat'
                  //value={"Mumbai"}
                  style={styles.textinput}
                  value={City}
                  onChangeText={(name) =>
                    setCity(name)
                  }>

                </TextInput>
              </View>

              <View style={styles.textwrap}>
                <Text style={styles.textheader}>State *</Text>
                <State_DropdownComponent></State_DropdownComponent>
              </View>

              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>Pincode </Text> */}
                <TextInput
                  label="Pincode *"
                  mode='flat'
                  style={styles.textinput}
                  value={Pincode}
                  onChangeText={(name) =>
                    setPincode(name)
                  }>

                </TextInput>
              </View>



            </View>



            <View style={styles.sliderContainer}>

              <View style={styles.action}>
                <Text style={styles.headingText}>Occupation Details </Text>
              </View>

              <View style={styles.textwrap}>
                <Text style={styles.textheader}>Occupation </Text>
                <Occupation_DropdownComponent></Occupation_DropdownComponent>
              </View>


              {
                OccupationID == '1' || OccupationID == '2' || OccupationID == '3' ?
                  <View>
                    <View style={styles.textwrap}>
                      {/* <Text style={styles.textheader}>Name of Company</Text> */}
                      <TextInput
                        label="Name of Company"
                        mode='flat'
                        style={styles.textinput}
                        value={NameofCompany}
                        onChangeText={(name) =>
                          setNameofCompany(name)
                        }>


                      </TextInput>
                    </View>

                    <View style={styles.textwrap}>
                      <Text style={styles.textheader}>Category of Company </Text>
                      <Comp_category_DropdownComponent></Comp_category_DropdownComponent>
                    </View>

                    <View style={styles.textwrap}>
                      <Text style={styles.textheader}>Type of Company </Text>
                      <Comp_type_DropdownComponent></Comp_type_DropdownComponent>
                    </View>




                    <Text style={styles.textheader}>Office Address </Text>


                    <View style={styles.textwrap}>
                      {/* <Text style={styles.textheader}>Flat Num/ Floor </Text> */}
                      <TextInput
                        label="Address Line 1*"
                        mode='flat'
                        style={styles.textinput}
                        value={Off_Address}
                        onChangeText={(name) =>
                          setOff_Address(name)
                        }>

                      </TextInput>
                    </View>


                    <View style={styles.textwrap}>
                      {/* <Text style={styles.textheader}>Area </Text> */}
                      <TextInput
                        label="Area*"
                        mode='flat'
                        style={styles.textinput}
                        value={Off_Area}
                        onChangeText={(name) =>
                          setOff_Area(name)
                        }>

                      </TextInput>
                    </View>

                    <View style={styles.textwrap}>
                      {/* <Text style={styles.textheader}>City </Text> */}
                      <TextInput
                        label="City*"
                        mode='flat'
                        //value={"Mumbai"}
                        style={styles.textinput}
                        value={Off_City}
                        onChangeText={(name) =>
                          setOff_City(name)
                        }>

                      </TextInput>
                    </View>

                    <View style={styles.textwrap}>
                      <Text style={styles.textheader}>State</Text>
                      <Office_State_DropdownComponent></Office_State_DropdownComponent>
                    </View>

                    <View style={styles.textwrap}>
                      {/* <Text style={styles.textheader}>Pincode </Text> */}
                      <TextInput
                        label="Pincode *"
                        mode='flat'
                        style={styles.textinput}
                        value={Off_Pincode}
                        onChangeText={(name) =>
                          setOff_Pincode(name)
                        }>

                      </TextInput>
                    </View>

                    <View style={styles.textwrap}>
                      {/* <Text style={styles.textheader}>Pincode </Text> */}
                      <TextInput
                        label="Office Number"
                        mode='flat'
                        style={styles.textinput}
                        value={Off_Number}
                        onChangeText={(name) =>
                          setOff_Number(name)
                        }>

                      </TextInput>
                    </View>

                    <View style={styles.textwrap}>
                      {/* <Text style={styles.textheader}>Pincode </Text> */}
                      <TextInput
                        label="Website"
                        mode='flat'
                        style={styles.textinput}
                        value={Off_Website}
                        onChangeText={(name) =>
                          setOff_Website(name)
                        }>

                      </TextInput>
                    </View>

                    <View style={styles.textwrap}>
                      {/* <Text style={styles.textheader}>Pincode </Text> */}
                      <TextInput
                        label="Email ID "
                        mode='flat'
                        style={styles.textinput}
                        value={Off_EmailId}
                        onChangeText={(name) =>
                          setOff_EmailId(name)
                        }>

                      </TextInput>
                    </View>
                  </View> : null
              }




            </View>
            <View style={styles.sliderContainer}>

              <View style={styles.action}>
                <Text style={styles.headingText}>Social Links </Text>
              </View>



              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>Sangh Membership Number</Text> */}
                <TextInput
                  label="Facebook Profile Link (Eg: https://www.facebook.com/yourname)"
                  mode='flat'
                  style={styles.textinput}
                  value={FbLink}
                  onChangeText={(name) =>
                    setFbLink(name)
                  }>

                </TextInput>
              </View>



              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>Religion Education </Text> */}
                <TextInput
                  label="Instagram Handle (@yourname)"
                  mode='flat'
                  style={styles.textinput}
                  value={InstaLink}
                  onChangeText={(name) =>
                    setInstaLink(name)
                  }>

                </TextInput>
              </View>

              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>Religion Education </Text> */}
                <TextInput
                  label="Twitter Handle (@yourname)"
                  mode='flat'
                  style={styles.textinput}
                  value={TwitterLink}
                  onChangeText={(name) =>
                    setTwitterLink(name)
                  }>

                </TextInput>
              </View>

              <View style={styles.textwrap}>
                {/* <Text style={styles.textheader}>Religion Education </Text> */}
                <TextInput
                  label="Youtube Channel Link (Eg: https://www.youtube.com/channel/adja..)"
                  mode='flat'
                  style={styles.textinput}
                  value={YoutubeLink}
                  onChangeText={(name) =>
                    setYoutubeLink(name)
                  }>

                </TextInput>
              </View>

            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={setApi_insertmember}>
              {/* onPress={() => { }}> */}
              <Text style={styles.buttonTextStyle}>Save</Text>
            </TouchableOpacity>


            <DatePicker
              modal
              open={open}
              date={date}
              mode={mode}
              is24hourSource="locale"
              maximumDate={new Date()}

              onConfirm={(date) => {
                setOpen(false)
                setDate(date)
                console.log("date=", date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes());
                let fDate1 = (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());

                if (serviceid == '1') {
                  let fDate = (date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
                  setdob_show(fDate);
                  setDob(fDate1)
                } else if (serviceid == '2') {
                  let fDate = (date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
                  set_m_Dob(fDate)
                  setfamily_dob_insert(fDate1)
                }

              }}

              onCancel={() => {
                setOpen(false)
              }}
            />


          </Animated.View>

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

export default AddEditMemberScreen;


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
    marginLeft: 10,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
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
    color: '#333',
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
    height: 40,
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
    width: 15,
    height: 15,
  },
  inputTextStyle: {
    color: 'black'
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#545454'
  },
  containerStyle:{
    color: '#dcdcdc',
    backgroundColor: '#dcdcdc'
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
    fontSize: 14,
    marginTop: 0,
    fontWeight: 700,
    paddingHorizontal: 10,
    fontWeight: 'normal',
    color: '#343a40',
    textAlign: 'left',
    alignSelf: 'flex-start'
  },
  cardtextsmall: {
    paddingTop: 0,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 700,
    fontWeight: 'normal',
    color: '#343a40',
    textAlign: 'left',
    paddingHorizontal: 10,
    flex: 1
  },

  cardtextsmall1: {
    paddingTop: 0,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 700,
    fontWeight: 'normal',
    color: '#343a40',
    textAlign: 'right',
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
