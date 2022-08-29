import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import AppText from "./AppText";
import defaultStyles from "../config/styles";
function CarouselItem({ item, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <Image style={styles.image} source={item.imageUrl} />
        <AppText numberOfLines={1} style={styles.itemTitle}>
          {item.name}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 15,
    elevation: 3,
  },
  itemTitle: {
    position: "absolute",
    fontWeight: "700",
    color: defaultStyles.colors.white,
    marginHorizontal: 10,
    marginVertical: 150,
  },
  image: {
    width: 115,
    height: 180,
    alignSelf: "center",
    borderRadius: 15,
  },
});

export default CarouselItem;
