import React from "react";
import { Button, Text, View } from "react-native";
import PropTypes from "prop-types";

export default function Welcome(props) {
  return (
    <View>
      <Text>Welcome {props.playerName}</Text>
      <Button title="newGame">New game?</Button>
      <Button title="joinGame">Join game</Button>
    </View>
  );
}

Welcome.propTypes = {
  playerName: PropTypes.string,
};
