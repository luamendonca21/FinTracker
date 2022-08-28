import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import defaultStyles from "../config/styles";
import AppText from "./AppText";

const AppButton = ({ title, color = "secondary", onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <AppText style={[styles.text, { color: defaultStyles.colors[color] }]}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  text: {
    textDecorationLine: "underline",
    fontSize: 16,
    fontWeight: "bold",
    color: defaultStyles.colors.primary,
  },
});

export default AppButton;
