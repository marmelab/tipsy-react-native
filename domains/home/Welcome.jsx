import React from "react";
import { Button, Text, View } from "react-native";
import PropTypes from "prop-types";

const Welcome = ({ playerName, navigation }) => {
    return (
        <View>
            <Text>Welcome {playerName}</Text>
            <Button
                title="New game"
                onPress={() => navigation.navigate("NewGame", { playerName })}
            >
                New game?
            </Button>
            <Button
                title="Join game"
                onPress={() => navigation.navigate("JoinGame", { playerName })}
            >
                Join game
            </Button>
        </View>
    );
};

Welcome.propTypes = {
    playerName: PropTypes.string,
    navigation: PropTypes.object,
};

export default Welcome;
