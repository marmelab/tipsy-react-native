import { Button, TextInput, View, StyleSheet, Platform } from "react-native";
import React, { useState } from "react";
import PropTypes from "prop-types";

const backgroundColor = "#fff";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        // To avoid overlapping status bar on android : https://stackoverflow.com/questions/51289587/react-native-how-to-use-safeareaview-for-android-notch-devices/55017347
        paddingTop: Platform.OS === "android" ? 25 : 0,
    },
});

const PlayerInputName = ({ setPlayerName }) => {
    const [playerName, updatePlayerName] = useState("");

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Player name"
                onChangeText={updatePlayerName}
            ></TextInput>
            <Button
                title="setName"
                disabled={!playerName}
                onPress={() => setPlayerName(playerName)}
            >
                Validate
            </Button>
        </View>
    );
};
PlayerInputName.propTypes = {
    setPlayerName: PropTypes.func,
};
export default PlayerInputName;
