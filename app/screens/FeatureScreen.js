import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";
import AppSecondaryButton from "../components/AppSecondaryButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Index from "../components/Index";
const features = [
  {
    id: 0,
    title: "GPS Location",
    description:
      "You can follow your favorite cetaceans in a map and see your location",
  },
  {
    id: 1,
    title: "Knowledge",
    description:
      "Know your favorite cetaceans, by learning about their life, history, and migration.",
  },
  {
    id: 2,
    title: "Notifications",
    description:
      "You can customize your notifications, and set to be notified if any cetacean is close to you or to a custom location",
  },
  {
    id: 3,
    title: "Unlock cetacean’s complete profile",
    description: "You get access to cetacean’s complete profile by visiting it",
  },
  {
    id: 4,
    title: "Earn points",
    description: "You can earn 5 points by visiting a cetacean.",
  },
  {
    id: 5,
    title: "Get more cetaceans",
    description:
      "You get access to more 5 cetaceans by each 20 points you earn",
  },
  {
    id: 6,
    title: "Leaderboard",
    description:
      "See your position in the leaderboard and compete with other users",
  },
];
const index = 5;
const FeatureScreen = ({ props }) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/features/gpslocation.png")}
        ></Image>
        <AppText style={styles.title}>{features[index].title}</AppText>
        <AppText style={styles.subTitle}>{features[index].description}</AppText>
        <Index features={features} indexSelected={index} />
      </View>
      <View style={styles.button}>
        <AppSecondaryButton title="Next" />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 20,
    marginVertical: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    width: 260,

    color: defaultStyles.colors.primary,
  },
  subTitle: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 30,
    textAlign: "center",
    lineHeight: 28,
    width: 260,
  },
  indexContainer: {
    flexDirection: "row",
    width: 160,
    justifyContent: "space-evenly",
  },
  button: {
    alignItems: "flex-end",
    paddingRight: 30,
    paddingBottom: 30,
  },
});

export default FeatureScreen;
