import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./../AppText";

import defaultStyles from "../../config/styles";

const AppSecondaryButton = ({
  index,
  title,
  style,
  icon,
  color = "secondary",
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        style,
        { backgroundColor: defaultStyles.colors[color] },
      ]}
    >
      <AppText style={styles.text}>
        {icon && index == 6 ? "Fim" : title}
      </AppText>
      {icon && (
        <MaterialCommunityIcons
          name={icon.name}
          size={icon.size}
          color={defaultStyles.colors.white}
        />
      )}
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
