import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const obstacles = [
    { x: 0, y: 3 },
    { x: 1, y: 1 },
    { x: 1, y: 5 },
    { x: 2, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 0 },
    { x: 3, y: 6 },
    { x: 4, y: 2 },
    { x: 4, y: 4 },
    { x: 5, y: 1 },
    { x: 5, y: 5 },
    { x: 6, y: 3 },
];

const Game = ({ playerName, game }) => {
    const renderRow = (rowIndex) => {
        const cells = [];
        for (let index = 0; index < 7; index++) {
            const isObstacle = obstacles.some((obstacle) => {
                return obstacle.x === index && obstacle.y === rowIndex;
            });
            let color = "white";
            if (isObstacle) {
                color = "black";
            }
            cells.push(
                <View
                    style={{
                        flex: 1,
                        width: 10,
                        height: 45,
                        margin: 3,
                        backgroundColor: color,
                    }}
                ></View>
            );
        }
        return cells;
    };
    const renderBoard = () => {
        const rows = [];
        for (let index = 0; index < 7; index++) {
            rows.push(
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {renderRow(index)}
                </View>
            );
        }
        return rows;
    };
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>
                Game {game.id}, you are {playerName}
            </Text>
            {game.players.map((player) => {
                return (
                    <Text key={player.name}>
                        {`${player.name} is ${
                            player.current ? "playing" : "waiting"
                        }`}
                    </Text>
                );
            })}
            <View style={styles.board}>{renderBoard()}</View>
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
        width: 350,
        height: 350,
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
