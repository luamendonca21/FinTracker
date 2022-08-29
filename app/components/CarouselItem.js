import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import AppText from "./AppText";
import defaultStyles from "../config/styles";
function CarouselItem({ imageUrl, title }) {
  return (
    <TouchableOpacity onPress={() => console.log("Tapped")}>
      <View style={styles.item}>
        <Image style={styles.image} source={imageUrl} />
        <AppText style={styles.itemTitle}>{title}</AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 5,
    marginVertical: 5,
    width: 114,
  },
  itemTitle: {
    color: defaultStyles.colors.black,
    position: "absolute",
    fontWeight: "700",
    color: defaultStyles.colors.white,
    marginHorizontal: 10,
    marginVertical: 150,
  },
  image: {
    width: 114,
    height: 180,
    alignSelf: "center",
    borderRadius: 15,
  },
});

export default CarouselItem;
