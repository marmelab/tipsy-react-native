import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import PropTypes from "prop-types";
import CONSTANTS from "../../const";

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
    useEffect(() => {
        if (gameState === "pending") {
            setGameState("loading");
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ playerName }),
            };
            fetch(CONSTANTS.BASE_URL + "/game", requestOptions)
                .then(async (res) => {
                    const data = await res.json();
                    if (!res.ok) {
                        const error = (data && data.message) || res.status;
                        return Promise.reject(error);
                    }
                    setGame(data);
                    setGameState("loaded");
                })
                .catch((err) => {
                    setError(err);
                    setGameState("error");
                });
        }
    }, [playerName, game]);

    switch (gameState) {
        case "error":
            return (
                <View>
                    <Text>{error.message}</Text>
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
        default:
            return (
                <View>
                    <ActivityIndicator size="large" />
                </View>
            );
    }
};

NewGameScreen.propTypes = {
    route: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};
export default NewGameScreen;
