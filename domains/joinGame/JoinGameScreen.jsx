import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import PropTypes from "prop-types";
import PendingGames from "./PendingGames.jsx";
import CONSTANTS from "../../const";

const JoinGameScreen = ({ route, navigation }) => {
    const { playerName } = route.params;
    const [pendingGames, setPendingGames] = useState();
    const [error, setError] = useState();
    const [loadingPendingGamesState, setLoadingPendingGamesState] = useState(
        "pending"
    );
    useEffect(() => {
        if (loadingPendingGamesState === "pending") {
            setLoadingPendingGamesState("loading");
            fetch(CONSTANTS.BASE_URL + "/game/pending")
                .then(async (res) => {
                    const data = await res.json();
                    if (!res.ok) {
                        const error = (data && data.message) || res.status;
                        return Promise.reject(error);
                    }
                    setPendingGames(data);
                    setLoadingPendingGamesState("loaded");
                })
                .catch((err) => {
                    setError(err);
                    setLoadingPendingGamesState("error");
                });
        }
    }, [
        loadingPendingGamesState,
        setPendingGames,
        setLoadingPendingGamesState,
        setError,
    ]);

    const joinGame = (gameId) => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ playerName }),
        };
        fetch(CONSTANTS.BASE_URL + "/game/" + gameId + "/join", requestOptions)
            .then(async (res) => {
                if (!res.ok) {
                    return Promise.reject("une erreur!");
                }
                return navigation.navigate("Game", { playerName, gameId });
            })
            .catch((error) => {
                setError(error);
                setLoadingPendingGamesState("error");
            });
    };

    switch (loadingPendingGamesState) {
        case "error":
            return (
                <View>
                    <Text>error.message</Text>
                </View>
            );
        case "loaded":
            return (
                <View>
                    <PendingGames
                        pendingGames={pendingGames}
                        playersName={playerName}
                        joinGame={joinGame}
                    ></PendingGames>
                </View>
            );
        default:
            return (
                <View>
                    <ActivityIndicator size="large" />
                </View>
            );
    }
};

JoinGameScreen.propTypes = {
    route: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};
export default JoinGameScreen;
