import React from "react";
import { TouchableOpacity, View, Image, } from "react-native";
import { Text } from "native-base";
import { Colors } from "../../themes/colors";
import { AirbnbRating } from 'react-native-elements';
import { Fonts } from "../../themes/fonts";
import ConstantStyle from '../../themes/styles'
import { formatDate } from "../../themes/date";
import TextWithoutHtmlTags from './TextWithoutHtmlTags'; // Import the TextWithoutHtmlTags component
import Ionicons from 'react-native-vector-icons/Ionicons';

const BlogListing = (props) => {
    const formattedDate = formatDate(props.date, 'MMM DD YY');

    const stripHtmlTags = (html) => {
        return html.replace(/<[^>]*>/g, '');
      };

    return (
        <TouchableOpacity onPress={() => {props.navigation.navigate('YourBlogDetails',{item: props.item})}}
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
                <Ionicons
                name="share-social-outline"
                size={24}
                color={Colors.primary}
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 7,
                    zIndex: 1, // Ensure the icon is above other content
                }}
            />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
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
                        source={{ uri: props.image }} >
                    </Image>
                </View>

                <View style={{
                    paddingLeft: 15,
                    flexDirection: "column",
                    alignSelf: 'flex-start',
                    flex: 1
                }}>
                    <Text numberOfLines={2} ellipsizeMode="tail" style={{ ...Fonts.Black16Bold, lineHeight: 25, textAlign: "left",paddingRight:10 }}>{props.title}</Text>
                    <View style={{ flexDirection: "row", marginLeft: 0 }}>
                        {/* <AirbnbRating isDisabled={true} showRating={false} size={15} count={5} defaultRating={props.star} /> */}
                        <Text style={[Fonts.White14Small, { color: Colors.primary, paddingTop: 5 }]} >{formattedDate}</Text>
                    </View>
                    {/* <Text style={{ ...Fonts.Black16Bold, lineHeight: 25,textAlign:"left",marginLeft:2 }}>{props.price}</Text> */}
                    <Text numberOfLines={2} ellipsizeMode="tail" style={[Fonts.White13Regular,{color:Colors.primary, paddingTop:5,paddingRight:5}]} >{props.desc}</Text>
                    

                    <TouchableOpacity style={{ backgroundColor: Colors.primary, borderRadius: 5, alignSelf: 'flex-end', }} 
                    onPress={() => {props.navigation.navigate('YourBlogDetails',{item: props.item})}}>
                        <Text style={{ ...Fonts.White13Bold, textAlign: "center", padding: 5 }}>{'Read More'}</Text>

                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>

    );
};
export default BlogListing;
