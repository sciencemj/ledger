import {StyleSheet, Text, View, Image, Pressable, Alert} from 'react-native';
import 'react';
import ImageViewer from "../component/ImageViewer";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import colors from "../assets/colors.json";
import Button from "../component/Button";
import MessageBox from "../component/MessageBox";

const BackgroundImage = require('../assets/background-image.png');

export default function Daily({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <MessageBox title={"budget"} content={"10,000"} func={() => Alert.alert("Budget")} />
                <MessageBox title={"budget"} content={"10,000"} func={() => Alert.alert("Budget")} />
                <MessageBox title={"budget"} content={"10,000"} func={() => Alert.alert("Budget")} />
            </View>
                <Button
                    label="Go to Details"
                    theme={'primary'}
                    func={() => navigation.navigate('Monthly')}
                />
            <View style={styles.footerContainer} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        flex: 11/12,
        paddingTop: 60,
        flexDirection: "column"
    },
    footerContainer: {
        flex: 1/12,
        alignItems: 'center',
    },
});
