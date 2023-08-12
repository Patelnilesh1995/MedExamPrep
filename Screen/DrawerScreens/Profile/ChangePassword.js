import React, { useState, useEffect } from "react";
import { View, SafeAreaView,Image,Text ,ScrollView, KeyboardAvoidingView} from "react-native";
import { Input, Icon, Button, useToast, Box, } from "native-base";
import { Colors } from "../../../themes/colors";
import ConstantStyle from "../../../themes/styles";
import CustomHeader from "../../Components/CustomHeader";
import { Fonts } from "../../../themes/fonts";

//import { useTranslation } from "react-i18next";
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { UpdatePassword, UpdateProfile } from '../../Components/keys'
import callApi_PATCH from "../../ApiConfig/API/api_patch";
import { checkConnectivity } from "../../ApiConfig/checkConnectivity";
import Loader from "../../Components/Loader";
import AsyncStorage from '@react-native-community/async-storage';


const ChangePassword = ({ navigation }) => {
    //const { t, i18n } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userOldPassword, setuserOldPassword] = useState('');


    

    const toast = useToast();
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
    });

    
    const _retrieveData = async () => {
        const stringifiedData = await AsyncStorage.getItem('userInfo');
        if (stringifiedData) {
            const data = JSON.parse(stringifiedData); // Parse the string back to an object
            console.log('Retrieved data:', data.id);
            setUserId(data.id);

        }
    };


    useEffect(() => {
        _retrieveData();
    }, []);


    const checkValidation = async () => {
        const isConnected = await checkConnectivity();

         if (!userPassword) {
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
          } else if (!isConnected) {
            alert('Please check your network connection!');
            return;
        } else {
            handleSubmitPress();
        }
    }

    const handleSubmitPress = async () => {

        const patchData = { old_password: userOldPassword, new_password: userPassword, id: userId, confirm_password: confirmPassword };

        console.log(patchData)

        try {
            setLoading(true);
            const responseJson = await callApi_PATCH(UpdatePassword, 'PATCH', patchData);
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


    const handleClick = (fieldName) => {
        setValues({ ...values, showPassword: fieldName === values.showPassword ? "" : fieldName });
    }
    return (
        <SafeAreaView style={[ConstantStyle.container, { backgroundColor: Colors.primary }]}>
        <View style={{ backgroundColor: Colors.white, flex: 1 }}>
        <Loader loading={loading} />
            <CustomHeader screenName={"change_password_Text"} navigation={navigation} title={'Change Password'} />
            <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView enabled>

           
            <View style={{ alignItems: "center", marginTop: "15%" }}>
                <Image
                    source={require('../../../Image/medexam.png')}
                    style={{
                        width: 180,
                        height: 180,
                        resizeMode: 'contain',
                        margin: 0,
                    }}
                />
                <Text style={{ ...Fonts.Grey14Regular, marginBottom: 20, marginTop: 15 }}>Change Your Password</Text>
            </View>
            <View style={{ marginHorizontal: 15, marginTop: "5%" }}>
                <Input mb={5} style={{ borderRadius: 10, }}
                    InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color={Colors.grey} />}
                    InputRightElement={<Icon as={<Ionicons name={values.showPassword === "currentPassword" ? "eye" : "eye-off"} />} size={5} mx={3} color={Colors.grey} onPress={() => handleClick("currentPassword")} />}
                    type={values.showPassword === "currentPassword" ? "text" : "password"}
                    placeholder={"Current Password"}
                    placeholderTextColor={Colors.grey}
                    keyboardType="default"
                    size="lg"
                    borderWidth={1.5}
                    fontFamily="Roboto-Regular"
                    fontSize={14}
                    selectionColor={Colors.darkgrey}
                    borderRadius={10}
                    height={45}
                    onChangeText={(oldPassword) =>
                        setuserOldPassword(oldPassword)
                    }
                />
                <Input mb={5} style={{ borderRadius: 10 }}
                    InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color={Colors.grey} />}
                    InputRightElement={<Icon as={<Ionicons name={values.showPassword === "newPassword" ? "eye" : "eye-off"} />} size={5} mx={3} color={Colors.grey} onPress={() => handleClick("newPassword")} />}
                    type={values.showPassword === "newPassword" ? "text" : "password"}
                    placeholder={"new Password"}
                    placeholderTextColor={Colors.grey}
                    keyboardType="default"
                    size="lg"
                    borderWidth={1.5}
                    fontFamily="Roboto-Regular"
                    fontSize={14}
                    selectionColor={Colors.darkgrey}
                    borderRadius={10}
                    height={45}
                    onChangeText={(newpassword) =>
                        setUserPassword(newpassword)
                    }
                />
                <Input mb={5}
                    InputLeftElement={<Icon as={<MaterialIcons name="lock" />} size={5} ml="2" color={Colors.grey} />}
                    InputRightElement={<Icon as={<Ionicons name={values.showPassword === "confirmPassword" ? "eye" : "eye-off"} />} size={5} mx={3} color={Colors.grey} onPress={() => handleClick("confirmPassword")} />}
                    type={values.showPassword === "confirmPassword" ? "text" : "password"}
                    placeholder={"Confirm Password"}
                    placeholderTextColor={Colors.grey}
                    keyboardType="default"
                    size="lg"
                    borderWidth={1.5}
                    fontFamily="Roboto-Regular"
                    fontSize={14}
                    selectionColor={Colors.darkgrey}
                    borderRadius={10}
                    height={45}
                    onChangeText={(confirmPass) =>
                        setConfirmPassword(confirmPass)
                    }
                />
                <View style={{ alignItems: "center", marginTop: '10%' }}>
                    <Button style={{ width: 274, height: 45, borderRadius: 10 }}
                        _text={{ ...Fonts.White18Bold }}
                        onPress={() => {
                            // navigation.navigate('Profile'),
                            //     toast.show({
                            //         render: () => {
                            //             return <Box bg={Colors.black} px="4" py="2" rounded="md" mb={5}>
                            //                 {"Save Password"}
                            //             </Box>;
                            //         }
                            //     })
                            checkValidation()
                        }}>{"Save Password"}</Button>
                </View>
            </View>
            </KeyboardAvoidingView>
            </ScrollView>
            </View>

        </SafeAreaView>
    );
};

export default ChangePassword;
