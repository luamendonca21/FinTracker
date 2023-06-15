import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import defaultStyles from "../../config/styles";
const TextSection = ({ title, subTitle, content }) => {
  return (
    <View>
      <AppText style={styles.title}>{title}</AppText>
      {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}

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
  subTitle: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 22,
    color: defaultStyles.colors.secondary,
    marginTop: 10,
  },
});

export default TextSection;
