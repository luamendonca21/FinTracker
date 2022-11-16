import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import { MaterialIcons } from "@expo/vector-icons";

import defaultStyles from "../config/colors";
const PointsIndicator = ({ props }) => {
  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <AppText style={styles.text}>40 points</AppText>
      </View>
      <View style={styles.starsContainer}>
        <MaterialIcons name="stars" size={32} color={defaultStyles.thirdly} />
        <MaterialIcons name="stars" size={32} color={defaultStyles.thirdly} />
        <MaterialIcons name="stars" size={32} color={defaultStyles.thirdly} />
        <MaterialIcons name="stars" size={32} color={defaultStyles.thirdly} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "45%",
    //backgroundColor: "black",
    padding: 10,
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointsContainer: {
    width: "100%",
    backgroundColor: defaultStyles.thirdly,
    alignItems: "center",
    borderRadius: 30,
    padding: 4,
    elevation: 2,
  },
  starsContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    color: defaultStyles.white,
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default PointsIndicator;
