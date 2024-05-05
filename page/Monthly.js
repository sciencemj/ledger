import {View, StyleSheet, Text} from "react-native";
import colors from "../assets/colors.json";

export default function Monthly() {
    return(
        <View style={styles.container}>
            <Text>hihihi</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainColor,
        alignItems: 'center',
        justifyContent: 'center',
    }
})