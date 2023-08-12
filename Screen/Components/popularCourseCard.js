import React from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import { Colors } from "../../themes/colors";
import { AirbnbRating } from 'react-native-elements';
import { Fonts } from "../../themes/fonts";
import ConstantStyle from '../../themes/styles'
import { color } from "react-native-reanimated";
import HTMLRender from 'react-native-render-html';


const PopularCourse = (props) => {

    return (
        <TouchableOpacity onPress={() => props.navigation.navigate("DetailScreen")}
            activeOpacity={0.7}
            style={{
                backgroundColor: Colors.lightGray,
                marginVertical: 10,
                borderRadius: 10,
                marginHorizontal: 15,
                ...ConstantStyle.shadow
            }}>
            <View>
                <Image
                    style={{
                        width: '100%',
                        height: 160,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                    }}
                    source={{ uri: props.image }} >
                </Image>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
                marginHorizontal: 10,
                borderRadius: 10,
            }}>
                <View style={{
                    flex: 1,
                    paddingHorizontal: 5,
                    flexDirection: "column"
                }}>
                    <View style={{ justifyContent: 'space-between', alignItems: "center", flexDirection: "row" }}>
                        <Text  style={{ width: '100%', ...Fonts.Black16Bold }} numberOfLines={2}>{"Treparation tips discourse assurance estimable application"}</Text>

                        {/* <HTMLRender
                            source={{ html: props.desc }}
                            contentContainerStyle={{ padding: 10, ...Fonts.Black14Bold , height:60}}
                        /> */}
                       
                        {/* <View style={{alignItems:"center",flexDirection:"row" }}>
                            <AirbnbRating isDisabled={true} showRating={false} size={15} count={5} defaultRating={props.star} />
                            <Text style={Fonts.Grey14Regular} >{props.rating}</Text>
                        </View> */}
                    </View>
                    {/* <Text style={Fonts.Grey14Regular}>{props.by}</Text>
                    <Text style={Fonts.Primary16Bold}>{props.price}</Text> */}
                    <TouchableOpacity style={{ backgroundColor: Colors.primary, marginTop: 5, padding: 10, borderRadius: 5, alignSelf: 'center' }}>
                        <Text style={Fonts.White14Medium}>{'Join Now'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default PopularCourse;
