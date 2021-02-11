import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import PropTypes from "prop-types";
import PendingGames from "./PendingGames.jsx";
import CONSTANTS from "../../const";
import gameApi from "../../api/GameApi.jsx";

const JoinGameScreen = ({ route, navigation }) => {
    const { playerName } = route.params;
    const [pendingGames, setPendingGames] = useState();
    const [error, setError] = useState();
    const [loadingPendingGamesState, setLoadingPendingGamesState] = useState(
        "pending"
    );
    useEffect(() => {
        const pendingGamesUpdate = setInterval(function () {
            if (loadingPendingGamesState === "pending") {
                setLoadingPendingGamesState("loading");
                gameApi
                    .pendingGames()
                    .then((data) => {
                        setPendingGames(data);
                        setLoadingPendingGamesState("loaded");
                    })
                    .catch((err) => {
                        setError(err);
                        setLoadingPendingGamesState("error");
                    });
            }
        }, 1000);
        return () => {
            clearInterval(pendingGamesUpdate);
        };
    }, [
        loadingPendingGamesState,
        setPendingGames,
        setLoadingPendingGamesState,
        setError,
    ]);

    const joinGame = (gameId) => {
        gameApi
            .joinGame(playerName, gameId)
            .then(() => {
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
                    <Text>{error.message}</Text>
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
