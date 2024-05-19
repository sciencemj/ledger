import React from 'react';
import { Modal, View, Text, Pressable } from 'react-native';
import { BlurView } from "expo-blur";
import CurrencyInput from "react-native-currency-input";
import Button from "../Button";
import EditDailyReciptModal from './EditDailyReceiptModal';

const AddReceiptModal = ({ modalOpen, setModalOpen, price, setPrice, addReceipt }) => {
    return (
        <Modal transparent={true} visible={modalOpen} animationType="slide">
            <BlurView className={'flex-1 items-center justify-center'}>
                <View className={'items-center justify-center bg-gray-300 w-11/12 h-auto rounded-lg'}>
                    <Text className={'text-2xl'}>hihihi</Text>
                    <View>
                        <CurrencyInput className={'bg-white text-3xl rounded-lg w-[320px] text-right'}
                            value={price} onChangeValue={setPrice} delimiter={','} separator={'.'} precision={0} prefix={'₩'} minValue={0} />
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
                        setModalOpen(!modalOpen);
                    }} />
                </View>
            </BlurView>
        </Modal>
    )
}

export default AddReceiptModal;