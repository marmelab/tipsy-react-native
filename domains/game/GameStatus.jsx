import React, { useMemo } from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const GameStatus = ({ game, playerName }) => {
    const currentPlayerColor = useMemo(() => {
        return game.players.find((player) => player.current).color;
    }, [game.players]);
    const getColorStyle = () => {
        switch (currentPlayerColor) {
            case "blue":
                return styles.blue;
            case "red":
                return styles.red;
        }
    };
    console.dir(game);
    return (
        <View style={styles.container}>
            <Text style={[styles.text, getColorStyle()]}>
                {playerName == game.currentPlayer
                    ? "Your turn!"
                    : game.currentPlayer + " turn!"}
            </Text>
            <Text style={[styles.text, getColorStyle()]}>
                {game.remainingTurns}
            </Text>
        </View>
    );
};
GameStatus.propTypes = {
    game: PropTypes.object.isRequired,
    playerName: PropTypes.string.isRequired,
};
const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        height: 30,
        alignItems: "center",
        alignContent: "center",
        color: "white",
    },
    text: {
        fontFamily: "Lobster",
        fontSize: 35,
    },
    red: {
        color: "lightsalmon",
    },
    blue: {
        color: "steelblue",
    },
    loading: {
        fontSize: 30,
        fontFamily: "Lobster",
        color: "white",
    },
});
export default GameStatus;
