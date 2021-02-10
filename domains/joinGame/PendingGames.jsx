import React from "react";
import { FlatList, Button, Text, View } from "react-native";
import PropTypes from "prop-types";

const PendingGame = ({ item, joinGame }) => {
    return (
        <Button title="Pending Game" onPress={() => joinGame(item.id)}>
            <Text>Game {item.id}</Text>
        </Button>
    );
};
PendingGame.propTypes = {
    item: PropTypes.object,
    joinGame: PropTypes.func,
    playerName: PropTypes.string,
};
const PendingGames = ({ pendingGames, joinGame }) => {
    const renderPendingGame = ({ item }) => (
        <PendingGame item={item} joinGame={joinGame} />
    );
    return (
        <View>
            <FlatList
                data={pendingGames}
                renderItem={renderPendingGame}
                keyExtractor={(pendingGame) => pendingGame.id}
            />
        </View>
    );
};

export default PendingGames;

PendingGames.propTypes = {
    pendingGames: PropTypes.array,
    joinGame: PropTypes.func,
};
