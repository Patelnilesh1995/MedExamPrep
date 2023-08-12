import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const MyTextInput = ({ label, value, onChangeText, }) => {
    return (
        <View style={[styles.textInputContainer]}>
            <TextInput
                label={label}
                mode='flat'
                style={[styles.textinput]}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    textInputContainer: {
        padding: 10,
        marginBottom: 0,
    },
    textinput: {
        //fontFamily: themes.font.medium,
        borderBottomColor: "#e5e5e5",
        borderBottomWidth: 1,
        height: 55,
        textTransform: "capitalize",
        color: '#545454',
        backgroundColor: '#ffffff',
    },
});

export default MyTextInput;