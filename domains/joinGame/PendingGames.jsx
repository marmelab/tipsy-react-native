import React from "react";
import { FlatList, TouchableOpacity, Text, View } from "react-native";
import PropTypes from "prop-types";

const PendingGames = ({ pendingGames }) => {
    const renderPendingGame = ({ item }) => (
        <TouchableOpacity>
            <Text>Game {item.id}</Text>
        </TouchableOpacity>
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
    playerName: PropTypes.string,
    pendingGames: PropTypes.number,
};
