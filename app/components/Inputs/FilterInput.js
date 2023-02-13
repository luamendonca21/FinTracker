import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { View, StyleSheet, TextInput } from "react-native";
import defaultStyles from "../../config/styles";
import IconButton from "../Buttons/IconButton";

const FilterInput = ({
  icon,
  clear,
  style,
  onChange,
  onPress,
  ...otherProps
}) => {
  return (
    <View style={[styles.container, style]}>
      {icon && (
        <MaterialIcons
          style={styles.icon}
          name={icon}
          {...otherProps}
          color={defaultStyles.colors.white}
        />
      )}
      <TextInput
        onChange={onChange}
        style={styles.textInput}
        {...otherProps}
        placeholderTextColor={defaultStyles.colors.white}
      ></TextInput>
      {clear ? (
        <IconButton
          style={styles.iconButton}
          onPress={onPress}
          color={defaultStyles.colors.white}
          name="close"
          size={26}
        />
      ) : (
        ""
      )}
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
  },
  textInput: {
    color: defaultStyles.colors.white,
    flex: 1,
    marginLeft: 5,
  },
});

export default FilterInput;
