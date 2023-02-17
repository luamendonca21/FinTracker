import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import AppText from "./../AppText";

import defaultStyles from "../../config/styles";

const AppButton = ({
  title,
  color = "primary",
  onPress,
  style,
  ...otherProps
}) => {
  return (
    <TouchableOpacity
      {...otherProps}
      onPress={onPress}
      style={[
        styles.container,
        style,
        { backgroundColor: defaultStyles.colors[color] },
      ]}
    >
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 12,
    elevation: 2,
  },
  text: { fontSize: 18, fontWeight: "bold", color: defaultStyles.colors.white },
});

export default AppButton;
