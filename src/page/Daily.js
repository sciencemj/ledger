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
import * as SQLite from "expo-sqlite";

function openDatabase() {
    if (Platform.OS === "web") {
        return {
            transaction: () => {
                return {
                    executeSql: () => {},
                };
            },
        };
    }

    return SQLite.openDatabase("database.db");
}

const db = openDatabase();

export default function Daily({ navigation }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [price, setPrice] = useState(0);
    const [todaySum, setTodaySum] = useState(0);
    const [monthSum, setMonthSum] = useState(0);
    const dailyBudget = 10000;
    const monthlyBudget = 500000;

    function totalToday() {
        db.transaction((tx) => {
            tx.executeSql('SELECT COALESCE(SUM(price), 0) AS total FROM receipts WHERE time = CURRENT_DATE;', [], (_, { rows }) => {
                const sum = rows._array[0].total || 0;
                setTodaySum(sum);
            });
        });
    }

    function totalMonth() {
        db.transaction((tx) => {
            tx.executeSql('SELECT COALESCE(SUM(price), 0) AS total FROM receipts WHERE time >= DATE(\'now\', \'start of month\');', [], (_, { rows }) => {
                const sum = rows._array[0].total || 0;
                setMonthSum(sum);
            });
        });
    }

    function addReceipt(price) {
        db.transaction((tx) => {
            tx.executeSql('insert into receipts (price) values (?)', [price]);
            refresh();
            tx.executeSql('SELECT * FROM receipts;', [], (_, { rows }) => {
                console.log(JSON.stringify(rows))
            });
        });
    }

    function refresh() {
        totalToday();
        totalMonth();
    }


    useEffect(() => {
        db.transaction((tx) => {
            //tx.executeSql('drop table if exists receipts;'); //reset when start, debug option
            tx.executeSql('create table if not exists receipts (id INTEGER PRIMARY KEY AUTOINCREMENT, time DAY default CURRENT_DATE, price INT);')
        });
        refresh();
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
                            <Pressable className='flex-1 items-center justify-center'onPress={() => {
                                setPrice(price + 50000);
                            }}>
                                <Text className={'text-xl'}>₩50,000</Text>
                            </Pressable>
                            <Pressable className='flex-1 border-l-[1px] border-l-black items-center justify-center'onPress={() => {
                                setPrice(price + 10000);
                            }}>
                                <Text className={'text-xl'}>₩10,000</Text>
                            </Pressable>
                            <Pressable className='flex-1 border-l-[1px] border-l-black items-center justify-center' onPress={() => {
                                setPrice(price + 5000);
                            }}>
                                <Text className={'text-xl'}>₩5,000</Text>
                            </Pressable>
                            <Pressable className='flex-1 border-l-[1px] border-l-black items-center justify-center'onPress={() => {
                                setPrice(price + 1000);
                            }}>
                                <Text className={'text-xl'}>₩1,000</Text>
                            </Pressable>
                        </View>
                        <Button icon={'check'} label={""} func={() => {
                            addReceipt(price); //include refresh();
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

