import React from "react";
import {  TouchableOpacity,View, Image,  Text } from "react-native";
import { Colors } from "../../themes/colors";
import { AirbnbRating } from 'react-native-elements';
import { Fonts } from "../../themes/fonts";
import ConstantStyle from '../../themes/styles'

const CourseCard = (props) => {

    return (
        <TouchableOpacity onPress={() =>props.navigation.navigate("DetailScreen")}
            activeOpacity={0.7}
            style={{
                width: '50%',
                ...ConstantStyle.shadow
            }}>
            <View
                style={{
                    marginHorizontal: 7.5,
                    marginBottom:20,
                    backgroundColor: Colors.lightGray,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10
                }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Image alt="abc"
                        style={{
                            width: '100%',
                            height: 150,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10
                        }}
                        source={props.image} >
                    </Image>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginVertical: 10,
                    marginHorizontal: 15,
                }}>
                    <View style={{ justifyContent: 'space-between' }}>
                        <Text style={{...Fonts.Black16Bold,textAlign:"left"}} numberOfLines={2} ellipsizeMode="tail">{props.course}</Text>
                        <Text style={{...Fonts.Grey14Regular,textAlign:"left", marginTop:3}}>{props.by}</Text>
                        <View style={{flexDirection:"row",marginTop:3}}>
                            {/* <AirbnbRating
                                isDisabled={true}
                                showRating={false}
                                size={15}
                                count={5}
                                defaultRating={props.star}
                                starContainerStyle={{ marginHorizontal: -3 }} /> */}
                            <Text style={{...Fonts.Grey14Regular,textAlign:"left"}} >{props.review}</Text></View>
                        <Text style={{...Fonts.Primary16Bold,marginLeft:2,textAlign:"left", marginTop:3}}>{props.price}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
export default CourseCard;
