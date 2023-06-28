import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import AppText from "../Text/AppText";

import defaultStyles from "../../config/styles";

const AppSecondaryButton = ({
  index,
  title,
  style,
  styleText,
  icon,
  color = "secondary",
  onPress,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <LinearGradient
        colors={[defaultStyles.colors[color], defaultStyles.colors.primary]}
        start={[0, 0]}
        end={[1, 1]}
        style={[styles.container, style]}
      >
        <AppText style={[styles.text, styleText]}>
          {icon && index == 6 ? "Fim" : title}
        </AppText>
        {icon && (
          <MaterialCommunityIcons
            name={icon.name}
            size={icon.size}
            color={defaultStyles.colors.white}
          />
        )}
      </LinearGradient>
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
