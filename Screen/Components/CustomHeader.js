import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from "../../themes/colors";


const CustomHeader = ({ title }) => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, padding: 10 }}>
      {title ? (
        <>
          <TouchableOpacity style={{ paddingRight: 10 }} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 18, fontWeight: 'bold', color: '#000' ,paddingRight:20}}>{title}</Text>
        </>
      ) : (
        <TouchableOpacity style={{ paddingRight: 10, paddingLeft: 10 }} onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomHeader;