import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

const Index = ({ features, indexSelected }) => {
  const checkIndex = (index) => {
    return index == indexSelected ? "circle" : "circle-outline";
  };
  return (
    <View style={styles.container}>
      {features.map((item, index) => (
        <MaterialCommunityIcons
          key={index}
          name={checkIndex(index)}
          size={12}
          color={defaultStyles.colors.medium}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 160,
    justifyContent: "space-evenly",
  },
});

export default Index;
