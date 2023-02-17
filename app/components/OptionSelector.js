import React from "react";
import { View, StyleSheet } from "react-native";

import IconButton from "./Buttons/IconButton";
import AppText from "./AppText";

import defaultStyles from "../config/styles";

const OptionSelector = ({ id, title, optionsActive, ...otherProps }) => {
  return (
    <View
      style={[
        optionsActive.includes(id)
          ? styles.optionActive
          : styles.optionInactive,
      ]}
    >
      <IconButton {...otherProps} size={28} />
      <AppText numberOfLines={3} style={{ flex: 1, marginLeft: 4 }}>
        {title}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  optionInactive: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  optionActive: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    backgroundColor: defaultStyles.colors.secondary,
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
});

export default OptionSelector;
