import React from "react";
import { Button, Text, View } from "react-native";
import PropTypes from "prop-types";



export default Welcome = ({playerName, navigation}) => {
    return (
        <View>
            <Text>Welcome {playerName}</Text>
            <Button title="New game" onPress={() => navigation.navigate('Game', { playerName })}>New game?</Button>
            <Button title="Join game">Join game</Button>
        </View>
    );
}

Welcome.propTypes = {
    playerName: PropTypes.string,
    navigation: PropTypes.object
};
