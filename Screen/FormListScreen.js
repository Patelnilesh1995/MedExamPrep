// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  FlatList,
} from 'react-native';



import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import Loader from './Components/Loader';
import { GeneralFormListApi } from './Components/keys';
import LinearGradient from 'react-native-linear-gradient';


const FormListScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState('');
  const [FormList, setFormList] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    (async () => {
      _retrieveData();
    })();
  }, []);

  const _retrieveData = async () => {
    setLoading(true);
    const APIurl = GeneralFormListApi;
    await Api_Login(APIurl)
    //navigation.replace('DrawerNavigationRoutes');
    console.log("Loginapi=", APIurl);
  }

  async function Api_Login(APIurl) {
    Axios.get(APIurl)
      .then(function (response) {
        //console.log(response.data)
        setLoading(false);

        if (response.data.response === "true") {

          setFormList(response.data.data)

        } else {
          Alert.alert("Incorrect Username or Password!")
          //getProgressbar(false)
          // navigation.replace('DrawerNavigationRoutes');

        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.sliderContainer}
    onPress={() => {navigation.navigate('CustomForm', { title: item.FormName, nextTitle: 'Call', id: item.FormId }) }}>
    
    <View >
      <Text style={styles.headingText}>{item.FormName}</Text>
    </View>
    </TouchableOpacity>
  );



  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
     
        <View>
          <FlatList
            data={FormList}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      
    </View>
  );
};
export default FormListScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    //justifyContent: 'center',
    //backgroundColor: '#307ecc',
    backgroundColor: '#fff',
    //alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dadae8',
    backgroundColor: '#F8F8FF'
  },
  registerTextStyle: {
    color: '#0047ab',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  gradient: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: '100%'
  },
  separator: {
    color: 'red',
   // borderBottomColor: 'red',
    //borderBottomWidth: 1,
  },
  headingText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '700',
    padding: 10,
    //fontWeight: 'normal',
    color: '#000',
  },

  sliderContainer: {
    width: '95%',
    marginTop: 10,
    marginBottom:5,
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
});
