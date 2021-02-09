import { Button, TextInput, View } from "react-native";
import React, { useState } from "react";
import PropTypes from "prop-types";

export default PlayerInputName = ({ setPlayerName }) => {
    const [playerName, updatePlayerName] = useState("");

    return (
        <View>
            <TextInput
                placeholder="Player name"
                onChangeText={updatePlayerName}
            ></TextInput>
            <Button title="setName" disabled={!playerName} onPress={() => setPlayerName(playerName)}>
                Validate
            </Button>
        </View>
    );
}
PlayerInputName.propTypes = {
    setPlayerName: PropTypes.func,
};
