import React, { useState, useCallback } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const GameStatus = ({ game, playerName }) => {
    return (
        <View>
            <Text>You are {playerName}</Text>
        </View>
    );
};
GameStatus.propTypes = {
    game: PropTypes.object.isRequired,
    playerName: PropTypes.string.isRequired,
};

export default GameStatus;
