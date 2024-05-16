import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View, Image, Dimensions, Modal} from 'react-native';
import Daily from "./src/page/Daily";
import {NavigationContainer} from "@react-navigation/native";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import Monthly from "./src/page/Monthly";
import AssetManage from "./src/page/AssetManage";
import Preference from "./src/page/Preference";
import { AntDesign } from '@expo/vector-icons';
import { registerRootComponent } from 'expo';

const Tab = createMaterialTopTabNavigator();
const windowWidth = Dimensions.get('window').width;
const tabWidth = windowWidth/4;

export default function App() {
  return (
    <NavigationContainer className='bg-gray-500' style={styles.container}>
        <Tab.Navigator
            className={'bg-gray-500'}
            tabBarPosition={'bottom'}
            style={styles.bottomTab}
            screenOptions={
                {
                    tabBarStyle: { backgroundColor: 'white', height: 80, borderWidth: 1, borderRadius: 15,
                        shadowOffset: {width: 10, height: 10}},
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

registerRootComponent(App);

const styles = StyleSheet.create({
    container: {
    flex: 1,
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
    }
});