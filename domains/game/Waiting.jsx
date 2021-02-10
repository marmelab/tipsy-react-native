import React from "react";
import { TextInput, View, StyleSheet, Platform } from "react-native";
import CONSTANTS from "../../const";
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

const Waiting = ({ playerName, gameId }) => {
    return (
        <View style={styles.container}>
            <TextInput>{playerName}</TextInput>
            <TextInput>
                Invitation link :{CONSTANTS.BASE_URL}/game/{gameId}/join
            </TextInput>
            <TextInput>Waiting for opponent</TextInput>
        </View>
    );
};

Waiting.propTypes = {
    playerName: PropTypes.string,
    gameId: PropTypes.number,
};
export default Waiting;
