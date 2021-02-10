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
            <Stack.Navigator>
                <Stack.Screen name="Home" component={MainScreen} />
                <Stack.Screen name="NewGame" component={NewGameScreen} />
                <Stack.Screen name="JoinGame" component={JoinGameScreen} />
                <Stack.Screen name="Game" component={GameScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
