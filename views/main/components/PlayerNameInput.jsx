import { Button, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function PlayerInputName (props) {
  const [playerName, setPlayerName] = useState('')
  return (
        <View>
            <TextInput placeholder='Player name' onChangeText={(value) => setPlayerName(value)}></TextInput>
            <Button title='setName' disabled={!playerName} onPress={() => props.setPlayerName(playerName)}>Validate</Button>
        </View>)
}
PlayerInputName.propTypes = {
  setPlayerName: PropTypes.func
}
