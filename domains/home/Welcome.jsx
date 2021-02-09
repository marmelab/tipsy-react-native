import React from "react";
import { Button, Text, View } from "react-native";
import PropTypes from "prop-types";

const Welcome = ({ playerName, navigation }) => {
    const noPendingGames = () => {};
    return (
        <View>
            <Text>Welcome {playerName}</Text>
            <Button
                title="New game"
                onPress={() => navigation.navigate("Game", { playerName })}
            >
                New game?
            </Button>
            <Button
                title="Join game"
                onPress={() => navigation.navigate("Game", { playerName })}
                disabled={noPendingGames()}
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
