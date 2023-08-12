import React, { useEffect, useRef, useState } from "react";
import {
    TouchableOpacity, SafeAreaView, Text, View,
    Share, I18nManager, Dimensions, BackHandler, Image, StyleSheet, FlatList, Platform, TextInput
} from "react-native";
import { Button, Icon, Input, useToast, Box, ScrollView } from "native-base";

import { Fonts } from "../../../themes/fonts";
import ConstantStyle from "../../../themes/styles";
import { Colors } from "../../../themes/colors";
import icons from "../../../themes/icons";
import CustomHeader from "../../Components/CustomHeader";
import { fonts } from "react-native-elements/dist/config";
import { ApplyCoupon, BuyNow, Course, Courses } from "../../Components/keys";
import { checkConnectivity } from "../../ApiConfig/checkConnectivity";
import callApi from '../../ApiConfig/API/api_new';
import Loader from '../../Components/Loader';
import { useRoute } from '@react-navigation/native';
import HTMLRender from 'react-native-render-html';
import { formatDate } from "../../../themes/date";
import { useIsFocused } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import RazorpayCheckout from 'react-native-razorpay';




const CourseBuyNow = ({ navigation }) => {
    // const { t, i18n } = useTranslation();
    const isFocused = useIsFocused();
    const [inFullscreen, setInFullScreen] = useState(false);
    const refVideo = useRef(null);
    const scrHeight = Dimensions.get('screen').height;
    const scrWidth = Dimensions.get('screen').width;
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [razorPayId, setrazorPayId] = useState('');
    const [couponCode, setCouponCode] = useState('');
    const [couponId, setCouponId] = useState('');
    const [userId, setUserId] = useState('');
    const [totalAmt, setTotalAmt] = useState('');
    const [price, setPrice] = useState('');
    const [packageId, setpackageId] = useState('');


    const [couponDiscount, setCouponDiscount] = useState('0');
    const [userEmail, setuserEmail] = useState('');
    const [userContact, setuserContact] = useState('');
    const [userName, setuserName] = useState('');


    const route = useRoute();
    const { item } = route.params;
    //const { id, title } = route.params;
    //console.log("course===", item);


    const [selectedTab, setSelectedTab] = useState(1); // Initialize with the selected tab index

    const handleTabPress = (tabIndex) => {
        setSelectedTab(tabIndex);
    };

    const _retrieveData = async () => {

        const stringifiedData = await AsyncStorage.getItem('userInfo');
        if (stringifiedData) {
            const data = JSON.parse(stringifiedData); // Parse the string back to an object
            console.log('Retrieved data:', data.id);
            setUserId(data.id);
            setuserEmail(data.email);
            setuserContact(data.mobile);
            setuserName(data.name);
        }
        totalPayment(0);
        setPrice(item.price);
        setpackageId(item.id);
    };


    useEffect(() => {
        _retrieveData();
    }, []);

    const checkValidation = async () => {
        const isConnected = await checkConnectivity();
        if (!isConnected) {
            alert('Please check your network connection!');
            return;
        } else if (!couponCode) {
            alert('Please insert coupon code!');
            return;
        }
        else {
            handleData();
        }
    }

    const handleData = async () => {
        try {
            setLoading(true); // Set loading to true before making the API call

            const responseJson = await callApi(
                ApplyCoupon,
                'GET',
                { coupon_code: couponCode, user_id: userId }
            );

            if (responseJson.success === "true") {

                setCouponId(responseJson.coupon_id)
                setCouponDiscount(responseJson.amount)
                totalPayment(responseJson.amount)
                //const bannerData = responseJson;
                //setSubjectList(responseJson.data.subject)
                //console.log('Data===============', bannerData);

                toast.show({
                    render: () => {
                        return <Box bg={Colors.white} px="4" py="2" rounded="md" mb={5}>
                            {responseJson.message}
                        </Box>;
                    }
                })

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

    const ApiBuyNow = async (razorPayId) => {
        try {
            setLoading(true); // Set loading to true before making the API call

            const responseJson = await callApi(
                BuyNow,
                'GET',
                { coupon_id: couponId, user_id: userId, razorpay_payment_id:razorPayId,package_id:packageId,grand_total:totalAmt,total:price,discount:couponDiscount }
            );

            if (responseJson.success === "true") {

               
                //const bannerData = responseJson;
                //setSubjectList(responseJson.data.subject)
                //console.log('Data===============', bannerData);

                toast.show({
                    render: () => {
                        return <Box bg={Colors.white} px="4" py="2" rounded="md" mb={5}>
                            {'Package purchased successfully...'}
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
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Set loading to false after the API call is complete
        }
    };



    const totalPayment = (discount)=>{
        const totalAmt = item.price;
        
        const TotalPayableAmt = totalAmt - discount;
        setTotalAmt(TotalPayableAmt);
    }

    const OpenRazorPay =() =>{
        var options = {
            description: item.title,
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_xbqXvL1o7LYcvw', // Your api key
            amount: totalAmt+'00',
            name: 'MedExamPrep',
            prefill: {
              email: userEmail,
              contact: userContact,
              name: userName
            },
            theme: {color: Colors.primary}
          }
          RazorpayCheckout.open(options).then((data) => {
            // handle success
            //alert(`Success: ${data.razorpay_payment_id}`);
           
            toast.show({
                render: () => {
                    return <Box bg={Colors.white} px="4" py="2" rounded="md" mb={5}>
                        {'Payment Successfully done!'}
                    </Box>;
                }
            })

            ApiBuyNow(data.razorpay_payment_id);
          }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
    }


    return (
        <SafeAreaView style={[ConstantStyle.container, { backgroundColor: Colors.primary }]}>
            <Loader loading={loading} />
            <View style={{ backgroundColor: Colors.white, flex: 1 }}>

                <CustomHeader screenName={"CourseBuyNow"} navigation={navigation} title={item.title} />
                <ScrollView>


                    <View style={styles.packageItem}>
                        <View style={{ padding: 10, alignItems: 'center' }}>
                            <Text style={{ ...Fonts.Black14Regular, marginTop: 10, }}>{'Payment Detail'}</Text>

                            <Text style={{ ...Fonts.White18Bold, color: '#5aab61', marginTop: 15 }}>{item.title}</Text>
                            <Text style={{ ...Fonts.Black12Bold, marginTop: 15 }}>{`Available For ` + item.week + ` week's`}</Text>

                        </View>

                        <View style={{ padding: 20 }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                                <Feather
                                    name="check-circle"
                                    size={24}
                                    color={"#5aab61"}
                                    style={{
                                        top: 5, right: 7, zIndex: 1, // Ensure the icon is above other content
                                    }}
                                />
                                <Text style={{ ...Fonts.Black12Bold, paddingTop: 10 }}>{"Subjects :"}</Text>
                                <Text style={{ ...Fonts.Black12Regular, paddingTop: 10 }}>{item.subject_name}</Text>
                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                                <Feather
                                    name="check-circle"
                                    size={24}
                                    color={"#5aab61"}
                                    style={{
                                        top: 5, right: 7, zIndex: 1, // Ensure the icon is above other content
                                    }}
                                />
                                <Text style={{ ...Fonts.Black12Bold, paddingTop: 10 }}>{`Total Mock's :`}</Text>
                                <Text style={{ ...Fonts.Black12Regular, paddingTop: 10 }}>{item.mocks + `(Includes ` + item.question_per_mocks + ` Questions per Mock)`}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                                <Feather
                                    name="check-circle"
                                    size={24}
                                    color={"#5aab61"}
                                    style={{
                                        top: 5, right: 7, zIndex: 1, // Ensure the icon is above other content
                                    }}
                                />

                                <Text style={{ ...Fonts.Black12Bold, paddingTop: 10, }}>{"Total Test :"}</Text>
                                <Text style={{ ...Fonts.Black12Regular, paddingTop: 10 }}>{item.tests + `(Includes ` + item.question_per_test + ` Questions per Test)`}</Text>

                            </View>
                        </View>

                        <View style={styles.line} />

                        <Text style={{ ...Fonts.Black12Bold, marginTop: 15, alignSelf: 'center' }}>{`Apply Coupon`}</Text>


                        <View style={styles.containerButton}>
                            <View style={styles.inputContainer}>
                                <AntDesign name="tag" size={20} color="grey" style={styles.icon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Coupon Code"
                                    onChangeText={(couponcode) => setCouponCode(couponcode)}
                                    placeholderTextColor="#8b9cb5"
                                    keyboardType="default"
                                />
                            </View>
                            <TouchableOpacity style={styles.button} onPress={() => { checkValidation() }}>
                                <Text style={styles.buttonTextApply}>Apply</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', paddingRight: 20 }}>

                            <Text style={{ ...Fonts.Black14Bold, }}>{"Price :"}</Text>
                            <Text style={{ ...Fonts.Black14Regular, }}>{item.payment_type + item.price}</Text>
                        </View>

                        
                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', paddingRight: 20, paddingTop: 10,paddingBottom:0 }}>

                            <Text style={{ ...Fonts.Black14Bold, }}>{"Discount :"}</Text>
                            <Text style={{ ...Fonts.Black14Regular, }}>{item.payment_type+couponDiscount}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', padding: 20, paddingTop: 10 }}>

                            <Text style={{ ...Fonts.Black14Bold, }}>{"Total :"}</Text>
                            <Text style={{ ...Fonts.Black14Regular, }}>{item.payment_type+totalAmt}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={OpenRazorPay}
                    >
                        <Text style={[styles.buttonTextStyle, { ...Fonts.White18Bold }]}>Procced</Text>

                    </TouchableOpacity>

                </ScrollView>

            </View >

        </SafeAreaView >
    );
};

export default CourseBuyNow;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 200,
    },
    packageItem: {
        backgroundColor: Colors.lightGray,
        marginVertical: 8,
        borderRadius: 10,
        //alignItems: "center",
        marginHorizontal: 15,
        ...ConstantStyle.shadow
    },

    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: Colors.primary,
        padding: 5,
        flex: 1, // Equal distribution of buttons
    },

    line: {
        height: 1, // Adjust the height of the line as needed
        backgroundColor: Colors.darkgrey, // Change the color of the line
        margin: 10, // Add vertical margin to the line
    },


    containerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '70%',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderColor: Colors.primary,
        borderWidth: 1,
        paddingRight: 1,
        paddingLeft: 10
    },
    icon: {
        marginRight: 5,
    },
    input: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        //borderWidth: 1,
        borderRadius: 10, // Adjust the padding to make room for the eye icon
        //borderColor: '#dadae8',
        width: '90%',
        height: 40
    },
    button: {
        width: '30%',
        backgroundColor: Colors.primary,
        padding: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginLeft: 0,
        height: 42
    },
    buttonTextApply: {
        color: 'white',
        textAlign: 'center',
        ...Fonts.White16Regular
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
        justifyContent: 'center',

    },
    buttonTextStyle: {
        color: '#FFFFFF',
        textAlign: 'center',
    },

});

