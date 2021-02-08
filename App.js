import React from 'react'
import { Platform, SafeAreaView, StyleSheet } from 'react-native'
import { MainScreen } from './views/main/main'

export default function App () {
  return (<SafeAreaView style={styles.container}>
    <MainScreen></MainScreen>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // To avoid overlapping status bar on android : https://stackoverflow.com/questions/51289587/react-native-how-to-use-safeareaview-for-android-notch-devices/55017347
    paddingTop: Platform.OS === 'android' ? 25 : 0
  }
})
