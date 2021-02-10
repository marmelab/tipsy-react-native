import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const Game = ({ playerName, game }) => {
    return (
        <View>
            <Text>
                Game {game.id}, you are {playerName}
            </Text>
            {game.players.map((player) => {
                return (
                    <Text key={playerName}>
                        {`${playerName} is ${
                            player.current ? "playing" : "waiting"
                        }`}
                    </Text>
                );
            })}
        </View>
    );
};

Game.propTypes = {
    game: PropTypes.object.isRequired,
    playerName: PropTypes.string.isRequired,
};

export default Game;
