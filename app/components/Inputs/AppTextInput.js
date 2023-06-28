import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";
import { IconButton } from "../Buttons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ErrorMessage } from "../Alerts";

import defaultStyles from "../../config/styles";

const AppTextInput = ({
  error,
  style,
  submitDisabled,
  value,
  submitIcon,
  icon,
  onSubmit,
  secureTextEntry,
  ...otherProps
}) => {
  // ------- STATE MANAGEMENT ------
  const [hidden, setHidden] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const localInputRef = useRef(null);

  const keyboardDidHideCallback = () => {
    localInputRef.current && localInputRef.current.blur();
  };

  useEffect(() => {
    const keyboardDidHideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      keyboardDidHideCallback
    );

    return () => {
      keyboardDidHideSubscription?.remove();
    };
  }, []);

  // ------ UTILITIES ------
  const handlePress = () => {
    setHidden(!hidden);
  };

  const hide = () => {
    return hidden ? ["eye", true] : ["eye-off", false];
  };

  const handleFocused = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View>
      <View
        style={[
          styles.container,
          style,
          {
            borderColor: error
              ? defaultStyles.colors.danger
              : isFocused
              ? defaultStyles.colors.primary
              : defaultStyles.colors.white,
          },
        ]}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            {...otherProps}
            color={defaultStyles.colors.black}
          />
        )}
        <TextInput
          ref={localInputRef}
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocused}
          secureTextEntry={secureTextEntry ? hide()[1] : false}
          {...otherProps}
          placeholderTextColor={defaultStyles.colors.medium}
          style={[defaultStyles.text, styles.textInput]}
        />
        {secureTextEntry && value !== undefined && value !== "" && (
          <IconButton
            family={MaterialCommunityIcons}
            onPress={handlePress}
            color={defaultStyles.colors.black}
            name={hide()[0]}
            size={24}
          />
        )}
        {submitIcon &&
          value !== undefined &&
          value !== "" &&
          !submitDisabled && (
            <IconButton
              animate
              family={MaterialCommunityIcons}
              onPress={onSubmit}
              color={defaultStyles.colors.secondary}
              name="send"
              size={24}
            />
          )}
      </View>
      <ErrorMessage error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: defaultStyles.colors.white,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    borderRadius: 50,
    padding: 12,
    borderWidth: 0.8,
    elevation: 2,
    shadowColor: defaultStyles.colors.black,
    marginVertical: 5,
  },
  textInput: { flex: 1, marginLeft: 5 },
});

export default AppTextInput;
