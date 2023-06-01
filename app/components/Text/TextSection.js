import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";

const TextSection = ({ title, content }) => {
  return (
    <View>
      <AppText style={styles.title}>{title}</AppText>
      <AppText style={styles.text}>{content}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  text: {
    lineHeight: 22,
    textAlign: "justify",
  },
});

export default TextSection;
