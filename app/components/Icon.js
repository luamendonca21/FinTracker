import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

const Icon = ({
  icon,
  iconColor = "#fff",
  backgroundColor = "#000",
  size,
  style,
}) => {
  return (
    <View
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
    >
      <MaterialCommunityIcons name={icon} size={size} color={iconColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Icon;
