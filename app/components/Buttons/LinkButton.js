import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./../AppText";
import defaultStyles from "../../config/styles";

const AppButton = ({ title, color = "primary", onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[style, styles.container]}>
      <AppText style={[styles.text, { color: defaultStyles.colors[color] }]}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: defaultStyles.colors.primary,
  },
});

export default AppButton;
