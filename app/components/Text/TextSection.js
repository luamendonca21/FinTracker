import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import defaultStyles from "../../config/styles";
const TextSection = ({
  titleStyle,
  subTitleStyle,
  title,
  subTitle,
  content,
  contentStyle,
}) => {
  return (
    <View>
      <AppText style={titleStyle}>{title}</AppText>
      {subTitle && <AppText style={subTitleStyle}>{subTitle}</AppText>}

      <AppText style={[styles.content, contentStyle]}>{content}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    lineHeight: 22,
    textAlign: "justify",
  },
});

export default TextSection;
