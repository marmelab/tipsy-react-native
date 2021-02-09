import React, { useEffect, useState } from "react";
import { ActivityIndicator, TextInput, View } from "react-native";
import PropTypes from "prop-types";
import Game from "./Game.jsx";

const NewGameScreen = ({ route }) => {
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
            fetch(
                "http://ec2-3-250-16-46.eu-west-1.compute.amazonaws.com:8080/game",
                requestOptions
            )
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
                    <TextInput>{{ error }}</TextInput>
                </View>
            );
        case "loaded":
            return <Game playerName={playerName} game={game}></Game>;
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
};

export default NewGameScreen;
