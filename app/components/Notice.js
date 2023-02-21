import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import defaultStyles from "../config/styles";

import Constants from "expo-constants";

const Notice = ({ text }) => {
  return (
    text && (
      <View style={styles.container}>
        <AppText style={styles.text}>{text}</AppText>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.danger,
    height: 50,
    width: "95%",
    alignSelf: "center",
    borderRadius: 15,
    position: "absolute",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
    top: 10 + Constants.statusBarHeight,
  },
  text: {
    color: defaultStyles.colors.white,
  },
});

export default Notice;
