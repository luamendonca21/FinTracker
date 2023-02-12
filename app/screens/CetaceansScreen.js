import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppText from "../components/AppText";
import { FilterInput } from "../components/Inputs";
import { Carousel } from "../components/Carousels";
import defaultStyles from "../config/styles";

const cetaceans = [
  {
    id: 1,
    name: "Atlantic spotted Dolphin",
    details: {
      scientificName: "Stenella frontalis",
      age: "1",
      Length: "3m",
      weigh: "650kg",
      location: "Camâra de Lobos",
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
      scientificName: "Tursiops",
      age: "1",
      Length: "3m",
      weigh: "650kg",
      location: "Camâra de Lobos",
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
      scientificName: "Delphinus delphis",
      age: "1",
      Length: "3m",
      weigh: "650kg",
      location: "Camâra de Lobos",
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
      scientificName: "Lagenodelphis hosei",
      age: "1",
      Length: "3m",
      weigh: "650kg",
      location: "Camâra de Lobos",
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
      scientificName: "Grampus griseuss",
      age: "1",
      Length: "3m",
      weigh: "650kg",
      location: "Camâra de Lobos",
    },
    imageUrl: require("../assets/dolphins/Rissos_Dolphin.jpg"),
    introduction:
      "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
    history:
      "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
    migration:
      "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
  },
  {
    id: 6,
    name: "Rough toothed Dolphin",
    details: {
      scientificName: "Steno bredanensiss",
      age: "1",
      Length: "3m",
      weigh: "650kg",
      location: "Camâra de Lobos",
    },
    imageUrl: require("../assets/dolphins/Rough_toothed_dolphin.jpg"),
    introduction:
      "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
    history:
      "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
    migration:
      "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
  },
  {
    id: 7,
    name: "Stripped Dolphin",
    details: {
      scientificName: "Stenella coeruleoalba",
      age: "1",
      Length: "3m",
      weigh: "650kg",
      location: "Camâra de Lobos",
    },
    imageUrl: require("../assets/dolphins/Stripped_dolphin.jpg"),
    introduction:
      "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
    history:
      "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
    migration:
      "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
  },
];

const CetaceansScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppText style={styles.welcomeText}>
          Bem-vindo ao fundo do oceano
        </AppText>
        <FilterInput
          icon="search"
          size={24}
          placeholder="Pesquisa por cetáceos..."
        />
        <View style={styles.categoryContainer}>
          <AppText style={styles.category}>Golfinhos</AppText>
          <AppText style={styles.seeMore}>Desliza para ver mais...</AppText>

          <Carousel data={cetaceans} />
          {/* <LinkButton color="black" title="See more" /> */}
        </View>
        <View style={styles.categoryContainer}>
          <AppText style={styles.category}>Baleias</AppText>
          <AppText style={styles.seeMore}>Desliza para ver mais...</AppText>
          <Carousel data={cetaceans} />
          {/* <LinkButton color="black" title="See more" /> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.primary,
    flex: 1,
    padding: 15,
  },
  welcomeText: {
    color: defaultStyles.colors.white,
    fontSize: 22,
    fontWeight: "700",
    width: "70%",
    marginTop: 50,
    marginBottom: 10,
  },
  categoryContainer: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: defaultStyles.colors.white,
    width: "100%",
    marginVertical: 10,
    elevation: 2,
    padding: 10,
  },
  category: {
    fontWeight: "700",
    color: defaultStyles.colors.black,
    fontSize: 18,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  itemTitle: {
    color: defaultStyles.colors.black,
    position: "absolute",
    fontWeight: "700",
    color: defaultStyles.colors.white,
    marginHorizontal: 10,
    marginVertical: 145,
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 15,
  },
  button: {
    marginTop: 5,
  },
  seeMore: {
    color: defaultStyles.colors.gray,
    marginHorizontal: 5,
    marginBottom: 5,
  },
});

export default CetaceansScreen;
