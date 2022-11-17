import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./../AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../../config/styles";

const AppSecondaryButton = ({ index, title, color = "secondary", onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: defaultStyles.colors[color] },
      ]}
    >
      <MaterialCommunityIcons
        name="arrow-right-thin"
        size={36}
        color={defaultStyles.colors.white}
      />
      <AppText style={styles.text}>{index == 6 ? "Finish" : title}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginVertical: 10,
    elevation: 2,
  },
  text: {
    marginHorizontal: 5,
    fontSize: 18,
    fontWeight: "bold",
    color: defaultStyles.colors.white,
  },
});

export default AppSecondaryButton;
