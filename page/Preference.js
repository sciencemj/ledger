import {Text, View, StyleSheet} from "react-native";
import colors from "../assets/colors.json";


export default function Preference({ navigation}) {
    return(
        <View style={styles.container}>
            <Text>⚙️</Text>
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