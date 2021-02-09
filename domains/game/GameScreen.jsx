import React, { useEffect, useState } from "react";
import { ActivityIndicator, TextInput, View } from "react-native";
import PropTypes from "prop-types";

const GameScreen = ({ route }) => {
    const [playerName, setPlayerName] = useState("");
    const [game, setGame] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setPlayerName(route.params.playerName);
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ playerName }),
        };
        fetch(
            "http://ec2-3-250-16-46.eu-west-1.compute.amazonaws.com:8080/game",
            requestOptions
        ).then((res) => {
            setIsLoaded(true);
            setGame(res);
        });
    }, [playerName, route.params.playerName]);
    if (!isLoaded) {
        return <ActivityIndicator size="large" />;
    }
    return (
        <View>
            <TextInput>{playerName}</TextInput>
            <TextInput>Game : {game.id}</TextInput>
            <TextInput>
                Link to join :
                http://ec2-3-250-16-46.eu-west-1.compute.amazonaws.com:8080/game/
                {game.id}/join
            </TextInput>
            <TextInput>Waiting for opponent</TextInput>
        </View>
    );
};

GameScreen.propTypes = {
    route: PropTypes.object.isRequired,
};

export default GameScreen;
