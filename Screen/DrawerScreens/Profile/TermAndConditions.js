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
import { Course, Courses, TAndC, Transactions } from "../../Components/keys";
import { checkConnectivity } from "../../ApiConfig/checkConnectivity";
import callApi from '../../ApiConfig/API/api_new';
import { useToast, Box } from "native-base";
import Loader from '../../Components/Loader';
import { useRoute } from '@react-navigation/native';
import HTMLRender from 'react-native-render-html';




const TermAndConditions = ({ navigation }) => {
    // const { t, i18n } = useTranslation();

    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const [t_And_c, setT_And_c] = useState('');
    const route = useRoute();


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
            handleData();
        }
    }

    const handleData = async () => {
        try {
            setLoading(true); // Set loading to true before making the API call

            const responseJson = await callApi(
                TAndC,
                'GET',
                {}
            );

            if (responseJson.success === "true") {

                //const bannerData = responseJson;
                setT_And_c(responseJson.data.content)
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







    return (
        <SafeAreaView style={[ConstantStyle.container, { backgroundColor: Colors.primary }]}>
            <Loader loading={loading} />
            <View style={{ backgroundColor: Colors.white, flex: 1 }}>

                <CustomHeader screenName={"TermAndConditions"} navigation={navigation} title={'Term And Conditions'} />
                <View style={{ flex: 1 }}>

                    <ScrollView style={{ padding: 10 }} showsVerticalScrollIndicator={false}>
                        <HTMLRender
                            source={{ html: t_And_c }}
                        />
                    </ScrollView>

                </View>


            </View>

        </SafeAreaView>
    );
};

export default TermAndConditions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

