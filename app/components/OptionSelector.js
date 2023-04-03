import React from "react";
import { View, StyleSheet } from "react-native";

import { IconButton } from "./Buttons";
import AppText from "./AppText";

import defaultStyles from "../config/styles";

const OptionSelector = ({ id, title, optionsActive, ...otherProps }) => {
  // ----- UTILITIES -----
  const isActive = () => {
    return optionsActive.find((item) => item.id === id);
  };

  const selectOptionIcon = () => {
    return isActive(id)
      ? ["check-circle", defaultStyles.colors.white]
      : ["check-circle-outline", defaultStyles.colors.black];
  };

  return (
    <View style={[isActive(id) ? styles.optionActive : styles.optionInactive]}>
      <IconButton
        name={selectOptionIcon()[0]}
        color={selectOptionIcon()[1]}
        {...otherProps}
        size={28}
      />
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
