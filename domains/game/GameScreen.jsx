import React, { useEffect, useState } from "react";
import { ActivityIndicator, TextInput, View } from "react-native";
import PropTypes from "prop-types";
import Game from "./Game.jsx";

const GameScreen = ({ route }) => {
    const [game, setGame] = useState();
    const [error, setError] = useState();
    const [loadingState, setLoadingState] = useState("loading");
    const { playerName } = route.params;
    useEffect(() => {
        if (!game) {
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
                    setLoadingState("loaded");
                })
                .catch((err) => {
                    setError(err);
                    setLoadingState("error");
                });
        }
    }, [playerName, game]);

    switch (loadingState) {
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

GameScreen.propTypes = {
    route: PropTypes.object.isRequired,
};

export default GameScreen;
