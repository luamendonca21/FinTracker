import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import defaultStyles from "../config/styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DeleteAction = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="trash-can"
          size={24}
          color={defaultStyles.colors.white}
        ></MaterialCommunityIcons>
      </View>
    </TouchableOpacity>
  );
};

export default DeleteAction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.danger,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});
