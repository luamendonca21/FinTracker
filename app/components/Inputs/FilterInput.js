import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet, TextInput } from "react-native";
import defaultStyles from "../../config/styles";

const FilterInput = ({ icon, ...otherProps }) => {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialIcons
          style={styles.icon}
          name={icon}
          {...otherProps}
          color={defaultStyles.colors.white}
        />
      )}
      <TextInput
        style={styles.textInput}
        {...otherProps}
        placeholderTextColor={defaultStyles.colors.white}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    backgroundColor: defaultStyles.colors.transparent,
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 30,
  },
  textInput: {
    color: defaultStyles.colors.white,
    flex: 1,
    marginLeft: 5,
  },
});

export default FilterInput;
