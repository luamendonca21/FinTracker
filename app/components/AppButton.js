import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import defaultStyles from "../config/styles";
import AppText from "./AppText";

const AppButton = ({ title, color = "secondary", onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: defaultStyles.colors[color] },
      ]}
    >
      <AppText style={styles.text}>{title}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: defaultStyles.colors.secondary,
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 12,
    marginVertical: 10,
    elevation: 2,
  },
  text: { fontSize: 18, fontWeight: "bold" },
});

export default AppButton;
