import React, { useState } from "react";
import PlayerInputName from "./PlayerNameInput.jsx";
import Welcome from "./Welcome.jsx";


export default MainScreen = ({ navigation }) => {
    const [playerName, setPlayerName] = useState("");

    if (!playerName) {
        return <PlayerInputName setPlayerName={setPlayerName}></PlayerInputName>;
    }
    return <Welcome playerName={playerName} navigation={navigation}></Welcome>;
}
