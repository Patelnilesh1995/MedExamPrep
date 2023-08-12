import React from "react";
import { TouchableOpacity, Text, View,Image} from "react-native";
import { Colors } from "../../themes/colors";
import { AirbnbRating } from 'react-native-elements';
import { Fonts } from "../../themes/fonts";
import ConstantStyle from '../../themes/styles'

const Feature = (props) => {

    return (
        <TouchableOpacity onPress={() =>props.navigation.navigate("DetailScreen")}
            activeOpacity={0.7}
            style={{
                backgroundColor: Colors.lightGray,
                marginVertical: 8,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: "center",
                marginHorizontal: 15,
                ...ConstantStyle.shadow
            }} >
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
                marginHorizontal: 10,
            }}>
                <View>
                    <Image 
                        style={{
                            width: 105,
                            height: 105,
                            borderRadius: 10
                        }}
                        source={ props.image} >
                    </Image>
                </View>
                <View style={{
                    paddingHorizontal: 15,
                    flexDirection:"column"
                }}>
                    <Text style={{ ...Fonts.Black16Bold, lineHeight: 25,textAlign:"left" }}>{props.course}</Text>
                    <View style={{ flexDirection: "row",marginLeft:-3 }}>
                        <AirbnbRating isDisabled={true} showRating={false} size={15} count={5} defaultRating={props.star} />
                        <Text style={Fonts.Grey14Regular} >{props.rating}</Text>
                    </View>
                    <Text style={{ ...Fonts.Black16Bold, lineHeight: 25,textAlign:"left",marginLeft:2 }}>{props.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default Feature;
