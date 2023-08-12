// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
  Button,
  TouchableRipple,
  Switch,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView

} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Axios from 'axios';

const SettingsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 2 }}>
        {/* <TouchableOpacity style={styles.sliderContainer} onPress={() => { }}>
          <View style={{ flexDirection: 'column' }}>

            <View style={{ flexDirection: 'row', padding: 5, }}>
              <Text style={styles.cardtextbold}>{'10% off on Lab Tests at Metrolabs'}</Text>
              <Image
                source={require('../../Image/temp.jpeg')}
                style={{ width: '90%', resizeMode: 'contain', margin: 0, flex: 1, height: 60 }}
              />
            </View>

            <View style={{ flexDirection: 'column', marginTop: 0, paddingBottom: 5 }}>
              <Text style={styles.cardtext1}>{'New Users: Flat 10% off on your first Lab Test Booking'} </Text>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 5, paddingBottom: 5, justifyContent: 'space-between' }}>

              <Text style={styles.cardtextunderline}>{'Other similar Offers'}</Text>

              <TouchableOpacity style={{ padding: 10, backgroundColor: '#8EB55A', marginRight: 10 }} onPress={() => { }}>
                <Text style={{ textAlign: 'center', fontSize: 15, color: '#ffffff', fontWeight: "bold", }}>AVAIL OFFERS </Text>
              </TouchableOpacity>

            </View>

            <View style={{ height: 2, backgroundColor: 'darkgrey', margin: 10, width: 50 }}></View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>

              <Text style={{ textAlign: 'center', fontSize: 15, color: '#0088CC', fontWeight: "bold" }}>Show Details</Text>

              <View style={{ flexDirection: 'row', }}>
                <MaterialIcons name="verified" size={20} color="#4F7942" style={{ marginTop: 0 }} />
                <Text style={{ textAlign: 'center', fontSize: 15, color: '4F7942', fontWeight: '500', }}>Verified</Text>
              </View>

            </View>
          </View>
        </TouchableOpacity> */}

      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8'
  },



  categoryIcon1: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: 110,
    backgroundColor: '#a1a1' /* '#FF6347' */,
    //borderRadius: 50,
  },

  cardsWrapper: {
    marginTop: 20,
    width: '98%',
    alignSelf: 'center',
  },

  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },


  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },


  sliderContainer: {
    width: '98%',
    marginTop: 10,
    marginBottom: 5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderLeftColor: '#8EB55A',
    borderLeftWidth: 5,
    borderColor: '#8EB55A',
    borderWidth: 0.5,
    shadowColor: "#000",
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { x: -2, y: 2 },
  },


  cardtextbold: {
    paddingTop: 5,
    fontSize: 20,
    marginTop: 0,
    fontWeight: 700,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    alignSelf: 'flex-start',
    flex: 2.5
  },

  cardtext1: {
    paddingTop: 5,
    fontSize: 16,
    marginTop: 0,
    fontWeight: 700,
    paddingHorizontal: 10,
    fontWeight: 'normal',
    color: '#333',
    textAlign: 'left',
    alignSelf: 'flex-start'
  },

  cardtextsmall: {
    paddingTop: 0,
    fontSize: 12,
    marginTop: 5,
    fontWeight: 700,
    paddingHorizontal: 10,
    fontWeight: 'normal',
    color: '#333',
    textAlign: 'left',
    alignSelf: 'flex-start'
  },

  cardtextunderline: {
    paddingTop: 5,
    fontSize: 14,
    marginTop: 0,
    fontWeight: 700,
    paddingHorizontal: 10,
    fontWeight: 'normal',
    color: '#0088CC',
    textAlign: 'left',
    alignSelf: 'flex-start',
    textDecorationLine: 'underline'
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
