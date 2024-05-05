import {Pressable, Text, View, StyleSheet} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import colors from "../assets/colors.json";

export default function Button({ icon, label, func }){
    return (
        <View className='shadow-lg shadow-black focus:bg-amber-200 bg-white rounded-lg w-11/12
         items-center mt-10 h-12 justify-center mb-0'>
            <Pressable
                className='w-full h-full items-center justify-center'
                onPress={func}
            >
                <FontAwesome
                    name={icon}
                    size={18}
                    color="#25292e" />
                {
                    label === ""
                ? <></>
                : <Text>{label}</Text>
                }
            </Pressable>
        </View>
    );
}