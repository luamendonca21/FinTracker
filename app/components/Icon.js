import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

const Icon = ({
  icon,
  iconColor = defaultStyles.colors.white,
  backgroundColor = defaultStyles.colors.black,
  size,
  style,
  onPress,
  activeOpacity,
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
      onPress={onPress}
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
