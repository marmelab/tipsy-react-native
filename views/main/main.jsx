
import React, { useState } from 'react'
import PlayerInputName from './components/PlayerNameInput'
import Welcome from './components/Welcome'

export function MainScreen () {
  //   const playerNameInput = useRef(null)
  const [playerName, setPlayerName] = useState('')

  if (!playerName) {
    return (
      <PlayerInputName setPlayerName={setPlayerName}></PlayerInputName>
    )
  } else {
    return (
      <Welcome playerName={playerName}></Welcome>)
  }
}
