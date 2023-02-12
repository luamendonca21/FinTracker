import React from "react";
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Constants from "expo-constants";
import defaultStyles from "../config/styles";
const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
