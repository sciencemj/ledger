import React, { useState, useEffect } from 'react'; // React를 임포트
import { Modal, View, Text, Pressable } from 'react-native'; // 필요한 컴포넌트 임포트
import { BlurView } from 'expo-blur'; // BlurView 임포트
import Button from "../Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

const EditDailyReciptModal = ({ modalOpen, setModalOpen, price, setPrice, addReceipt }) => {
    const [receipts, setReceipts] = useState([]);
    const [selectedReceipt, setSelectedReceipt] = useState(null);

    async function fetchReceipts() {
        const today = new Date().toISOString().split('T')[0];
        const storedReceipts = await AsyncStorage.getItem('receipts');
        const parsedReceipts = JSON.parse(storedReceipts) || [];
        const filteredReceipts = parsedReceipts.filter(receipt => receipt.date === today);
        setReceipts(filteredReceipts);
    }

    async function editReceipt({id, price}) {
        const newReceipt = receipts.find(receipt => receipt._id === id);
        newReceipt.price = price;
        setReceipts(receipts.map(receipt => receipt._id === id ? newReceipt : receipt));
        AsyncStorage.setItem('receipts', JSON.stringify(receipts));
    }

    useEffect(() => {
        fetchReceipts();
    }, [modalOpen]);

    return (
        <Modal transparent={true} visible={modalOpen} animationType="slide">
            <BlurView className={"flex-1 items-center justify-center"}>
                <View className={"items-center justify-center bg-gray-300 w-11/12 h-auto rounded-lg"}>
                    <Text className={"text-2xl"}>hihihi</Text>
                    <View className={"w-full p-4"}>
                        <ScrollView>
                        {receipts.map((receipt) => (
                            <View key={receipt._id} className={"flex-row justify-between items-center p-2 bg-white rounded-lg mb-2"}>
                                <Pressable onPress={() => setSelectedReceipt(receipt)}>
                                    <Text className={"text-lg"}>{receipt.date}</Text>
                                    <Text className={"text-lg"}>{receipt.category}</Text>
                                    <Text className={"text-lg"}>{receipt.price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}</Text>
                                </Pressable>
                            </View>
                        ))}
                        </ScrollView>
                    </View>
                    <Button icon={"check"} label={""} func={() => {setModalOpen(!modalOpen)}} />
                </View>
            </BlurView>
            {selectedReceipt && <EditReceiptModal receipt={selectedReceipt} modalOpen={Boolean(selectedReceipt)} 
            setModalOpen={setSelectedReceipt} editReceipt={editReceipt} />}
        </Modal>
    )
}

const EditReceiptModal = ({receipt, modalOpen, setModalOpen, editReceipt}) => {
    const [price, setPrice] = useState(receipt.price);
    return (
        <Modal transparent={true} visible={modalOpen} animationType="slide">
            <BlurView className={"flex-1 items-center justify-center"}>
                <View className={"items-center justify-center bg-gray-300 w-11/12 h-auto rounded-lg"}>
                    <Text className={"text-2xl"}>{receipt.date}</Text>
                    <View className={"w-full p-4"}>
                        <Text>{receipt.price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}</Text>
                        <View>
                            <CurrencyInput className={'bg-white text-3xl rounded-lg w-[320px] text-right'}
                                value={price} onChangeValue={setPrice} delimiter={','} separator={'.'} precision={0} prefix={'₩'} minValue={0} />
                        </View>
                        <View className={'flex-row justify-center items-center mt-2 rounded-lg bg-amber-50'}>
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
                            editReceipt({id: receipt._id, price: price});
                            setModalOpen(null);
                        }} />
                    </View>
                </View>
            </BlurView>
        </Modal>
    )
}

export default EditDailyReciptModal;
