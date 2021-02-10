import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const Game = ({ playerName, game }) => {
    const renderCurrentPlayer = (playerName) => {
        return <Text key={playerName}>{playerName} is playing</Text>;
    };

    const renderWaitingPlayer = (playerName) => {
        return <Text key={playerName}>{playerName} is waiting</Text>;
    };

    return (
        <View>
            <Text>
                Game {game.id}, you are {playerName}
            </Text>
            {game.players.map((player) => {
                if (player.current) {
                    return renderCurrentPlayer(player.name);
                } else {
                    return renderWaitingPlayer(player.name);
                }
            })}
        </View>
    );
};

Game.propTypes = {
    game: PropTypes.object.isRequired,
    playerName: PropTypes.string.isRequired,
};

export default Game;
