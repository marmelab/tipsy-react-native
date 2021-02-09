import "react-native-gesture-handler";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import MainScreen from "./domains/home/MainScreen.jsx";
import NewGameScreen from "./domains/newGame/NewGameScreen.jsx";
import JoinGameScreen from "./domains/joinGame/JoinGameScreen.jsx";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

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

const Stack = createStackNavigator();
const App = () => {
    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={MainScreen} />
                <Stack.Screen name="NewGame" component={NewGameScreen} />
                <Stack.Screen name="JoinGame" component={JoinGameScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
