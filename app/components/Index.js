import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

const Index = ({ items, indexSelected }) => {
  const checkIndex = (index) => {
    return index == indexSelected ? "circle" : "circle-outline";
  };
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <MaterialCommunityIcons
          style={styles.icon}
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
    justifyContent: "space-evenly",
  },
  icon: { paddingHorizontal: 4 },
});

export default Index;
