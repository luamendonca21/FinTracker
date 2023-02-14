import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";

import AppText from "../components/AppText";
import { AppButton } from "../components/Buttons";
import GlowingCircle from "../components/GlowingCircle";
import Index from "../components/Index";
import Screen from "../components/Screen";
import IndexCarousel from "../components/Carousels/CardCarousel/IndexCarousel";

import defaultStyles from "../config/styles";

const windowWidth = Dimensions.get("window").width;

const shortcuts = [
  {
    id: 0,
    title: "Cetáceos favoritos",
    subTitle: "Visualiza os teus cetáceos favoritos.",
    buttonTitle: "Ir para favoritos",
    target: "Profile",
  },
  {
    id: 1,
    title: "Funcionalidades",
    subTitle: "Descobre o que podes fazer.",
    buttonTitle: "Ir para funcionalidades",
    target: "Features",
  },
  {
    id: 2,
    title: "Definições",
    subTitle: "Personaliza as tuas definições.",
    buttonTitle: "Ir para definições",
    target: "Settings",
  },
];
const HomeScreen = ({ navigation }) => {
  const handlePressShortcut = ({ target }) => {
    navigation.navigate(target);
  };
  return (
    <View style={styles.container}>
      <Screen>
        <View
          style={{
            marginBottom: 25,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AppText style={styles.welcome}>Bem-vinda, Luana!</AppText>
          <GlowingCircle />
        </View>
        <AppText style={{ fontSize: 18 }}>Atalhos</AppText>
        <IndexCarousel items={shortcuts}>
          {shortcuts.map((item, index) => (
            <View key={index} style={styles.shortcutsContent}>
              <AppText style={styles.shortcutsTitle}>{item.title}</AppText>
              <AppText style={styles.shortcutsSubtitle}>
                {item.subTitle}
              </AppText>
              <AppButton
                style={styles.button}
                color="secondary"
                title={item.buttonTitle}
                onPress={() => handlePressShortcut(item)}
              />
            </View>
          ))}
        </IndexCarousel>
        <AppText style={styles.title}>Perto de ti</AppText>
      </Screen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: defaultStyles.colors.white,
    flex: 1,
  },
  welcome: { flex: 1, fontSize: 22, fontWeight: "bold" },
  title: { fontSize: 18, marginTop: 15, fontWeight: "bold" },
  shortcutsContent: {
    padding: 20,
    width: windowWidth * 0.92,
    height: "100%",
  },
  shortcutsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 5,
    color: defaultStyles.colors.white,
  },
  shortcutsSubtitle: {
    width: "50%",
    lineHeight: 22,
    paddingVertical: 5,
    color: defaultStyles.colors.white,
  },
  button: {
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  index: {
    flex: 1,
    justifyContent: "center",
  },
});

export default HomeScreen;
