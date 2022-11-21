import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const IconButton = ({ onPress, disabled, style, ...props }) => {
  return (
    <TouchableOpacity disabled={disabled} style={[style]} onPress={onPress}>
      <MaterialIcons {...props} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default IconButton;
