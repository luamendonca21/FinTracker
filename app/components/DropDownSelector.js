import React, { useEffect, useState } from "react";
import { View, StyleSheet, LayoutAnimation } from "react-native";

import { IconButton } from "./Buttons";
import { AppText } from "./Text";
import { AppTextInput } from "./Inputs";
import ErrorMessage from "./Alerts/ErrorMessage";

import { toggleAnimation } from "../assets/animations/toggleAnimation";
import { findObjectInArrayById as isActive } from "../utils/utils";

import defaultStyles from "../config/styles";

const DropDownSelector = ({
  error,
  id,
  handleOnChange,
  title,
  itemsActive,
  onPress,
}) => {
  // ------- STATE MANAGEMENT ------
  const [showContent, setShowContent] = useState(false);

  // ------ UTILITIES ------
  const toggleListItem = () => {
    LayoutAnimation.configureNext(toggleAnimation);
  };

  const selectItemIcon = () => {
    return isActive(itemsActive, id)
      ? ["check-circle", defaultStyles.colors.white]
      : title == "Quando estiver perto de um local personalizado"
      ? ["check-circle-outline", defaultStyles.colors.black]
      : ["add-circle-outline", defaultStyles.colors.black];
  };

  // ------- LIFECYCLE HOOKS -------
  useEffect(() => {
    if (isActive(itemsActive, id)) setShowContent(true);
  }, []);

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: isActive(itemsActive, id)
              ? defaultStyles.colors.secondary
              : defaultStyles.colors.white,
            marginVertical: isActive(itemsActive, id) ? "2%" : 0,
            elevation: isActive(itemsActive, id) ? 2 : 0,
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
              maxLength={title == "Idade" ? 2 : 50}
              style={styles.input}
              onChangeText={(text) => handleOnChange(text)}
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType={title == "Idade" ? "numeric" : "default"}
              placeholder={
                title == "Idade"
                  ? "Digita a tua idade"
                  : title == "País"
                  ? "Digita o teu país"
                  : title == "Profissão"
                  ? "Digita a tua profissão"
                  : title == "Interesses"
                  ? "Ex: Fotografia, Música, Desporto"
                  : title == "Hobbies"
                  ? "Ex: Culinária, Corrida, Pesca"
                  : title == "Quando estiver perto de um local personalizado"
                  ? "Digite uma localização"
                  : null
              }
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
