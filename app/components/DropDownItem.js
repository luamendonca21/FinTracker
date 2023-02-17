import React, { useRef, useState } from "react";
import { View, StyleSheet, Animated, LayoutAnimation } from "react-native";

import IconButton from "./Buttons/IconButton";
import AppText from "./AppText";
import { AppTextInput } from "./Inputs";

import defaultStyles from "../config/styles";
import { toggleAnimation } from "../assets/animations/toggleAnimation";
const DropDownItem = ({
  id,
  handleOnChange,
  title,
  itemsActive,
  onPress,
  ...otherProps
}) => {
  const [showContent, setShowContent] = useState(false);

  const toggleListItem = () => {
    LayoutAnimation.configureNext(toggleAnimation);
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: itemsActive.find((item) => item.id === id)
            ? defaultStyles.colors.secondary
            : defaultStyles.colors.white,
        },
      ]}
    >
      <View
        style={[
          itemsActive.find((item) => item.id === id)
            ? styles.itemActive
            : styles.itemInactive,
        ]}
      >
        <IconButton
          {...otherProps}
          onPress={() => {
            onPress();
            setShowContent(!showContent);
            toggleListItem();
          }}
          size={28}
        />
        <AppText numberOfLines={3} style={{ flex: 1, marginLeft: 4 }}>
          {console.log(itemsActive)}
        </AppText>
      </View>
      {showContent && (
        <View style={styles.body}>
          <AppTextInput
            style={styles.input}
            onChangeText={handleOnChange}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="numeric"
            placeholder="Digita aqui..."
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: "2%",
  },
  body: {
    paddingHorizontal: "2%",
    paddingVertical: "2%",
  },
  itemInactive: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  itemActive: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    backgroundColor: defaultStyles.colors.secondary,
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  input: { padding: 2 },
});

export default DropDownItem;
