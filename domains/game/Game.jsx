import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import CONSTANTS from "../../const";

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

    const tilt = (direction) => {
        direction;
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ playerName, direction }),
        };
        fetch(CONSTANTS.BASE_URL + "/game/" + game.id + "/tilt", requestOptions)
            .then(async (res) => {
                if (!res.ok) {
                    return Promise.reject(
                        new Error(
                            "error on requesting /game/" + game.id + "/tilt"
                        )
                    );
                }
            })
            .catch((error) => {
                setError(error);
            });
    };
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
                flexDirection: "row",
            }}
        >
            <TouchableOpacity
                style={styles.button}
                onPress={() => tilt("west")}
            >
                <Text>Left</Text>
            </TouchableOpacity>
            <View style={styles.board}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => tilt("north")}
                >
                    <Text>Up</Text>
                </TouchableOpacity>
                {boardObstacles.map((row, y) => {
                    return (
                        <View
                            key={"row" + y}
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {row.map((obstacle, x) => {
                                return (
                                    <View
                                        key={"cell" + x + y}
                                        style={{
                                            flex: 1,
                                            width: 20,
                                            height: 40,
                                            margin: 3,
                                            backgroundColor: obstacle
                                                ? "black"
                                                : "white",
                                        }}
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => tilt("south")}
                >
                    <Text>Down</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => tilt("east")}
            >
                <Text>Right</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        width: 10,
        height: 10,
        backgroundColor: "white",
    },
    board: {
        width: 330,
        height: 330,
        backgroundColor: "steelblue",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

Game.propTypes = {
    game: PropTypes.object.isRequired,
    playerName: PropTypes.string.isRequired,
};

export default Game;
