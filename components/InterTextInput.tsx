import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { StyleProp, TextInputProps, TextProps, TextStyle, View } from "react-native";
import { TextInput } from "react-native";
import { ImageSourcePropType } from "react-native";
import { SvgProps } from "react-native-svg";

interface InterTextInputProps extends TextInputProps {
    type?: "bold" | "regular";
    style?: Omit<TextStyle, "fontFamily" | "fontWeight">;
    icon?: React.FC<SvgProps> | ImageSourcePropType
}

export const InterTextInput = (props: InterTextInputProps) => {
    const [fontsLoaded] = useFonts({
        Inter_700Bold,
        Inter_400Regular
    })
    if (!fontsLoaded) return null;

    
    let fontFamily;

    if (!props.type) {
        fontFamily = "Inter_400Regular"
    }

    props.type === "bold" ? fontFamily = "Inter_700Bold" : fontFamily = "Inter_400Regular"
    const SvgIcon = props.icon as React.FC<SvgProps>;


    return (
        <View style={{flexDirection: "row", alignItems: "center"}}>
            {props.icon &&
                <SvgIcon width={45} height={45} fill={"#585858ff"} style={{backgroundColor: "#bbbbbbff", padding: 20, marginRight: 10}}/>
            }
            <TextInput placeholderTextColor={"black"} placeholder={props.placeholder} {...props} style={[{ fontFamily, color: "black" }, props.style]}></TextInput>
        </View>
    );
}