import {Dimensions, Pressable, Text, View, StyleSheet} from "react-native";
const windowWidth = Dimensions.get('window').width;
const side = windowWidth/2 -10;

export default function MessageBox({title, content, func}) {

    return(
        <View style={styles.boxContainer}>
            <Pressable onPress={func} style={styles.box}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.content}>{content}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    boxContainer: {
        width: side * 2,
        height: side - side/6,
        margin: side/12,
        justifyContent: 'center',
    },
    box: {
        flex: 1,
        backgroundColor: '#a9ac94',
        borderRadius: 20,
        flexDirection: 'column'
    },
    title: {
        fontSize: 18,
        textAlign: 'left',
        marginLeft: 10,
        marginTop: 10,
        flex: 1,
    },
    content: {
        fontSize: 30,
        textAlign: "right",
        marginRight: 10,
        flex: 2,
    }
})