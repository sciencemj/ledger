import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import ImageViewer from "./component/ImageViewer";
import Button from "./component/Button";
import Daily from "./page/Daily";
import {NavigationContainer} from "@react-navigation/native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Monthly from "./page/Monthly";
import AssetManage from "./page/AssetManage";
import Preference from "./page/Preference";
import {Ionicons} from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import colors from "./assets/colors.json";

const BackgroundImage = require('./assets/background-image.png');
const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;
const tabWidth = windowWidth/4;

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
        <Tab.Navigator
            tabBarPosition={'bottom'}
            style={styles.bottomTab}
            screenOptions={
                {
                    tabBarStyle: { backgroundColor: colors.mainColor, height: 80, borderWidth: 1, borderRadius: 15 },
                    tabBarShowLabel: true,
                    tabBarIndicatorStyle: { backgroundColor: '#000', height: 3, top: 0, borderRadius: 30, width: 60,
                        marginLeft: (tabWidth-60)/2, },
                }
            }
        >
            <Tab.Screen name="Daily" component={Daily} options={{headerShown: false,
                tabBarIcon: () => <AntDesign name="home" size={24} color="black" />}} />
            <Tab.Screen name="Monthly" component={Monthly} options={{headerShown: false,
                tabBarIcon: () => <AntDesign name="calendar" size={24} color="black" />}} />
            <Tab.Screen name="Asset" component={AssetManage} options={{headerShown: false,
                tabBarIcon: () => <AntDesign name="wallet" size={24} color="black" />}} />
            <Tab.Screen name="Setting" component={Preference} options={{headerShown: false,
                tabBarIcon: () => <AntDesign name="setting" size={24} color="black" />}} />
        </Tab.Navigator>

    </NavigationContainer>
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
        flex: 1,
        paddingTop: 58,
    },
    footerContainer: {
        flex: 1 / 6,
        alignItems: 'center',
    },
    bottomTab: {
        height: '100%',
        paddingBottom: 0,
        backgroundColor: colors.mainColor,
    }
});
