import "react-native-gesture-handler";
import React from "react";
import MainScreen from "./domains/home/MainScreen.jsx";
import NewGameScreen from "./domains/newGame/NewGameScreen.jsx";
import JoinGameScreen from "./domains/joinGame/JoinGameScreen.jsx";
import GameScreen from "./domains/game/GameScreen.jsx";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={MainScreen}
                    screenOptions={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="NewGame"
                    component={NewGameScreen}
                    screenOptions={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="JoinGame"
                    component={JoinGameScreen}
                    screenOptions={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Game"
                    component={GameScreen}
                    screenOptions={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
