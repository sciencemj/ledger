import {Dimensions, Pressable, Text, View, StyleSheet} from "react-native";
const windowWidth = Dimensions.get('window').width;
const side = windowWidth/2 -10;

export default function MessageBox({icon, title, content, func}) {

    return(
        <View className='shadow-lg shadow-black' style={styles.boxContainer}>
            <Pressable className='rounded-lg bg-white' onPress={func} style={styles.box}>

                <Text style={styles.title}>{icon} {title}</Text>
                <Text style={styles.content}>{content}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    boxContainer: {
        width: windowWidth * 11/12,
        height: side - side/6,
        margin: side/12,
        justifyContent: 'center',
    },
    box: {
        flex: 1,
        flexDirection: 'column',
    },
    title: {
        fontSize: 30,
        textAlign: 'left',
        marginLeft: 10,
        marginTop: 10,
        flex: 1,
    },
    content: {
        fontSize: 48,
        textAlign: "right",
        marginRight: 10,
        flex: 2,
    }
})