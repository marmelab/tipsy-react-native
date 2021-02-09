import React, { useState } from "react";
import PlayerInputName from "./PlayerNameInput.jsx";
import Welcome from "./Welcome.jsx";
import PropTypes from "prop-types";

const MainScreen = ({ navigation }) => {
    const [playerName, setPlayerName] = useState("");

    if (!playerName) {
        return (
            <PlayerInputName setPlayerName={setPlayerName}></PlayerInputName>
        );
    }
    return <Welcome playerName={playerName} navigation={navigation}></Welcome>;
};
MainScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};
export default MainScreen;
