import React from "react";
import { View, StyleSheet } from "react-native";

import Stars from "./Stars";
import { AppText } from "./Text";

import defaultStyles from "../config/styles";

const PointsIndicator = ({ points }) => {
  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <AppText style={styles.text}>{points} pontos</AppText>
      </View>
      <Stars points={points} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    paddingHorizontal: 5,
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointsContainer: {
    width: "90%",
    backgroundColor: defaultStyles.colors.yellow,
    alignItems: "center",
    borderRadius: 30,
    padding: 4,
    elevation: 2,
  },
  text: {
    color: defaultStyles.colors.white,
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default PointsIndicator;
