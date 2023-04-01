import React from "react";
import { View, StyleSheet } from "react-native";
import defaultStyles from "../config/styles";
import { MaterialIcons } from "@expo/vector-icons";

const Stars = ({ points }) => {
  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
});

export default Stars;
