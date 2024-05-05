import {StyleSheet, Text, View} from "react-native";
import colors from "../assets/colors.json";

export default function AssetManage({ navigation}) {
    return(
        <View style={styles.container}>
            <Text>Asset manager</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#faebd7',
        alignItems: 'center',
        justifyContent: 'center',
    },
})