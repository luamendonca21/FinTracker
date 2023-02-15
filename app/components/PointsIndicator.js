import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import AppText from "./AppText";

import defaultStyles from "../config/styles";

const PointsIndicator = ({ points }) => {
  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <AppText style={styles.text}>{points} pontos</AppText>
      </View>
      <View style={styles.starsContainer}>
        {(() => {
          const stars = [];
          for (let i = 0; i < Math.floor(points / 20); i++) {
            stars.push(
              <MaterialIcons
                key={i}
                name="stars"
                size={32}
                color={defaultStyles.colors.yellow}
              />
            );
          }
          return stars;
        })()}
      </View>
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
  starsContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    color: defaultStyles.colors.white,
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default PointsIndicator;
