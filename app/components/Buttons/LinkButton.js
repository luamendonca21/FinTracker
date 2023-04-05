import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import AppText from "./../AppText";

import defaultStyles from "../../config/styles";

const LinkButton = ({ color = "primary", style, title, ...otherProps }) => {
  return (
    <TouchableOpacity {...otherProps} style={[style, styles.container]}>
      <AppText
        style={[styles.text, style, { color: defaultStyles.colors[color] }]}
      >
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
    fontSize: 15,
    fontWeight: "bold",
    color: defaultStyles.colors.primary,
  },
});

export default LinkButton;
