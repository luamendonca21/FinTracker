import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions, Image } from "react-native";

import AppText from "../components/AppText";
import { AppButton } from "../components/Buttons";
import GlowingCircle from "../components/GlowingCircle";
import Index from "../components/Index";
import Screen from "../components/Screen";
import IndexCarousel from "../components/Carousels/IndexCarousel";

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
  const [closeCetaceans, setCloseCetaceans] = useState([
    {
      id: 1,
      name: "Atlantic spotted Dolphin",
      details: {
        nomeCientífico: "Stenella frontalis",
        idade: "1",
        comprimento: "3m",
        peso: "650kg",
        localização: "Camâra de Lobos",
        distância: "4 km",
      },
      imageUrl: require("../assets/dolphins/Atlantic_spotted_dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
    {
      id: 2,
      name: "Bottlenose Dolphin",
      details: {
        nomeCientífico: "Tursiops",
        idade: "1",
        comprimento: "3m",
        peso: "650kg",
        localização: "Camâra de Lobos",
        distância: "4 km",
      },
      imageUrl: require("../assets/dolphins/Bottlenose_dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
    {
      id: 3,
      name: "Common Dolphin",
      details: {
        nomeCientífico: "Delphinus delphis",
        idade: "1",
        comprimento: "3m",
        peso: "650kg",
        localização: "Camâra de Lobos",
        distância: "4 km",
      },
      imageUrl: require("../assets/dolphins/Common_dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
    {
      id: 4,
      name: "Frasers Dolphin",
      details: {
        nomeCientífico: "Lagenodelphis hosei",
        idade: "1",
        comprimento: "3m",
        peso: "650kg",
        localização: "Camâra de Lobos",
        distância: "4 km",
      },
      imageUrl: require("../assets/dolphins/Frasers_dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
    {
      id: 5,
      name: "Risso's Dolphin",
      details: {
        nomeCientífico: "Grampus griseuss",
        idade: "1",
        comprimento: "3m",
        peso: "650kg",
        localização: "Camâra de Lobos",
        distância: "4 km",
      },
      imageUrl: require("../assets/dolphins/Rissos_Dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
  ]);
  const handlePressShortcut = ({ target }) => {
    navigation.navigate(target);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.carouselContainer}>
              {closeCetaceans.map((item, index) => (
                <View key={index} style={styles.carouselItem}>
                  <View style={styles.carouselContent}>
                    <View style={styles.headerContainer}>
                      <View style={styles.imageContainer}>
                        <Image
                          style={styles.carouselImage}
                          source={item.imageUrl}
                        />
                      </View>
                      <View style={styles.details}>
                        <View style={styles.distance}>
                          <AppText style={styles.distanceText}>
                            {item.details.distância}
                          </AppText>
                        </View>
                        <AppText>Há 4 min</AppText>
                      </View>
                    </View>
                    <AppText numberOfLines={1}>{item.name}</AppText>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </Screen>
      </View>
    </ScrollView>
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
  carouselContainer: {
    flex: 1,
    marginTop: 10,
    width: "100%",
    flexDirection: "row",
  },
  carouselItem: {
    backgroundColor: defaultStyles.colors.white,
    elevation: 2,
    width: 200,
    height: 170,
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  carouselContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 12,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  imageContainer: { elevation: 2, borderRadius: 15 },
  carouselImage: {
    width: 90,
    borderRadius: 15,
    height: 120,
  },
  details: {
    height: 60,
    justifyContent: "space-between",
  },
  distance: {
    backgroundColor: defaultStyles.colors.thirdlyLight,
    justifyContent: "center",
    alignItems: "center",
    height: 28,
    width: 75,
    borderRadius: 50,
  },
  distanceText: {
    color: defaultStyles.colors.thirdly,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default HomeScreen;
