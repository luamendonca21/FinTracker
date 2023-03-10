import React, { useRef, useEffect, useState } from "react";
import { View, StyleSheet, Animated, LayoutAnimation } from "react-native";

import { IconButton } from "./Buttons";
import AppText from "./AppText";
import { AppTextInput } from "./Inputs";
import { toggleAnimation } from "../assets/animations/toggleAnimation";
import ErrorMessage from "./Alerts/ErrorMessage";

import defaultStyles from "../config/styles";

const DropDownSelector = ({
  error,
  id,
  handleOnChange,
  title,
  itemsActive,
  onPress,
}) => {
  const [showContent, setShowContent] = useState(false);

  const isActive = () => {
    return itemsActive.find((item) => item.id === id);
  };
  const selectItemIcon = () => {
    return isActive(id)
      ? ["check-circle", defaultStyles.colors.white]
      : title == "Quando estiver perto de um local personalizado"
      ? ["check-circle-outline", defaultStyles.colors.black]
      : ["add-circle-outline", defaultStyles.colors.black];
  };
  const toggleListItem = () => {
    LayoutAnimation.configureNext(toggleAnimation);
  };

  useEffect(() => {
    if (isActive()) setShowContent(true);
  }, []);
  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: isActive()
              ? defaultStyles.colors.secondary
              : defaultStyles.colors.white,
            marginVertical: isActive() ? "2%" : 0,
            elevation: isActive() ? 2 : 0,
          },
        ]}
      >
        <View style={styles.item}>
          <IconButton
            name={selectItemIcon()[0]}
            color={selectItemIcon()[1]}
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
              onChangeText={(text) => handleOnChange(text)}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType={title == "Idade" ? "numeric" : "default"}
              placeholder="Digita aqui..."
            />
          </View>
        )}
      </View>
      <ErrorMessage error={error} />
    </>
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
    paddingHorizontal: 10,
  },

  input: { padding: 2 },
});

export default DropDownSelector;
