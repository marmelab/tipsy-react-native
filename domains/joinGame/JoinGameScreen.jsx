import React, { useEffect, useState } from "react";
import { ActivityIndicator, TextInput, View } from "react-native";
import PropTypes from "prop-types";
import PendingGames from "./PendingGames.jsx";

const JoinGameScreen = ({ playerName }) => {
    const [pendingGames, setPendingGames] = useState();
    const [error, setError] = useState();
    const [loadingPendingGamesState, setLoadingPendingGamesState] = useState(
        "pending"
    );
    useEffect(() => {
        if (loadingPendingGamesState === "pending") {
            setLoadingPendingGamesState("loading");
            fetch(
                "http://ec2-3-250-16-46.eu-west-1.compute.amazonaws.com:8080/game/pending"
            )
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
    switch (loadingPendingGamesState) {
        case "error":
            return (
                <View>
                    <TextInput>{{ error }}</TextInput>
                </View>
            );
        case "loaded":
            return (
                <View>
                    <PendingGames pendingGames={pendingGames}></PendingGames>
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
    playerName: PropTypes.string,
};
export default JoinGameScreen;
