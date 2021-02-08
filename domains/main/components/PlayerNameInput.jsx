import { Button, TextInput, View } from "react-native";
import React, { useState } from "react";
import PropTypes from "prop-types";

export default function PlayerInputName(props) {
  const [playerName, updatePlayerName] = useState("");
  function setPlayerName() {
    props.setPlayerName(playerName);
  }
  return (
    <View>
      <TextInput
        placeholder="Player name"
        onChangeText={updatePlayerName}
      ></TextInput>
      <Button title="setName" disabled={!playerName} onPress={setPlayerName}>
        Validate
      </Button>
    </View>
  );
}
PlayerInputName.propTypes = {
  setPlayerName: PropTypes.func,
};
