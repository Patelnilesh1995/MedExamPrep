import React from "react";
import { TouchableOpacity, View, Image, } from "react-native";
import { Text } from "native-base";
import { Colors } from "../../themes/colors";
import { AirbnbRating } from 'react-native-elements';
import { Fonts } from "../../themes/fonts";
import ConstantStyle from '../../themes/styles'
import { formatDate } from "../../themes/date";

const LatestNews = (props) => {

    const formattedDate = formatDate(props.date, 'MMM DD YY');

    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('DetailScreen')}
            activeOpacity={0.7}
            style={{
                backgroundColor: Colors.lightGray,
                marginVertical: 8,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: "center",
                marginHorizontal: 15,
                ...ConstantStyle.shadow,
                flex:1
            }} >
            <View style={{
                flexDirection: 'row',
                //justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
                marginHorizontal: 10,
            }}
            >
                <View>
                    <Image
                        style={{
                            width: 105,
                            height: 105,
                            borderRadius: 10
                        }}
                        source={{uri: props.image}} >
                    </Image>
                </View>

                <View style={{
                    paddingLeft: 15,
                    flexDirection:"column",
                    alignSelf:'flex-start',
                    flex:1
                }}>
                    <Text  numberOfLines={1} ellipsizeMode="tail" style={{ ...Fonts.Black16Bold, lineHeight: 25,textAlign:"left" , }}>{props.title}</Text>
                    <View style={{ flexDirection: "row",marginLeft:0 }}>
                        {/* <AirbnbRating isDisabled={true} showRating={false} size={15} count={5} defaultRating={props.star} /> */}
                        <Text style={[Fonts.White14Small,{color:Colors.black,paddingTop:2}]} >{formattedDate}</Text>
                    </View>
                    {/* <Text style={{ ...Fonts.Black16Bold, lineHeight: 25,textAlign:"left",marginLeft:2 }}>{props.price}</Text> */}
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[Fonts.White14Small,{color:Colors.primary, paddingTop:2}]} >{props.desc}</Text>


                    <TouchableOpacity style={{backgroundColor:Colors.primary, borderRadius:5, alignSelf:'flex-start', marginTop:5}} >
                    <Text style={{ ...Fonts.White14Small, textAlign:"center",padding:5 }}>{'Read More'}</Text>

                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>

    );
};
export default LatestNews;
