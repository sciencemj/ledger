import {StyleSheet, Text, View, Image, Pressable, Alert, Modal} from 'react-native';
import 'react';
import ImageViewer from "../component/ImageViewer";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import colors from "../assets/colors.json";
import Button from "../component/Button";
import MessageBox from "../component/MessageBox";
import {useState} from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {BlurView} from "expo-blur";
import NumPad from "../component/NumPad";
import * as Haptics from 'expo-haptics';
import {ImpactFeedbackStyle} from "expo-haptics";
const BackgroundImage = require('../assets/background-image.png');

export default function Daily({ navigation }) {
    const [modalOn, setModalOn] = useState(false);
    return (
        <View className={'flex-1 bg-gray-500 items-center justify-center'}>
            <View className={'grid grid-cols-4'}>
                <MessageBox icon={<MaterialCommunityIcons name="cash-minus" size={36} color="black" />}
                            title={"Spend"} content={"10,000"} func={() => Alert.alert("Budget")} />
                <MessageBox icon={<MaterialCommunityIcons name="cash" size={36} color="black" />}
                            title={"Budget"} content={"10,000"} func={() => Alert.alert("Budget")} />
                <MessageBox icon={<MaterialCommunityIcons name="cash-multiple" size={36} color="black" />}
                            title={"All Budget"} content={"10,000"} func={() => Alert.alert("Budget")} />
            </View>
                <Button
                    icon="plus"
                    label=""
                    func={() => {
                        Haptics.impactAsync(ImpactFeedbackStyle.Heavy);
                        setModalOn(!modalOn);
                    }}
                />

            <Modal className={'items-center justify-center'}
                   transparent={true} visible={modalOn}
                   animationType="slide">
                <BlurView className={'flex-1 items-center justify-center'}>
                    <View className={'items-center justify-center bg-indigo-300 w-11/12 h-1/2 rounded-lg'}>
                        <Text className={'text-2xl'}>hihihi</Text>
                        <NumPad />
                        <Button icon={'minus'} label={""} func={() => {
                            Haptics.impactAsync(ImpactFeedbackStyle.Heavy);
                            setModalOn(!modalOn);
                        }} />
                    </View>
                </BlurView>
            </Modal>
        </View>
    );
}

