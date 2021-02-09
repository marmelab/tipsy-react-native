import React from "react";
import { FlatList, TouchableOpacity, Text, View } from "react-native";
import PropTypes from "prop-types";

const PendingGame = ({ item }) => {
    return (
        <TouchableOpacity>
            <Text>Game {item.id}</Text>
        </TouchableOpacity>
    );
};
PendingGame.propTypes = {
    item: PropTypes.object,
    joinGame: PropTypes.func,
};

const PendingGames = ({ pendingGames }) => {
    const renderPendingGame = ({ item }) => <PendingGame item={item} />;
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
