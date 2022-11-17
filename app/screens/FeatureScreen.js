import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AppText from "../components/AppText";
import defaultStyles from "../config/colors";
import AppSecondaryButton from "../components/AppSecondaryButton";
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
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: defaultStyles.primary,
  },
  subTitle: {
    fontSize: 20,
    marginTop: 5,
    textAlign: "center",
    lineHeight: 28,
    width: 260,
  },
  button: {
    alignItems: "flex-end",
    paddingRight: 30,
    paddingBottom: 30,
  },
});

export default FeatureScreen;
