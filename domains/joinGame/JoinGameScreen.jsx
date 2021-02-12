import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import PendingGames from "./PendingGames.jsx";
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
                navigation.navigate("Game", { playerName, gameId });
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
                <View style={styles.container}>
                    <PendingGames
                        pendingGames={pendingGames}
                        playersName={playerName}
                        joinGame={joinGame}
                    ></PendingGames>
                </View>
            );
        default:
            return (
                <View style={styles.container}>
                    <Text style={styles.loading}>Loading pending games...</Text>
                </View>
            );
    }
};

JoinGameScreen.propTypes = {
    route: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "steelblue",
        color: "white",
    },
    loading: {
        fontSize: 30,
        fontFamily: "Lobster",
        color: "white",
    },
});
export default JoinGameScreen;
