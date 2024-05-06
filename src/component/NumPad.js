import {Pressable, Text, View} from "react-native";
import Button from "./Button";

function Num({ num }) {
    return(
        <View className={'w-1/4 h-full justify-center items-center p-1'}>
            <Pressable className={'w-full h-full items-center justify-center bg-white shadow-lg rounded-lg'}>
                <Text className={'text-3xl'}>{num}</Text>
            </Pressable>
        </View>
    )
}

export default function NumPad({}) {
    return(
        <View className={'flex-col items-center justify-center'}>
            <View className={'flex-row h-1/6'}>
                <Num num={'7'} />
                <Num num={'8'} />
                <Num num={'9'} />
            </View>
            <View className={'flex-row h-1/6'}>
                <Num num={'4'} />
                <Num num={'5'} />
                <Num num={'6'} />
            </View>
            <View className={'flex-row h-1/6'}>
                <Num num={'1'} />
                <Num num={'2'} />
                <Num num={'3'} />
            </View>
            <View className={'flex-row h-1/6'}>
                <Num num={'1'} />
                <Num num={'0'} />
                <Num num={'1'} />
            </View>
        </View>
    )
}