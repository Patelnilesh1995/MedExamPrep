import React from "react";
import { Text, View, SafeAreaView, TouchableOpacity, I18nManager } from "react-native";
import { Colors } from "../../../themes/colors";
import ConstantStyle from "../../../themes/styles";
import CustomHeader from "../../Components/CustomHeader";
import { Fonts } from "../../../themes/fonts";
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import { useTranslation } from "react-i18next";

const Settings = ({ navigation }) => {
  //const { t, i18n } = useTranslation();
  return (
    <SafeAreaView style={[ConstantStyle.container, { backgroundColor: Colors.primary }]}>
      <View style={{ backgroundColor: Colors.white, flex: 1 }}>
        <CustomHeader screenName={"Settings"} navigation={navigation} title={"Settings"} />
        <View style={{ marginHorizontal: 15, backgroundColor: Colors.white, borderRadius: 10, marginTop: 20, ...ConstantStyle.shadow }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("ChangePassword")}>
            <View style={{ justifyContent: 'space-between', alignItems: "center", paddingVertical: 15, flexDirection: "row" }}>
              <View style={{ alignItems: "center", marginLeft: 15 }}>
                <MaterialIcons name="lock" size={20} color="black" />
              </View>
              <View style={{ flex: 1, marginHorizontal: 15 }}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: "row" }}>
                  <Text style={{ ...Fonts.Black16Bold }}>{"Change Password"}</Text>
                  <Entypo name={I18nManager.isRTL ? "chevron-small-left" : "chevron-small-right"} size={24} color="black" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ width: "100%", height: 2, backgroundColor: Colors.lightGray4 }}></View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('TermAndConditions')}>
            <View style={{ justifyContent: 'space-between', alignItems: "center", paddingVertical: 15, flexDirection: "row" }}>
              <View style={{ alignItems: "center", marginLeft: 13 }}>
                <MaterialIcons name="info" size={20} color="black" />
              </View>
              <View style={{ flex: 1, marginHorizontal: 14 }}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: "row" }}>
                  <Text style={{ ...Fonts.Black16Bold }}>{"Term And Condition"}</Text>
                  <Entypo name={I18nManager.isRTL ? "chevron-small-left" : "chevron-small-right"} size={24} color="black" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ width: "100%", height: 2, backgroundColor: Colors.lightGray4 }}></View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('HelpAndSupport')}>
            <View style={{ justifyContent: 'space-between', alignItems: "center", paddingVertical: 15, flexDirection: "row" }}>
              <View style={{ alignItems: "center", marginLeft: 15 }}>
                <Entypo name="help-with-circle" size={20} color="black" />
              </View>
              <View style={{ flex: 1, marginHorizontal: 15 }}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: "row" }}>
                  <Text style={{ ...Fonts.Black16Bold }}>{"Help"}</Text>
                  <Entypo name={I18nManager.isRTL ? "chevron-small-left" : "chevron-small-right"} size={24} color="black" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;