import React from "react";
import { View, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import AppText from "../components/AppText";
import { ListDetails } from "../components/Lists";
import PointsIndicator from "../components/PointsIndicator";
import { Carousel } from "../components/Carousels";
import IconButton from "../components/Buttons/IconButton";
import defaultStyles from "../config/styles";

const windowHeight = Dimensions.get("window").height;

function UserProfileScreen(props) {
  const users = [
    {
      name: "Luana",
      detalhes: {
        idade: "21",
        naturalidade: "Madeira",
        contaCriadaEm: "28/07/2022",
      },
    },
  ];

  const favorites = [
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
  ];

  return (
    <>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/userPicture.jpg")}
        />
      </View>

      <View style={styles.profileContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <AppText style={styles.userName}>{users[0].name}</AppText>
            <PointsIndicator />
          </View>
          <View style={styles.body}>
            <View style={styles.detailsHeader}>
              <AppText style={styles.title}>Detalhes</AppText>
              <IconButton
                style={styles.iconButton}
                onPress={() => console.log("Pressed")}
                color={defaultStyles.colors.black}
                name="edit"
                size={25}
              />
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <ListDetails details={users[0].detalhes} />
            </ScrollView>
            <AppText style={styles.title}>Cetáceos Favoritos</AppText>
            <Carousel data={favorites} />
            <AppText style={styles.title}>Visitados</AppText>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: windowHeight / 3,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: defaultStyles.colors.primary,
  },
  image: {
    width: "50%",
    height: "50%",
    resizeMode: "cover",
    borderRadius: 100,
    aspectRatio: 1,
  },
  profileContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: defaultStyles.colors.white,
    flex: 1,
    marginTop: windowHeight / 3.5,
    padding: 15,
  },
  userName: { fontSize: 22, flex: 1, fontWeight: "bold", marginBottom: 15 },
  header: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  body: {
    marginTop: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  detailsHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  iconButton: { marginLeft: 5, marginBottom: 5, marginTop: 15 },
  text: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "justify",
  },
});

export default UserProfileScreen;
