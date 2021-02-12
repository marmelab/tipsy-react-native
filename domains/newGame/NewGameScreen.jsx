import React, { useCallback, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import PropTypes from "prop-types";
import gameApi from "../../api/GameApi.jsx";

const NewGameScreen = ({ route, navigation }) => {
    const [game, setGame] = useState();
    const [error, setError] = useState();
    const [gameState, setGameState] = useState("pending");
    const { playerName } = route.params;
    const createGame = useCallback(
        (withBot = false) => {
            if (gameState === "pending") {
                setGameState("loading");
                gameApi
                    .newGame(playerName, withBot)
                    .then((data) => {
                        setGame(data);
                        setGameState("loaded");
                    })
                    .catch((err) => {
                        setError(err);
                        setGameState("error");
                    });
            }
        },
        [playerName, game, gameState, setGame, setGameState]
    );

    switch (gameState) {
        case "error":
            return (
                <View>
                    <Text>{error}</Text>
                </View>
            );
        case "loaded":
            navigation.navigate("Game", { playerName, gameId: game.id });
            return null;
        case "loading":
        default:
            return (
                <View style={styles.container}>
                    <Pressable onPress={() => createGame()}>
                        <Text style={styles.goButton}>Against player?</Text>
                    </Pressable>

                    <Pressable onPress={() => createGame(true)}>
                        <Text style={styles.goButton}>Against Skynet?</Text>
                    </Pressable>
                </View>
            );
    }
};

NewGameScreen.propTypes = {
    route: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "steelblue",
        // To avoid overlapping status bar on android : https://stackoverflow.com/questions/51289587/react-native-how-to-use-safeareaview-for-android-notch-devices/55017347
    },
    textInput: {
        height: 50,
        width: 200,
        margin: 50,
        paddingLeft: 20,
        borderColor: "white",
        color: "white",
        borderWidth: 2,
        borderRadius: 30,
    },
    goButton: {
        fontFamily: "Lobster",
        fontSize: 30,
        height: 50,
        width: 300,
        margin: 50,
        paddingLeft: 20,
        color: "steelblue",
        backgroundColor: "white",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
});
export default NewGameScreen;
