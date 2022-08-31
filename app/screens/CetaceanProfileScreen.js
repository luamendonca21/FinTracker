import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import { ListDetails } from "../components/Lists";
function CetaceanProfileScreen(props) {
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

  const index = 1;
  return (
    <>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={cetaceans[index].imageUrl} />
      </View>

      <View style={styles.profileContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <AppText numberOfLines={3} style={styles.cetaceanName}>
                {cetaceans[index].name}
              </AppText>
            </View>
            <View style={styles.headerIcons}>
              <MaterialCommunityIcons
                name="bell-outline"
                color={defaultStyles.colors.black}
                size={34}
              />
              <MaterialCommunityIcons
                name="cards-heart-outline"
                color={defaultStyles.colors.black}
                size={34}
              />
            </View>
          </View>
          <AppText style={styles.title}>Details</AppText>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <ListDetails details={cetaceans[index].details} />
          </ScrollView>
          <AppText style={styles.title}>Introduction</AppText>
          <AppText style={styles.text}>
            {cetaceans[index].introduction}.
          </AppText>
          <AppText style={styles.title}>History</AppText>
          <AppText style={styles.text}>{cetaceans[index].history}</AppText>
          <AppText style={styles.title}>Migration</AppText>
          <AppText style={styles.text}>{cetaceans[index].migration}</AppText>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: "30%",
    position: "absolute",
    top: 0,
    backgroundColor: defaultStyles.colors.primary,
    left: 0,
    right: 0,
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  profileContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: defaultStyles.colors.white,
    flex: 1,
    marginTop: 245,
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  headerIcons: {
    flexDirection: "row",
    width: 75,
    justifyContent: "space-between",
  },
  cetaceanName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "justify",
  },
});

export default CetaceanProfileScreen;
