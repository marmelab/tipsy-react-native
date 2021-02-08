import React, { useState } from "react";
import PlayerInputName from "./components/PlayerNameInput.jsx";
import Welcome from "./components/Welcome.jsx";


export default function MainScreen({ navigation }) {
  const [playerName, setPlayerName] = useState("");

  if (!playerName) {
    return <PlayerInputName setPlayerName={setPlayerName}></PlayerInputName>;
  }
  return <Welcome playerName={playerName} navigation={navigation}></Welcome>;
}
