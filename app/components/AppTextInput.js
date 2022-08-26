import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

const AppTextInput = (props) => {
  return (
    <View style={styles.container}>
      <TextInput style={[defaultStyles.text, styles.textInput]}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    borderRadius: 50,
    padding: 12,
    borderWidth: 1,
    borderColor: defaultStyles.colors.primary,
    elevation: 2,
    shadowColor: defaultStyles.colors.black,
  },
  textInput: {},
});

export default AppTextInput;
