import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
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
            <Text>{playerName}</Text>
            <Text>
                Invitation link :{CONSTANTS.BASE_URL}/game/{gameId}/join
            </Text>
            <Text>Waiting for opponent</Text>
        </View>
    );
};

Waiting.propTypes = {
    playerName: PropTypes.string.isRequired,
    gameId: PropTypes.number.isRequired,
};
export default Waiting;
