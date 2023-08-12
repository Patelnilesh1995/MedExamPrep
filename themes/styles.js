import { StyleSheet} from "react-native";
import { Colors } from "./colors";
const ConstantStyle = StyleSheet.create({
    shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    container:{
        backgroundColor:Colors.white,
        flex:1,
    },
    radius:{
        borderRadius:10
    }
})
export default ConstantStyle;
