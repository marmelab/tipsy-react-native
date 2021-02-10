import React from "react";
import { Button, Text, View, StyleSheet, Platform } from "react-native";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";

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
const Welcome = ({ playerName }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
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
};

export default Welcome;
