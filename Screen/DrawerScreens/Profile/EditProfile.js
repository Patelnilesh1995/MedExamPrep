import React, { useState, useEffect } from "react";
import { Pressable, Text, View, Image } from "react-native";
import { Button, Icon, Input, useToast, Box } from "native-base";
import { Colors } from "../../../themes/colors";
//import {  Fontisto, MaterialCommunityIcons, MaterialIcons, Feather } from '@expo/vector-icons';
import { Fonts } from "../../../themes/fonts";
//import ImgPicker from "../../Components/ImagePicker";
//import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from 'react-native-date-picker'
import AsyncStorage from '@react-native-community/async-storage';

import ConstantStyle from "../../../themes/styles";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomHeader from "../../Components/CustomHeader";
//import { useTranslation } from "react-i18next";

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDate } from "../../../themes/date";
import { UpdateProfile } from '../../Components/keys'
import callApi_PATCH from "../../ApiConfig/API/api_patch";
import { checkConnectivity } from "../../ApiConfig/checkConnectivity";
import Loader from "../../Components/Loader";


const EditProfile = ({ navigation }) => {
    //const { t, i18n } = useTranslation();
    const [selectedImage, setSelectedImage] = useState();
    const [selected_date, setSelectedDate] = useState("");
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date());

    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [userMobile, setUserMobile] = useState('');
    const [userId, setUserId] = useState('');
    const [dob, setDob] = useState('');


    const toast = useToast();

    const onDateChange = (event, selectedDate) => {
        setShow(false);
        let newDate = new Date(selectedDate);
        newDate = newDate.toISOString().substring(0, 10);
        setDate(newDate);
    }

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    };


    const _retrieveData = async () => {
        const stringifiedData = await AsyncStorage.getItem('userInfo');
        if (stringifiedData) {
            const data = JSON.parse(stringifiedData); // Parse the string back to an object
            console.log('Retrieved data:', data.id);
            setUserName(data.name);
            setUserId(data.id);
            setUserEmail(data.email);
            setUserMobile(data.mobile);
            const formattedDate = formatDate(data.dob, 'DD-MM-yyyy');
            setSelectedDate(formattedDate);
            setDob(data.dob);

        }
    };


    useEffect(() => {
        _retrieveData();
    }, []);


    const checkValidation = async () => {
        const isConnected = await checkConnectivity();

        if (userMobile.length != 10) {
            alert('Please insert valid mobile ');
            return;
        } else if (!isConnected) {
            alert('Please check your network connection!');
            return;
        } else {
            handleSubmitPress();
        }
    }

    const handleSubmitPress = async () => {

        const patchData = { name: userName, mobile: userMobile, id: userId, dob: dob };

        try {
            setLoading(true);
            const responseJson = await callApi_PATCH(UpdateProfile, 'PATCH', patchData);
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
        <SafeAreaView style={[ConstantStyle.container, { flex: 1 }]}>
            <View style={{ backgroundColor: Colors.white, flex: 1, }}>
                <CustomHeader screenName={"edit_Profile"} navigation={navigation} title={"Edit Profile"} />
                {/* <ImgPicker onImageTaken={imageTakenHandler} /> */}

                <Loader loading={loading} />

                <View style={{ alignItems: "center" }}>
                    <Image alt="abc"
                        style={{
                            width: 105,
                            height: 105,
                            borderRadius: 50,
                            marginTop: 20
                        }}
                        source={require("../../../assets/image/user2.jpg")} >
                    </Image>
                    <Text style={{ ...Fonts.Black18Bold, lineHeight: 30 }}>{userName}</Text>
                    <Text style={{ ...Fonts.Grey14Regular, lineHeight: 15 }}>{userEmail}</Text>
                </View>
                <View style={{ marginHorizontal: 15, marginTop: "10%" }}>
                    <Input mb={5} style={{ borderRadius: 10, height: 45 }}
                        InputLeftElement={<Icon as={<MaterialIcons name="person" />} size={5} mx="2" color={Colors.grey} />}
                        placeholder={"Entrt your name"}
                        placeholderTextColor={Colors.grey}
                        keyboardType="default"
                        size="lg"
                        borderWidth={1.5}
                        fontFamily="Roboto-Regular"
                        fontSize={14}
                        selectionColor={Colors.darkgrey}
                        borderRadius={10}
                        value={userName}
                        onChangeText={(userName) =>
                            setUserName(userName)
                        }
                    />
                    <Input mb={5}
                        InputLeftElement={<Icon as={<MaterialCommunityIcons name="email-outline" />} size={5} mx="2" color={Colors.grey} />}
                        placeholder={"Enter your email id"}
                        placeholderTextColor={Colors.grey}
                        keyboardType="email-address"
                        size="lg"
                        borderWidth={1.5}
                        style={{ fontFamily: 'Roboto-Bold', height: 45 }}
                        fontFamily="Roboto-Regular"
                        fontSize={14}
                        selectionColor={Colors.darkgrey}
                        borderRadius={10}
                        value={userEmail}
                        onChangeText={(useremail) =>
                            setUserEmail(useremail)
                        }
                    />
                    <Input mb={5}
                        InputLeftElement={<Icon as={<Fontisto name="mobile-alt" />} size={5} mx="2" color={Colors.grey} />}
                        placeholder={"Enter your mobile no"}
                        placeholderTextColor={Colors.grey}
                        keyboardType="number-pad"
                        maxLength={10}
                        size="lg"
                        borderWidth={1.5}
                        fontFamily="Roboto-Regular"
                        fontSize={14}
                        selectionColor={Colors.darkgrey}
                        borderRadius={10}
                        height={45}
                        value={userMobile}
                        onChangeText={(userMobile) =>
                            setUserMobile(userMobile)
                        }
                    />
                    <Pressable onPress={() => { setShow(true) }} style={{ width: '100%' }}>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            borderRadius: 10, borderColor: '#e0e0e0', borderWidth: 1.5, paddingVertical: 12, paddingHorizontal: 8
                        }}>
                            <Feather name="calendar" size={20} color={Colors.grey} style={{ marginRight: 16 }} />
                            <Text style={{ color: selected_date === "" ? Colors.grey : Colors.black, fontSize: 14, fontFamily: 'Roboto-Regular', alignSelf: 'center' }}>{selected_date === "" ? "Date of birth" : selected_date}</Text>
                        </View>
                    </Pressable>

                    <DatePicker
                        modal
                        open={show}
                        date={date}
                        mode={mode}
                        is24hourSource="locale"
                        maximumDate={new Date()}
                        onConfirm={(date) => {
                            setShow(false)
                            let fDate = (date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
                            let f_insertDate = (date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());

                            setSelectedDate(fDate);
                            setDob(f_insertDate);
                        }}
                        onCancel={() => {
                            setShow(false)
                        }}
                    />
                    {/* {show && <DatePicker value={new Date()} onChange={onDateChange} />} */}

                </View>
                <View style={{ alignItems: "center", marginTop: '10%' }}>
                    <Button style={{ width: 274, height: 45, borderRadius: 10 }}
                        _text={{ ...Fonts.White18Bold }}
                        onPress={() => {
                            // navigation.navigate('ProfileScreen'),
                            //     toast.show({
                            //         render: () => {
                            //             return <Box bg={Colors.white} px="4" py="2" rounded="md" mb={5}>
                            //                 {"Profile updated"}
                            //             </Box>;
                            //         }
                            //     })
                            checkValidation()
                        }}>{"Update Profile"}</Button>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default EditProfile;