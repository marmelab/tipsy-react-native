import React, { useState } from "react";
import { TextInput, View } from "react-native";

export default function GameScreen({ navigation, route }) {

    return (
        <View>
            <TextInput>{route.params.playerName}</TextInput>
            <TextInput>Waiting for opponent</TextInput>
        </View>)
}
