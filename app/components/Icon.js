import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

const Icon = ({
  icon,
  iconColor = defaultStyles.colors.white,
  backgroundColor = defaultStyles.colors.black,
  size,
  style,
  activeOpacity = 0.7,
  ...otherProps
}) => {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={[
        styles.container,
        style,
        {
          backgroundColor: backgroundColor,
          width: size * 2,
          height: size * 2,
          borderRadius: size,
        },
      ]}
      {...otherProps}
    >
      <MaterialCommunityIcons name={icon} size={size} color={iconColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Icon;
