import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./../AppText";
import defaultStyles from "../../config/styles";

const AppButton = ({ title, color = "primary", onPress }) => {
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
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 12,
    marginVertical: 10,
    elevation: 2,
  },
  text: { fontSize: 18, fontWeight: "bold", color: defaultStyles.colors.white },
});

export default AppButton;
