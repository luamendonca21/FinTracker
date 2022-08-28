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
          <AppText style={styles.userName}>{users[0].name}</AppText>
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
  userName: { fontSize: 22, flex: 1, fontWeight: "bold", marginBottom: 15 },
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
