import 'react-native-gesture-handler';
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import MainScreen from "./domains/home/MainSreen";
import GameScreen from './domains/game/GameScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const backgroundColor = "#fff";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        // To avoid overlapping status bar on android : https://stackoverflow.com/questions/51289587/react-native-how-to-use-safeareaview-for-android-notch-devices/55017347
        paddingTop: Platform.OS === "android" ? 25 : 0,
    },
});

const Stack = createStackNavigator()
export default function App() {
    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={MainScreen}
                />
                <Stack.Screen
                    name="Game"
                    component={GameScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
