import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { IconButton } from "./Buttons";
import { AppText } from "./Text";
import ToolTip from "../components/ToolTip";

import { findObjectInArrayById as isActive } from "../utils/utils";

import defaultStyles from "../config/styles";

const OptionSelector = ({ id, title, optionsActive, ...otherProps }) => {
  const selectOptionIcon = () => {
    return isActive(optionsActive, id)
      ? ["check-circle", defaultStyles.colors.white]
      : ["check-circle-outline", defaultStyles.colors.black];
  };

  return (
    <View
      style={[
        isActive(optionsActive, id)
          ? styles.optionActive
          : styles.optionInactive,
      ]}
    >
      <IconButton
        name={selectOptionIcon()[0]}
        color={selectOptionIcon()[1]}
        {...otherProps}
        size={28}
      />
      <AppText numberOfLines={3} style={{ flex: 1, marginLeft: 4 }}>
        {title}
      </AppText>
      {(title === "Cefalópodes" || title === "Krill") && (
        <ToolTip
          containerStyle={{
            width: 150,
            height: 160,
            backgroundColor: defaultStyles.colors.thirdly,
            elevation: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
          popover={
            <View>
              <AppText>
                {title === "Cefalópodes"
                  ? "Polvos, lulas, chocos. Animais marinhos inteligentes com tentáculos e habilidades de camuflagem."
                  : "Pequenos crustáceos marinhos que se encontram na base da cadeia alimentar dos oceanos."}
              </AppText>
            </View>
          }
          backgroundColor={defaultStyles.colors.thirdly}
        >
          <MaterialCommunityIcons name="information-outline" size={22} />
        </ToolTip>
      )}
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
