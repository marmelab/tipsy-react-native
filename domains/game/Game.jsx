import React, { useState, useCallback, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import GameStatus from "./GameStatus.jsx";
import PropTypes from "prop-types";
import CONSTANTS from "../../const";
import BotApi from "./BotApi.jsx";

const boardObstacles = [
    [false, false, false, true, false, false, false],
    [false, true, false, false, false, true, false],
    [false, false, true, false, true, false, false],
    [true, false, false, false, false, false, true],
    [false, false, true, false, true, false, false],
    [false, true, false, false, false, true, false],
    [false, false, false, true, false, false, false],
];

const Puck = ({ x, y, pucks }) => {
    const foundPuck = pucks.find(
        (puck) => puck.position.x === x && puck.position.y === y
    );
    if (foundPuck) {
        return (
            <View
                style={{
                    borderRadius: 50,
                    flex: 1,
                    backgroundColor: foundPuck.color,
                }}
            ></View>
        );
    }
    return null;
};
Puck.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    pucks: PropTypes.array.isRequired,
};

const Game = ({ playerName, game }) => {
    const [error, setError] = useState();
    const [tiltState, setTiltState] = useState();
    const [replaceState, setReplaceState] = useState();
    const [botState, setBotState] = useState();
    const currentPlayerColor = game.players.find((player) => player.current)
        .color;
    const replace = useCallback(() => {
        if (replaceState === "loading") {
            return;
        }
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        };
        setReplaceState("loading");
        fetch(
            CONSTANTS.BASE_URL + "/game/" + game.id + "/replace",
            requestOptions
        )
            .then(async (res) => {
                if (!res.ok) {
                    return Promise.reject(
                        new Error(
                            "error on requesting /game/" + game.id + "/replace"
                        )
                    );
                }
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setReplaceState("pending");
            });
    }, [replaceState, setReplaceState, game.id, error, setError]);

    const tilt = useCallback(
        (direction) => {
            if (tiltState === "loading") {
                return;
            }
            setTiltState("loading");
            BotApi.tilt(direction, playerName, game.id)
                .catch((error) => {
                    setError(error);
                })
                .finally(() => {
                    setTiltState("pending");
                });
        },
        [tiltState, game.id, playerName, error, setTiltState, setError]
    );

    useEffect(() => {
        if (game.currentPlayer == "bot" && botState != "loading") {
            setBotState("loading");
            BotApi.getBestMove(game)
                .then(([firstMove, secondMove]) => {
                    return BotApi.tilt(
                        CONSTANTS.moves[firstMove],
                        "bot",
                        game.id
                    ).then(() => secondMove);
                })
                .then(async (secondMove) => {
                    await setTimeout(() => {
                        return BotApi.tilt(
                            CONSTANTS.moves[secondMove],
                            "bot",
                            game.id
                        );
                    }, 2000);
                })
                .catch((err) => {
                    setError(err);
                })
                .finally(() => {
                    setBotState("pending");
                });
        }
    }, [game.currentPlayer, setBotState, botState]);
    if (error) {
        return (
            <View>
                <Text>{error.message}</Text>
            </View>
        );
    }
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <GameStatus game={game} playerName={playerName}></GameStatus>
            <View
                style={
                    currentPlayerColor == "red"
                        ? styles.gameRed
                        : styles.gameBlue
                }
            >
                {game.currentPlayer == playerName && game.remainingTurns > 0 ? (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => tilt("west")}
                    >
                        <Text>Left</Text>
                    </TouchableOpacity>
                ) : null}
                <View style={styles.board}>
                    {game.currentPlayer == playerName &&
                    game.remainingTurns > 0 ? (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => tilt("north")}
                        >
                            <Text>Up</Text>
                        </TouchableOpacity>
                    ) : null}
                    {boardObstacles.map((row, y) => {
                        return (
                            <View key={"row" + y} style={styles.row}>
                                {row.map((obstacle, x) => {
                                    return (
                                        <View
                                            key={"cell" + x + y}
                                            style={
                                                obstacle
                                                    ? styles.obstacle
                                                    : styles.cell
                                            }
                                        >
                                            <Puck
                                                x={x}
                                                y={y}
                                                pucks={game.pucks}
                                            ></Puck>
                                        </View>
                                    );
                                })}
                            </View>
                        );
                    })}
                    {game.currentPlayer == playerName &&
                    game.remainingTurns > 0 ? (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => tilt("south")}
                        >
                            <Text>Down</Text>
                        </TouchableOpacity>
                    ) : null}
                </View>

                {game.currentPlayer == playerName && game.remainingTurns > 0 ? (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => tilt("east")}
                    >
                        <Text>Right</Text>
                    </TouchableOpacity>
                ) : null}
            </View>
            {game.remainingTurns == 0 &&
            (game.fallenPucks[0] > 0 || game.fallenPucks[1] > 0) ? (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => replace()}
                >
                    <Text>Replace pucks</Text>
                </TouchableOpacity>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        width: 20,
        height: 40,
        margin: 3,
        backgroundColor: "white",
    },
    obstacle: {
        flex: 1,
        width: 20,
        height: 40,
        margin: 3,
        backgroundColor: "black",
    },
    row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    board: {
        width: 330,
        height: 330,
        backgroundColor: "steelblue",
    },
    gameBlue: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "lightseagreen",
    },
    gameRed: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "lightsalmon",
    },
});

Game.propTypes = {
    game: PropTypes.object.isRequired,
    playerName: PropTypes.string.isRequired,
};

export default Game;
