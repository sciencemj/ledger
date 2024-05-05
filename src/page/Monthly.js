import {View, StyleSheet, Text, Button} from "react-native";
import colors from "../assets/colors.json";
import {fontSize} from "nativewind/dist/tailwind/native/font-size";

export default function Monthly() {
    return(
        <View className="flex-1 items-center justify-center shadow-sm bg-gray-500">
            <View title={"button"} className="shadow-lg shadow-black bg-white h-48 w-48 rounded-lg" />
        </View>
    )
}