import {Pressable, Text, View} from "react-native";
import Button from "./Button";

function Num({ num }) {
    return(
        <View className={'flex-1/4'}>
            <Pressable className={'bg-white shadow-lg rounded-lg'}>
                <Text>{num}</Text>
            </Pressable>
        </View>
    )
}

export default function NumPad({}) {
    return(
        <View className={'flex-col'}>
            <View className={'flex-row'}>
                <Num num={'1'} />
                <Num num={'1'} />
                <Num num={'1'} />
            </View>
            <View className={'flex-row'}>
                <Num num={'1'} />
                <Num num={'1'} />
                <Num num={'1'} />
            </View>
            <View className={'flex-row'}>
                <Num num={'1'} />
                <Num num={'1'} />
                <Num num={'1'} />
            </View>
            <View className={'flex-row'}>
                <Num num={'1'} />
                <Num num={'1'} />
                <Num num={'1'} />
            </View>
        </View>
    )
}