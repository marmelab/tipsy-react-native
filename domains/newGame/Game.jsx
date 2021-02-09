import React from "react";
import { TextInput, View } from "react-native";
import PropTypes from "prop-types";

const Game = ({ game, playerName }) => {
    return (
        <View>
            <TextInput>{playerName}</TextInput>
            <TextInput>Game : {game.id}</TextInput>
            <TextInput>
                Invitation link :
                http://ec2-3-250-16-46.eu-west-1.compute.amazonaws.com:8080/game/
                {game.id}/join
            </TextInput>
            <TextInput>Waiting for opponent</TextInput>
        </View>
    );
};

Game.propTypes = {
    game: PropTypes.object,
    playerName: PropTypes.string,
};

export default Game;
