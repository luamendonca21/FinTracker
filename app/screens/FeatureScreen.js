import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AppText from "../components/AppText";
import defaultStyles from "../config/styles";
import AppSecondaryButton from "../components/AppSecondaryButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FeatureScreen = ({ props }) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../assets/features/gpslocation.png")}
        ></Image>
        <AppText style={styles.title}>GPS Location</AppText>
        <AppText style={styles.subTitle}>
          You can follow your favorite cetaceans in a map and see your location.
        </AppText>
        <View style={styles.indexContainer}>
          <MaterialCommunityIcons
            name="circle"
            size={12}
            color={defaultStyles.colors.medium}
          />
          <MaterialCommunityIcons
            name="circle-outline"
            size={12}
            color={defaultStyles.colors.medium}
          />
          <MaterialCommunityIcons
            name="circle-outline"
            size={12}
            color={defaultStyles.colors.medium}
          />
          <MaterialCommunityIcons
            name="circle-outline"
            size={12}
            color={defaultStyles.colors.medium}
          />
          <MaterialCommunityIcons
            name="circle-outline"
            size={12}
            color={defaultStyles.colors.medium}
          />
          <MaterialCommunityIcons
            name="circle-outline"
            size={12}
            color={defaultStyles.colors.medium}
          />
          <MaterialCommunityIcons
            name="circle-outline"
            size={12}
            color={defaultStyles.colors.medium}
          />
        </View>
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
