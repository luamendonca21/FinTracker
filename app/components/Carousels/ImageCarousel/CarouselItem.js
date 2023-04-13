import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";

import { Skeleton } from "../../Loaders";
import settings from "../../../config/settings";

import AppText from "../../AppText";

import defaultStyles from "../../../config/styles";

const CarouselItem = ({ item, onPress }) => {
  const baseURL = settings.apiUrl;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <TouchableHighlight
      style={{ borderRadius: 15 }}
      underlayColor={defaultStyles.colors.light}
      onPress={onPress}
    >
      <View style={styles.item}>
        <Image
          style={styles.image}
          source={{ uri: `${baseURL}\\${item.picture.src}` }}
          onLoadEnd={() => setIsLoading(false)}
        />
        <AppText numberOfLines={2} style={styles.itemTitle}>
          {item.name}
        </AppText>
        {isLoading && <Skeleton />}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 15,
    elevation: 2,
  },
  itemTitle: {
    position: "absolute",
    fontWeight: "700",
    height: "98%",
    color: defaultStyles.colors.white,
    marginHorizontal: 8,
    textAlignVertical: "bottom",
  },
  image: {
    width: 115,
    height: 180,
    alignSelf: "center",
    borderRadius: 15,
  },
});

export default CarouselItem;
