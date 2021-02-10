import React, { useState } from "react";
import PlayerInputName from "./PlayerNameInput.jsx";
import Welcome from "./Welcome.jsx";

const MainScreen = () => {
    const [playerName, setPlayerName] = useState("");

    if (!playerName) {
        return (
            <PlayerInputName setPlayerName={setPlayerName}></PlayerInputName>
        );
    }
    return <Welcome playerName={playerName}></Welcome>;
};
export default MainScreen;
