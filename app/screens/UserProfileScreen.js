import React from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";
import AppText from "../components/AppText";
import { ListDetails } from "../components/Lists";
function UserProfileScreen(props) {
  const users = [
    {
      name: "Luana",
      details: {
        age: "21",
        hometown: "Madeira",
        joinedFinTracker: "28/07/2022",
      },
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
            <AppText style={styles.cetaceanName}>{users[0].name}</AppText>
            <View style={styles.headerIcons}>
              <MaterialCommunityIcons
                name="bell"
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
            <ListDetails details={users[0].details} />
          </ScrollView>
          <AppText style={styles.title}>Favorite Cetaceans</AppText>
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
    height: "30%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: defaultStyles.colors.primary,
  },
  image: { width: 140, height: 140, resizeMode: "cover", borderRadius: 70 },
  profileContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: defaultStyles.colors.white,
    flex: 1,
    marginTop: 245,
    padding: 18,
  },
  header: { flexDirection: "row", alignItems: "center" },
  headerIcons: {
    flexDirection: "row",
    width: 75,
    justifyContent: "space-between",
  },
  cetaceanName: { fontSize: 22, flex: 1, fontWeight: "bold", marginBottom: 15 },
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

export default UserProfileScreen;
