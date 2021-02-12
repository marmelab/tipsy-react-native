import React from "react";
import { Pressable, Button, Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const PendingGame = ({ pendingGame, joinGame }) => {
    const waitingPlayer = pendingGame.players.find((player) => player.name)
        .name;
    return (
        <Pressable
            title="Pending Game"
            onPress={() => joinGame(pendingGame.id)}
        >
            <Text style={styles.goButton}>{waitingPlayer} is waiting...</Text>
        </Pressable>
    );
};
PendingGame.propTypes = {
    pendingGame: PropTypes.object,
    joinGame: PropTypes.func,
    playerName: PropTypes.string,
};
const PendingGames = ({ pendingGames, joinGame }) => {
    const renderPendingGame = (pendingGame) => (
        <PendingGame pendingGame={pendingGame} joinGame={joinGame} />
    );
    return (
        <View style={styles.container}>
            <Text style={styles.title} adjustsFontSizeToFit={true}>
                Pending Games
            </Text>
            {pendingGames.map((pendingGame) => renderPendingGame(pendingGame))}
        </View>
    );
};

PendingGames.propTypes = {
    pendingGames: PropTypes.array,
    joinGame: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        alignContent: "flex-start",
        backgroundColor: "steelblue",
        paddingTop: 50,
        color: "white",
    },
    loading: {
        fontSize: 30,
        fontFamily: "Lobster",
        color: "white",
    },
    goButton: {
        textAlign: "center",
        fontFamily: "Lobster",
        fontSize: 25,
        width: 300,
        margin: 10,
        color: "steelblue",
        backgroundColor: "white",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontFamily: "Lobster",
        fontSize: 40,
        color: "white",
        marginBottom: 20,
    },
});

export default PendingGames;
