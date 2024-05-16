import {Alert, Modal, Platform, Pressable, Text, View} from 'react-native';
import 'react';
import Button from "../component/Button";
import MessageBox from "../component/MessageBox";
import {useEffect, useState} from "react";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {BlurView} from "expo-blur";
import * as Haptics from 'expo-haptics';
import {ImpactFeedbackStyle} from 'expo-haptics';
import CurrencyInput from "react-native-currency-input";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Daily({ navigation }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [price, setPrice] = useState(0);
    const [todaySum, setTodaySum] = useState(0);
    const [monthSum, setMonthSum] = useState(0);
    const dailyBudget = 10000;
    const monthlyBudget = 500000;

    async function totalToday() {
        const today = new Date().toISOString().split('T')[0];
        const receipts = JSON.parse(await AsyncStorage.getItem('receipts')) || [];
        const todayReceipts = receipts.filter(receipt => receipt.date === today);
        const sum = todayReceipts.reduce((acc, curr) => acc + curr.price, 0);
        setTodaySum(sum);
    }

    async function totalMonth() {
        const thisMonth = new Date().toISOString().slice(0, 7);
        const receipts = JSON.parse(await AsyncStorage.getItem('receipts')) || [];
        const monthReceipts = receipts.filter(receipt => receipt.date.startsWith(thisMonth));
        const sum = monthReceipts.reduce((acc, curr) => acc + curr.price, 0);
        setMonthSum(sum);
    }

    async function addReceipt(price) {
        const newReceipt = {
            _id: Date.now(),
            price: price,
            date: new Date().toISOString().split('T')[0],
            category: '미정'
        };
        const receipts = JSON.parse(await AsyncStorage.getItem('receipts')) || [];
        receipts.push(newReceipt);
        await AsyncStorage.setItem('receipts', JSON.stringify(receipts));
        await totalToday();
        await totalMonth();
    }

    useEffect(() => {
        totalToday();
        totalMonth();
    }, []);

    return (
        <View className={'flex-1 bg-gray-500 items-center justify-center'}>
            <View className={'grid grid-cols-4'}>
                <MessageBox icon={<MaterialCommunityIcons name="cash-minus" size={36} color="black" />}
                            title={"Spend"} content={todaySum.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
                            func={() => Alert.alert("Budget")} />
                <MessageBox icon={<MaterialCommunityIcons name="cash" size={36} color="black" />}
                            title={"Budget"} content={(dailyBudget - todaySum).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })} func={() => Alert.alert("Budget")} />
                <MessageBox icon={<MaterialCommunityIcons name="cash-multiple" size={36} color="black" />}
                            title={"All Budget"} content={(monthlyBudget - monthSum).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })} func={() => Alert.alert("Budget")} />
            </View>
            <Button icon="plus" label="" func={() => {
                Haptics.impactAsync(ImpactFeedbackStyle.Heavy).then(r => null);
                setModalOpen(!modalOpen);
            }} />
            <Modal transparent={true} visible={modalOpen} animationType="slide">
                <BlurView className={'flex-1 items-center justify-center'}>
                    <View className={'items-center justify-center bg-indigo-300 w-11/12 h-auto rounded-lg'}>
                        <Text className={'text-2xl'}>hihihi</Text>
                        <View>
                            <CurrencyInput className={'bg-white text-3xl rounded-lg w-[320px] text-right'}
                                           value={price} onChangeValue={setPrice} delimiter={','} separator={'.'} precision={0} prefix={'₩'} minValue={0}/>
                        </View>
                        <View className={'flex-row justify-center items-center m-2 rounded-lg bg-amber-50'}>
                            <Pressable className='flex-1 items-center justify-center' onPress={() => {
                                setPrice(price + 50000);
                            }}>
                                <Text className={'text-xl'}>₩50,000</Text>
                            </Pressable>
                            <Pressable className='flex-1 border-l-[1px] border-l-black items-center justify-center' onPress={() => {
                                setPrice(price + 10000);
                            }}>
                                <Text className={'text-xl'}>₩10,000</Text>
                            </Pressable>
                            <Pressable className='flex-1 border-l-[1px] border-l-black items-center justify-center' onPress={() => {
                                setPrice(price + 5000);
                            }}>
                                <Text className={'text-xl'}>₩5,000</Text>
                            </Pressable>
                            <Pressable className='flex-1 border-l-[1px] border-l-black items-center justify-center' onPress={() => {
                                setPrice(price + 1000);
                            }}>
                                <Text className={'text-xl'}>₩1,000</Text>
                            </Pressable>
                        </View>
                        <Button icon={'check'} label={""} func={async () => {
                            await addReceipt(price);
                            setPrice(0);
                            Haptics.impactAsync(ImpactFeedbackStyle.Heavy).then(r => null);
                            setModalOpen(!modalOpen);
                        }} />
                    </View>
                </BlurView>
            </Modal>
        </View>
    );
}

