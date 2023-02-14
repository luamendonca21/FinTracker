import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../../config/styles";

const AppTextInput = ({ icon, secureTextEntry, ...otherProps }) => {
  const [hidden, setHidden] = useState(true);

  const handlePress = () => {
    setHidden(!hidden);
  };

  const hide = () => {
    return hidden ? ["eye-off", false] : ["eye", true];
  };

  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          {...otherProps}
          color={defaultStyles.colors.black}
        />
      )}
      <TextInput
        secureTextEntry={hide()[1]}
        {...otherProps}
        placeholderTextColor={defaultStyles.colors.medium}
        style={[defaultStyles.text, styles.textInput]}
      ></TextInput>
      {secureTextEntry ? (
        <TouchableOpacity onPress={handlePress}>
          <MaterialCommunityIcons
            name={hide()[0]}
            {...otherProps}
            color={defaultStyles.colors.black}
          />
        </TouchableOpacity>
      ) : (
        ""
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: defaultStyles.colors.white,
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    borderRadius: 50,
    padding: 12,
    borderWidth: 0.8,
    borderColor: defaultStyles.colors.primary,
    elevation: 2,
    shadowColor: defaultStyles.colors.black,
    marginVertical: 10,
  },
  textInput: { flex: 1, marginLeft: 5 },
});

export default AppTextInput;
