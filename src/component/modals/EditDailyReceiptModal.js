import React, { useState, useEffect } from 'react'; // React를 임포트
import { Modal, View, Text, Pressable } from 'react-native'; // 필요한 컴포넌트 임포트
import { BlurView } from 'expo-blur'; // BlurView 임포트
import Button from "../Button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native';

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
                                    <Text className={"text-lg"}>{receipt.price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}</Text>
                                </Pressable>
                            </View>
                        ))}
                        </ScrollView>
                    </View>
                    <Button icon={"check"} label={""} func={() => {setModalOpen(!modalOpen)}} />
                </View>
            </BlurView>
            {selectedReceipt && <EditReceiptModal recipt={selectedReceipt} modalOpen={Boolean(selectedReceipt)} setModalOpen={setSelectedReceipt} />}
        </Modal>
    )
}

const EditReceiptModal = ({recipt, modalOpen, setModalOpen}) => {
    return (
        <Modal transparent={true} visible={modalOpen} animationType="slide">
            <BlurView className={"flex-1 items-center justify-center"}>
                <View className={"items-center justify-center bg-gray-300 w-11/12 h-auto rounded-lg"}>
                    <Text className={"text-2xl"}>{recipt.date}</Text>
                    <View className={"w-full p-4"}>
                        <Text>{recipt.price.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}</Text>
                    </View>
                    <Button icon={"check"} label={""} func={() => {setModalOpen(null)}} />
                </View>
            </BlurView>
        </Modal>
    )
}

export default EditDailyReciptModal;
