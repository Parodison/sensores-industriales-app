import { useFonts, Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter";
import { StyleProp, TextProps, TextStyle } from "react-native";
import { Text } from "react-native";

interface InterTextProps extends TextProps {
    type?: "bold" | "regular";
    style?: Omit<TextStyle, "fontFamily" | "fontWeight">;
    children: React.ReactNode;
}

export const InterText = (props: InterTextProps) => {
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



    return <Text {...props} style={[{ fontFamily }, props.style]}>{props.children}</Text>;
}