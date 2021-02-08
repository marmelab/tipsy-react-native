import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { MainScreen } from "./views/main/main";

const backgroundColor = "#fff";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    // To avoid overlapping status bar on android : https://stackoverflow.com/questions/51289587/react-native-how-to-use-safeareaview-for-android-notch-devices/55017347
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
export default function App() {
  return (
    <View style={styles.container}>
      <MainScreen></MainScreen>
    </View>
  );
}
