import React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";

import AppText from "../AppText";

import defaultStyles from "../../config/styles";

const Notice = ({ text }) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>{text}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.danger,
    height: 40,
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
