import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const GameStatus = ({ game, playerName }) => {
    return (
        <View>
            <Text>
                {playerName == game.currentPlayer
                    ? "Your turn!"
                    : game.currentPlayer + " turn!"}
            </Text>
        </View>
    );
};
GameStatus.propTypes = {
    game: PropTypes.object.isRequired,
    playerName: PropTypes.string.isRequired,
};

export default GameStatus;
