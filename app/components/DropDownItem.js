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
          marginVertical: itemsActive.find((item) => item.id === id)
            ? "2%"
            : "1%",
        },
      ]}
    >
      <View style={styles.item}>
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
          {title}
        </AppText>
      </View>
      {showContent && (
        <View style={styles.body}>
          <AppTextInput
            style={styles.input}
            onChangeText={handleOnChange}
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType={title == "Idade" ? "numeric" : "default"}
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
  },
  body: {
    paddingHorizontal: "2%",
    paddingVertical: "1%",
  },
  item: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-evenly",
    paddingHorizontal: "2%",
  },

  input: { padding: 2 },
});

export default DropDownItem;
