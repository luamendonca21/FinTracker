import React, { useRef, useEffect } from "react";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import IconButton from "../Buttons/IconButton";

import defaultStyles from "../../config/styles";

const SearchInput = ({ mainIcon, clearIcon, style, ...otherProps }) => {
  const localInputRef = useRef(null);

  const keyboardDidHideCallback = () =>
    localInputRef.current && localInputRef.current.blur();

  useEffect(() => {
    const keyboardDidHideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHideCallback
    );

    return () => {
      keyboardDidHideSubscription?.remove();
    };
  }, []);

  return (
    <View style={[styles.container, style]}>
      {mainIcon && (
        <MaterialIcons
          {...otherProps}
          name={mainIcon.name}
          color={mainIcon.color}
          size={mainIcon.size}
        />
      )}
      <TextInput
        ref={localInputRef}
        style={[defaultStyles.text, styles.textInput]}
        {...otherProps}
        placeholderTextColor={defaultStyles.colors.white}
      ></TextInput>
      {clearIcon && (
        <IconButton
          {...otherProps}
          name={clearIcon.name}
          color={clearIcon.color}
          size={clearIcon.size}
        />
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

export default SearchInput;
