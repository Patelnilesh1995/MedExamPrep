import React, { useEffect, useRef, useState } from "react";
import {
    TouchableOpacity, SafeAreaView, Text, View,
    Share, I18nManager, Dimensions, BackHandler, Image, StyleSheet, Button, FlatList, Platform
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';



const MyPacakges = ({ navigation }) => {
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




    const [selectedTab, setSelectedTab] = useState(1); // Initialize with the selected tab index

    const handleTabPress = (tabIndex) => {
        setSelectedTab(tabIndex);
    };

    const _retrieveData = async () => {

        //checkValidation();
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
                Course + '/' + item.slug,
                'GET',
                {}
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

    const packages = [
        { id: '1', name: 'COURSE 1 IS TEST COURSE', description: 'Description 1', price: '$19', tests: 5, duration: '1 month' },
        { id: '2', name: 'Course 2', description: 'Description 2', price: '$29', tests: 7, duration: '2 months' },
        { id: '3', name: 'Course 2', description: 'Description 2', price: '$29', tests: 7, duration: '2 months' },
        { id: '4', name: 'Course 2', description: 'Description 2', price: '$29', tests: 7, duration: '2 months' },
        { id: '5', name: 'Course 2', description: 'Description 2', price: '$29', tests: 7, duration: '2 months' },
        { id: '6', name: 'Course 2', description: 'Description 2', price: '$29', tests: 7, duration: '2 months' },

        // Add more courses here
    ];



    const renderPackageItem = ({ item }) => (
        <View style={styles.packageItem}>
            <View style={{ padding: 10, }}>
                <Text style={{ ...Fonts.White18Bold, color: '#5aab61' }}>{item.name}</Text>
                <View style={{ flexDirection: 'row',alignItems: 'center', margin:5 }}>
                    <Feather
                        name="check-circle"
                        size={24}
                        color={"#5aab61"}
                        style={{
                            top: 5, right: 7, zIndex: 1, // Ensure the icon is above other content
                        }}
                    />
                    <Text style={{ ...Fonts.Black12Bold, paddingTop: 10 }}>{"Exams "}</Text>
                    <Text style={{ ...Fonts.Black12Regular, paddingTop: 10 }}>{"3 available "}</Text>
                </View>

                <View style={{ flexDirection: 'row',alignItems: 'center',margin:5}}>
                    <Feather
                        name="check-circle"
                        size={24}
                        color={"#5aab61"}
                        style={{
                            top: 5, right: 7, zIndex: 1, // Ensure the icon is above other content
                        }}
                    />
                   
                    <Text style={{ ...Fonts.Black12Bold, paddingTop: 10,  }}>{"Mock Test "}</Text>
                    <Text style={{ ...Fonts.Black12Regular, paddingTop: 10 }}>{"3 available "}</Text>
                   
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                        flex: 1, // Ensure equal distribution of the three buttons
                    }}
                >
                    {/* First TouchableOpacity */}
                    <TouchableOpacity style={[styles.buttonContainer,{marginRight:10}]}>
                        <Ionicons name="document" size={24} color={Colors.white} />
                        <Text style={styles.buttonText}>Documents</Text>
                    </TouchableOpacity>

                    {/* Second TouchableOpacity */}
                    <TouchableOpacity style={[styles.buttonContainer, {marginRight:10}]}>
                        <Ionicons name="videocam-sharp" size={24} color={Colors.white} />
                        <Text style={styles.buttonText}>Videos</Text>
                    </TouchableOpacity>

                    {/* Third TouchableOpacity */}
                    <TouchableOpacity style={styles.buttonContainer} onPress={()=>{navigation.navigate("MockTestScreen")}}>
                        <Ionicons name="document" size={24} color={Colors.white} />
                        <Text style={styles.buttonText}>Exam</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );


    const handleBuyNow = (course) => {
        // Implement your buy now logic here
        console.log(`Buying ${course.name}`);
    };


    return (
        <SafeAreaView style={[ConstantStyle.container, { backgroundColor: Colors.primary }]}>
            <Loader loading={loading} />
            <View style={{ backgroundColor: Colors.white, flex: 1 }}>

                <CustomHeader screenName={"MyPacakges"} navigation={navigation} title={'My Pacakges'} />
                <View style={{ flex: 1 }}>


                    <FlatList
                        data={packages}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={renderPackageItem}
                    />


                </View>


            </View>

        </SafeAreaView>
    );
};

export default MyPacakges;

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
    buttonText: {
        marginLeft: 5,
        ...Fonts.White14Regular,
        lineHeight: 25,
        textAlign: 'left',
        paddingRight: 5,
    },

});

