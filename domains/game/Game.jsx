import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Pressable,
    Image,
} from "react-native";
import GameStatus from "./GameStatus.jsx";
import PropTypes from "prop-types";
import CONSTANTS from "../../const";
import gameApi from "../../api/GameApi.jsx";

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
    const getColorStyle = (color) => {
        switch (color) {
            case "black":
                return styles.black;
            case "blue":
                return styles.blue;
            case "red":
                return styles.red;
        }
    };
    if (foundPuck) {
        return (
            <View
                style={[
                    styles.puck,
                    foundPuck.flipped ? styles.flipped : null,
                    getColorStyle(foundPuck.color),
                ]}
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

const delay = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const boardImage = { uri: "./board.webp" };

const Game = ({ playerName, game }) => {
    const [error, setError] = useState();
    const [tiltState, setTiltState] = useState();
    const [replaceState, setReplaceState] = useState();
    const [botState, setBotState] = useState();
    const [bestMove, setBestMove] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    const replace = useCallback(() => {
        if (replaceState === "loading") {
            return;
        }
        setReplaceState("loading");
        gameApi
            .replace(game.id)
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setReplaceState("pending");
            });
    }, [replaceState, setReplaceState, game.id, error, setError]);

    const showAdvice = useCallback(() => {
        gameApi.getBestMove(game).then((bestMove) => {
            setBestMove(bestMove);
        });
        setModalVisible(true);
    }, [setBestMove, setModalVisible]);

    const closeAdvice = useCallback(() => {
        setBestMove();
        setModalVisible(!modalVisible);
    }, [setBestMove, setModalVisible, modalVisible]);

    const tilt = useCallback(
        (direction) => {
            if (tiltState === "loading") {
                return;
            }
            setTiltState("loading");
            gameApi
                .tilt(direction, playerName, game.id)
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
            gameApi
                .getBestMove(game)
                .then(async ([firstMove, secondMove]) => {
                    await delay(3000);
                    await gameApi.tilt(
                        CONSTANTS.moves[firstMove],
                        "bot",
                        game.id
                    );
                    await delay(3000);
                    await gameApi.tilt(
                        CONSTANTS.moves[secondMove],
                        "bot",
                        game.id
                    );
                    await delay(2000);
                })
                .then(() => {
                    setBotState("pending");
                })
                .catch((err) => {
                    setError(err);
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
            style={[
                {
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                },
            ]}
        >
            <Text>{botState}</Text>
            <GameStatus game={game} playerName={playerName}></GameStatus>
            <View style={styles.game}>
                {game.currentPlayer == playerName && game.remainingTurns > 0 ? (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => tilt("west")}
                    >
                        <Text
                            style={{
                                paddingTop: 150,
                                height: 300,
                            }}
                        >
                            ◄
                        </Text>
                    </TouchableOpacity>
                ) : null}
                <View source={boardImage} style={styles.board}>
                    <Image
                        source={require("./img/board.webp")}
                        style={{
                            width: 335,
                            height: 320,
                            position: "absolute",
                            right: -20,
                            top: -20,
                        }}
                    />
                    {game.currentPlayer == playerName &&
                    game.remainingTurns > 0 ? (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => tilt("north")}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    paddingBottom: 50,
                                    marginTop: -60,
                                }}
                            >
                                ▲
                            </Text>
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
                            <Text
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                ▼
                            </Text>
                        </TouchableOpacity>
                    ) : null}
                </View>

                {game.currentPlayer == playerName && game.remainingTurns > 0 ? (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => tilt("east")}
                    >
                        <Text
                            style={{
                                paddingTop: 150,
                                height: 300,
                            }}
                        >
                            ►
                        </Text>
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
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={closeAdvice}
                    >
                        <Text>
                            {bestMove
                                ? `First ${bestMove[0]} then ${bestMove[1]}`
                                : "Bot is thinking about the best move..."}
                        </Text>
                    </Pressable>
                </View>
            </Modal>
            {game.currentPlayer == playerName && game.remainingTurns > 0 ? (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        zIndex: 999,
                        backgroundColor: "white",
                    }}
                    onPress={showAdvice}
                >
                    <View>
                        <Text>Hint</Text>
                    </View>
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
        alignItems: "center",
        alignContent: "center",
    },
    obstacle: {
        flex: 1,
        width: 20,
        height: 40,
        margin: 3,
    },
    row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    board: {
        width: 300,
        height: 300,
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: "steelblue",
    },
    game: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    puck: {
        width: 32,
        height: 32,
        borderRadius: 50,
    },
    flipped: {
        borderWidth: 5,
        borderColor: "grey",
    },
    red: {
        backgroundColor: "lightsalmon",
    },
    blue: {
        backgroundColor: "steelblue",
    },
    black: {
        backgroundColor: "black",
    },
    loading: {
        fontSize: 30,
        fontFamily: "Lobster",
        color: "white",
    },
});

Game.propTypes = {
    game: PropTypes.object.isRequired,
    playerName: PropTypes.string.isRequired,
};

export default Game;
