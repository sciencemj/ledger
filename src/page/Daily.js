import {Alert, Modal, Platform, Pressable, Text, View} from 'react-native';
import React from 'react';
import Button from "../component/Button";
import MessageBox from "../component/MessageBox";
import {useEffect, useState} from "react";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {BlurView} from "expo-blur";
import * as Haptics from 'expo-haptics';
import {ImpactFeedbackStyle} from 'expo-haptics';
import CurrencyInput from "react-native-currency-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddReceiptModal from "../component/modals/AddReceiptModal";
import EditDailyReciptModal from "../component/modals/EditDailyReceiptModal";
import { useFocusEffect } from '@react-navigation/native';

const categories = ['식비', '쇼핑', '카페', '여가', '요금', '기타'];

export default function Daily({ navigation }) {
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [price, setPrice] = useState(0);
    const [todaySum, setTodaySum] = useState(0);
    const [monthSum, setMonthSum] = useState(0);
    const [monthlyBudget, setMonthlyBudget] = useState(500000);
    const [dailyBudget, setDailyBudget] = useState(10000);

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

    async function addReceipt(price, category) {
        const newReceipt = {
            _id: Date.now(),
            price: price,
            date: new Date().toISOString().split('T')[0],
            category: category
        };
        const receipts = JSON.parse(await AsyncStorage.getItem('receipts')) || [];
        receipts.push(newReceipt);
        await AsyncStorage.setItem('receipts', JSON.stringify(receipts));
        await totalToday();
        await totalMonth();
    }

    useEffect(() => {
        async function getMonthlyBudget() {
            const budget = await AsyncStorage.getItem('monthlyBudget');
            setMonthlyBudget(Number(JSON.parse(budget)));
            console.log(monthlyBudget);
            setDailyBudget(monthlyBudget / 30);
        }
        getMonthlyBudget();
        totalToday();
        totalMonth();
    }, [editModalOpen || addModalOpen]);

    useFocusEffect(
        React.useCallback(() => {
            async function getMonthlyBudget() {
                const budget = await AsyncStorage.getItem('monthlyBudget');
                if (budget) {
                    setMonthlyBudget(Number(JSON.parse(budget)));
                    setDailyBudget(Number(JSON.parse(budget)) / 30);
                }
            }
            getMonthlyBudget();
            totalToday();
            totalMonth();
        }, [])
    );

    return (
        <View className={'flex-1 bg-gray-500 items-center justify-center'}>
            <View className={'grid grid-cols-4'}>
                <MessageBox icon={<MaterialCommunityIcons name="cash-minus" size={36} color="black" />}
                            title={"Spend"} content={todaySum.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
                            func={() => setEditModalOpen(!editModalOpen)} />
                <MessageBox icon={<MaterialCommunityIcons name="cash" size={36} color="black" />}
                            title={"Budget"} content={(dailyBudget - todaySum).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })} func={() => Alert.alert("Budget")} />
                <MessageBox icon={<MaterialCommunityIcons name="cash-multiple" size={36} color="black" />}
                            title={"All Budget"} content={(monthlyBudget - monthSum).toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })} func={() => Alert.alert("Budget")} />
            </View>
            <Button icon="plus" label="" func={() => {
                Haptics.impactAsync(ImpactFeedbackStyle.Heavy).then(r => null);
                setAddModalOpen(!addModalOpen);
            }} />
            <AddReceiptModal modalOpen={addModalOpen} setModalOpen={setAddModalOpen} price={price} setPrice={setPrice} addReceipt={addReceipt} />
            <EditDailyReciptModal modalOpen={editModalOpen} setModalOpen={setEditModalOpen} price={price} setPrice={setPrice} addReceipt={addReceipt} />
        </View>
    );
}

