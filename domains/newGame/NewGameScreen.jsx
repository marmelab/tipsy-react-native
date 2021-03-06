import React, { useCallback, useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import PropTypes from "prop-types";
import gameApi from "../../api/GameApi.jsx";

const Redirect = ({ navigation, playerName, gameId }) => {
    useEffect(() => {
        navigation.navigate("Game", { playerName, gameId });
    });
    return null;
};

Redirect.propTypes = {
    navigation: PropTypes.object.isRequired,
    playerName: PropTypes.string,
    gameId: PropTypes.number,
};

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
            return (
                <Redirect
                    playerName={playerName}
                    gameId={game.id}
                    navigation={navigation}
                />
            );
        case "loading":
        default:
            return (
                <View>
                    <Button title="Against player" onPress={() => createGame()}>
                        New game?
                    </Button>
                    <Button
                        title="Against Skynet"
                        onPress={() => createGame(true)}
                    >
                        Join game
                    </Button>
                </View>
            );
    }
};

NewGameScreen.propTypes = {
    route: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};
export default NewGameScreen;
