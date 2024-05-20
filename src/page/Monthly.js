import {View, Text, Pressable, Alert} from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Monthly() {
    const [monthlyBudget, setMonthlyBudget] = useState(500000);

    useEffect(() => {
        async function getMonthlyBudget() {
            try{
                const budget = await AsyncStorage.getItem('monthlyBudget');
                if (budget) {
                    setMonthlyBudget(Number(JSON.parse(budget)));
                } 
            } catch {
                AsyncStorage.setItem('monthlyBudget', JSON.stringify(monthlyBudget));
            }
            
        }
        getMonthlyBudget();
    }, []);
    return(
        <View className="flex-1 items-center justify-center shadow-sm bg-gray-500">
            <Pressable className="shadow-lg shadow-black bg-white h-48 w-48 rounded-lg items-center justify-center"
                onPress={() => {
                    Alert.prompt("월 예산을 설정합니다.", "월 예산을 설정하시겠습니까?", (value) => {
                        setMonthlyBudget(Number(value));
                        AsyncStorage.setItem('monthlyBudget', JSON.stringify(value));
                    });
                }}>
                <Text className="text-3xl">₩{monthlyBudget.toLocaleString('ko-KR')}</Text>
            </Pressable>
        </View>
    )
}