import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const Game = ({ playerName, game }) => {
    return (
        <View>
            <Text>New Game</Text>
            {game.players.map((player) => {
                if (playerName === player.name) {
                    return (
                        <Text key={player.name}>
                            {player.name} You are playing
                        </Text>
                    );
                }
                return <Text key={player.name}>{player.name} Is waiting</Text>;
            })}
        </View>
    );
};

Game.propTypes = {
    game: PropTypes.object.isRequired,
    playerName: PropTypes.string.isRequired,
};

export default Game;
