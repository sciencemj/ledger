import {StyleSheet, Text, View, Image, Pressable, Alert, Modal} from 'react-native';
import 'react';
import ImageViewer from "../component/ImageViewer";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import colors from "../assets/colors.json";
import Button from "../component/Button";
import MessageBox from "../component/MessageBox";
import {useState} from "react";

const BackgroundImage = require('../assets/background-image.png');

export default function Daily({ navigation }) {
    const [modalOn, setModalOn] = useState(false);
    return (
        <View className={'flex-1 bg-gray-500 items-center justify-center'}>
            <Modal className={'items-center justify-center bg-white flex-1'} transparent={true} visible={modalOn}
            animationType="slide">
                <View className={'flex-1 items-center justify-center bg-amber-100'}>
                    <Text className={'text-2xl'}>hihihi</Text>
                    <Button icon={'minus'} label={""} func={() => setModalOn(!modalOn)} />
                </View>
            </Modal>
            <View className={'grid grid-cols-4'}>
                <MessageBox title={"Spend"} content={"10,000"} func={() => Alert.alert("Budget")} />
                <MessageBox title={"budget"} content={"10,000"} func={() => Alert.alert("Budget")} />
                <MessageBox title={"all budget"} content={"10,000"} func={() => Alert.alert("Budget")} />
            </View>
                <Button
                    icon="plus"
                    label=""
                    func={() => setModalOn(!modalOn)}
                />
        </View>
    );
}

