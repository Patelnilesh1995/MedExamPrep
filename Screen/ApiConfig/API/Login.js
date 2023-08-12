import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LOGIN } from './Models';
import * as APIController from './APIController';

const doLogin = async () => {
    if (await CheckConnectivity()) {
        let data = new LOGIN();
        data.username = 'a15034212039@gmail.com'
        data.Password = 'Nilesh@123'
        const apiResponse = await APIController.doLogin(data);
        if (apiResponse.object != null) {
            if (apiResponse.object.status == 0) {
                //Toast Error Message
            }
            else {
                //Success 
            }
        }
    }
    else{
        //Connect Internet Message Or Alert
    }
}

export default function Login() {
    return (
        <View>
            <Text>Login</Text>
        </View>
    )
}

const styles = StyleSheet.create({})