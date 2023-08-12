import React, { useEffect, useRef, useState } from "react";
import {
    TouchableOpacity, SafeAreaView, Text, View,
    Share, I18nManager, Dimensions, BackHandler, Image, StyleSheet, Button, FlatList,Platform
} from "react-native";
import { IconButton, Icon, ScrollView } from "native-base";
import { Fonts } from "../../../themes/fonts";
import ConstantStyle from "../../../themes/styles";
import { Colors } from "../../../themes/colors";
import icons from "../../../themes/icons";
import CustomHeader from "../../Components/CustomHeader";
import { fonts } from "react-native-elements/dist/config";
import { Course, Courses } from "../../Components/keys";
import { checkConnectivity } from "../../ApiConfig/checkConnectivity";
import callApi from '../../ApiConfig/API/api_new';
import { useToast, Box } from "native-base";
import Loader from '../../Components/Loader';
import { useRoute } from '@react-navigation/native';
import HTMLRender from 'react-native-render-html';
import { formatDate } from "../../../themes/date";

import { useIsFocused } from '@react-navigation/native';


const YourCourseDetails = ({ navigation }) => {
    // const { t, i18n } = useTranslation();
    const isFocused = useIsFocused();
    const [iconName, setIconName] = useState("hearto");
    const [inFullscreen, setInFullScreen] = useState(false);
    const refVideo = useRef(null);
    const scrHeight = Dimensions.get('screen').height;
    const scrWidth = Dimensions.get('screen').width;
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [subjectList, setSubjectList] = useState([]);
    const route = useRoute();
    //const { id, title } = route.params;
    const { item } = route.params;
    const [courseDetail, setcourseDetail] = useState(item.packages || []);

    const formattedDate = formatDate(item.date, 'MMM DD YYYY');


    const [selectedTab, setSelectedTab] = useState(1); // Initialize with the selected tab index

    const handleTabPress = (tabIndex) => {
        setSelectedTab(tabIndex);
    };

    const _retrieveData = async () => {

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
            handleData(item.slug);
        }
    }

    const handleData = async () => {
        try {
            setLoading(true); // Set loading to true before making the API call

            const responseJson = await callApi(
                Course+'/'+item.slug,
                'GET',
                { }
            );

            if (responseJson.success === "true") {

                //const bannerData = responseJson.data.subject;
                setSubjectList(responseJson.data.subject)
                //console.log('Data===============', bannerData);

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

    const courses = [
        { id: '1', name: 'COURSE 1 IS TEST COURSE', description: 'Description 1', price: '$19', tests: 5, duration: '1 month' },
        { id: '2', name: 'Course 2', description: 'Description 2', price: '$29', tests: 7, duration: '2 months' },
        { id: '3', name: 'Course 2', description: 'Description 2', price: '$29', tests: 7, duration: '2 months' },
        { id: '4', name: 'Course 2', description: 'Description 2', price: '$29', tests: 7, duration: '2 months' },
        { id: '5', name: 'Course 2', description: 'Description 2', price: '$29', tests: 7, duration: '2 months' },
        { id: '6', name: 'Course 2', description: 'Description 2', price: '$29', tests: 7, duration: '2 months' },

        // Add more courses here
    ];

    const renderCourseItem = ({ item }) => (
        <TouchableOpacity style={styles.courseItem}>
            <Text style={{ ...Fonts.Black14Bold }}>{item.title}</Text>
        </TouchableOpacity>
    );


    const renderPackageItem = ({ item }) => (
        <View style={styles.packageItem}>
            <View style={{ padding: 10, alignItems: 'center' }}>
                <Text style={{ ...Fonts.White16Bold, color: '#5aab61' }}>{item.title}</Text>
                <Text style={{ ...Fonts.White14Medium, color: '#5aab61', paddingTop: 5 }}>{item.subject_name}</Text>
                <Text style={{ ...Fonts.Black16Bold, paddingTop: 5 }}> {item.payment_type + '.' + item.price}</Text>
                <Text style={{ ...Fonts.White14Medium, color: '#25523b', marginTop: 15 }}>{item.mocks+' Mocks '+item.question_per_mocks+' per test Questions'}</Text>
                <Text style={{ ...Fonts.White14Medium, color: '#25523b', paddingTop: 5, paddingBottom: 5 }}>{item.tests+' Tests '+item.question_per_test+' per test'}</Text>

                
            </View>
            <TouchableOpacity style={{ backgroundColor: Colors.primary, flex: 1, height: 40, justifyContent: 'center' }} onPress={() =>  {navigation.navigate('CourseBuyNow',{item})}} >
                <Text style={{ ...Fonts.White16Bold, alignSelf: 'center', }}>Buy Now</Text>
            </TouchableOpacity>
        </View>
    );


    const handleBuyNow = (course) => {
        // Implement your buy now logic here
        console.log(`Buying ${course.name}`);

        navigation.navigation('CourseBuyNow')
    };


    return (
        <SafeAreaView style={[ConstantStyle.container, { backgroundColor: Colors.primary }]}>
            <Loader loading={loading} />

            <View style={{ backgroundColor: Colors.white, flex: 1 }}>

                <CustomHeader screenName={"CourseDetail"} navigation={navigation} title={item.title} />
                <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="stretch"
                />

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,

                        ]}
                        onPress={() => handleTabPress(1)}
                    >
                        <Text style={[, styles.tabButtonText, selectedTab === 1 && styles.selectedTabButton,]}>About Course</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tabButton,

                        ]}
                        onPress={() => handleTabPress(2)}
                    >
                        <Text style={[styles.tabButtonText, selectedTab === 2 && styles.selectedTabButton,]}>Subject</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.tabButton,

                        ]}
                        onPress={() => handleTabPress(3)}
                    >
                        <Text style={[styles.tabButtonText, selectedTab === 3 && styles.selectedTabButton,]}>Package</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>

                    {selectedTab === 1 && (
                        // <WebView source={{ uri: 'https://your-course-url.com' }} />
                        <View style={{ margin: 10, }}>
                            <ScrollView style={{ paddingBottom: 50 }}   showsVerticalScrollIndicator={false}
>
                                <Text style={{ ...Fonts.Primary16Bold, lineHeight: 22, marginBottom: 10, marginTop: 10 }}>{item.title}</Text>
                                <Text style={{ ...Fonts.White14Medium, lineHeight: 22, marginBottom: 10, color: '#5aab61' }}>{'Start from: ' + formattedDate}</Text>
                                <HTMLRender
                                    source={{ html: item.description }}
                                    contentContainerStyle={{ padding: 10, }}
                                />
                            </ScrollView>
                        </View>

                    )}
                    {selectedTab === 2 && (
                        <View style={{ margin: 15,marginBottom:25 }}>
                            <Text style={{ ...Fonts.Primary16Bold, lineHeight: 22, marginBottom: 10 }}>{'Course Subjects'}</Text>
                            <FlatList
                                data={subjectList}
                                keyExtractor={(item) => item.id}
                                showsVerticalScrollIndicator={false}
                                renderItem={renderCourseItem}
                                numColumns={2}
                            />
                        </View>
                    )}
                    {selectedTab === 3 && (
                        <View style={{ margin: 10 }}>
                            <Text style={{ ...Fonts.Primary16Bold, lineHeight: 22, marginBottom: 10 }}>{'Course Packages'}</Text>

                            <FlatList
                                data={courseDetail}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item) => item.id}
                                renderItem={renderPackageItem}
                            />
                        </View>
                    )}
                </View>


            </View>

        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: 200,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 0,
        backgroundColor: Colors.primary
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderColor: 'black', // Border color for unselected tabs
    },
    selectedTabButton: {
        //borderColor: 'white',
        color: Colors.white,
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        textDecorationLine: Platform.OS === 'ios' ? 'underline' : 'none',
        //textDecorationLine: 'underline', // Add underline
        textDecorationStyle: 'solid',   // Use 'solid' for a normal underline style
        textDecorationColor: 'white',    // Set the color of the underline

    },
    tabButtonText: {
        color: 'black', // Text color for unselected tabs
        fontSize: 16,
        fontFamily: 'Roboto-Bold',
    },
    courseItem: {
        flex: 1,
        margin: 10,
        padding: 5,
        borderRadius: 10,
        backgroundColor: Colors.btnBack,
        justifyContent: 'center',
        alignItems: 'center',
    },
    packageItem: {
        marginBottom: 30,
        marginLeft: 15,
        marginRight: 15,
        borderWidth: 1,
        borderColor: Colors.btnBack,
        //borderRadius: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: Colors.btnBack
    },

});

export default YourCourseDetails;