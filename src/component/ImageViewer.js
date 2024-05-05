import {Image, StyleSheet} from "react-native";
import colors from "../assets/colors.json";

export default function ImageViewer({imageSource}){
    return (<Image  source={imageSource}/>);
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
        borderWidth: 18,
    },
});