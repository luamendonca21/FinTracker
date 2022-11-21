import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";
import { AppButton } from "../components/Buttons";
import Index from "../components/Index";

const windowWidth = Dimensions.get("window").width;

const shortcuts = [
  {
    id: 0,
    title: "Cetáceos favoritos",
    subTitle: "Visualiza os teus cetáceos favoritos.",
    buttonTitle: "Ir para favoritos",
  },
  {
    id: 1,
    title: "Funcionalidades",
    subTitle: "Descobre o que podes fazer.",
    buttonTitle: "Ir para funcionalidades",
  },
  {
    id: 2,
    title: "Definições",
    subTitle: "Personaliza as tuas definições.",
    buttonTitle: "Ir para definições",
  },
];
const HomeScreen = ({ props }) => {
  const [shortcutActive, setShortcutActive] = useState(0);
  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != shortcutActive) {
        setShortcutActive(slide);
      }
    }
  };
  return (
    <Screen>
      <View style={styles.container}>
        <AppText style={styles.welcome}>Bem-vinda, Luana!</AppText>
        <View style={styles.shortcuts}>
          <View style={styles.shortcutsContainer}>
            <ScrollView
              style={styles.shortcutsContainer}
              onScroll={({ nativeEvent }) => onchange(nativeEvent)}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
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
                  />
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.index}>
            <Index items={shortcuts} indexSelected={shortcutActive} />
          </View>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
  },
  shortcuts: {
    backgroundColor: defaultStyles.colors.primary,
    width: windowWidth * 0.92,
    alignSelf: "center",
    alignItems: "center",
    height: 200,
    borderRadius: 20,
    marginTop: 20,
  },
  shortcutsContainer: {
    width: "100%",
    height: "85%",
  },
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
