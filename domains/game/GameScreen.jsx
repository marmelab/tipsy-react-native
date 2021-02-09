import React, { useEffect, useState } from "react";
import { ActivityIndicator, TextInput, View } from "react-native";

export default GameScreen = ({ navigation, route }) => {


    return (
        <View>
            <TextInput>{playerName}</TextInput>
            <TextInput>Waiting for opponent</TextInput>
        </View>
    );
}
