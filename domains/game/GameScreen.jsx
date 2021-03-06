import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import PropTypes from "prop-types";
import Game from "./Game.jsx";
import Waiting from "./Waiting.jsx";
import gameApi from "../../api/GameApi.jsx";

const isGameFull = (game) => {
    for (const player of game.players) {
        if (!player.name) {
            return false;
        }
    }
    return true;
};

const GameScreen = ({ route }) => {
    const { playerName, gameId } = route.params;
    const [gameState, setGameState] = useState("pending");
    const [error, setError] = useState();
    const [game, setGame] = useState();

    useEffect(() => {
        if (gameState === "pending") {
            setGameState("loading");
            gameApi
                .getGame(gameId)
                .then((data) => {
                    setGame(data);
                    setGameState("loaded");
                })
                .catch((err) => {
                    setError(err);
                    setGameState("error");
                });
        }
    }, [gameState, setGameState, setError, setGame]);
    useEffect(() => {
        const updateGame = setInterval(function () {
            if (gameState === "loaded") {
                gameApi
                    .getGame(gameId)
                    .then((data) => {
                        setGame(data);
                        setGameState("loaded");
                    })
                    .catch((err) => {
                        setError(err);
                        setGameState("error");
                    });
            }
        }, 1000);

        return () => {
            clearInterval(updateGame);
        };
    }, [gameState, setGameState, setError, setGame]);

    switch (gameState) {
        case "loaded":
            if (isGameFull(game)) {
                return <Game playerName={playerName} game={game}></Game>;
            }
            return <Waiting playerName={playerName} gameId={game.id}></Waiting>;
        case "error":
            return (
                <View>
                    <Text>{error}</Text>
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

GameScreen.propTypes = {
    route: PropTypes.object.isRequired,
};
export default GameScreen;
