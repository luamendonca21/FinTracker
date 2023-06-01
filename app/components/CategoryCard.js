import React from "react";
import { View, StyleSheet } from "react-native";

import { AppText } from "./Text";
import { Carousel } from "./Carousels/ImageCarousel";

import defaultStyles from "../config/styles";

const CategoryCard = ({ data, title, subTitle }) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{title}</AppText>
      <AppText style={styles.subTitle}>{subTitle}</AppText>
      <Carousel data={data} />
      {/* <LinkButton color="black" title="See more" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: defaultStyles.colors.white,
    width: "100%",
    marginVertical: 5,
    elevation: 2,
    padding: 10,
  },
  title: {
    fontWeight: "700",
    color: defaultStyles.colors.black,
    fontSize: 18,
    marginBottom: 10,
    marginHorizontal: 5,
  },
  subTitle: {
    color: defaultStyles.colors.gray,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  skeleton: {
    height: 180,
    width: "100%",
  },
});

export default CategoryCard;
