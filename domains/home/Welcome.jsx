import React from "react";
import { Button, Text, View } from "react-native";
import PropTypes from "prop-types";



createGame = (playerName, navigation) => {
    navigation.navigate('Game', { playerName })
}
export default Welcome = (props) => {
    return (
        <View>
            <Text>Welcome {props.playerName}</Text>
            <Button title="New game" onPress={() => createGame(props.playerName, props.navigation)}>New game?</Button>
            <Button title="Join game">Join game</Button>
        </View>
    );
}

Welcome.propTypes = {
    playerName: PropTypes.string,
    navigation: PropTypes.object
};
