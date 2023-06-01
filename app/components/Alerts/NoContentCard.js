import React from "react";
import { View, StyleSheet } from "react-native";

import { AppText } from "../Text";

import defaultStyles from "../../config/styles";

const NoContentCard = ({ msg, style }) => {
  return (
    <View style={[styles.container, style]}>
      <AppText style={styles.text}>{msg}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "99%",
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 15,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
  },
  text: { fontSize: 16, textAlign: "center" },
});

export default NoContentCard;
