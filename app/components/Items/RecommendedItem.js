import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";

import { AppText } from "../Text";
import settings from "../../config/settings";
import defaultStyles from "../../config/styles";

const RecommendedItem = ({ item, onPress }) => {
  const baseURL = settings.apiUrl;

  return (
    <TouchableHighlight
      style={{ borderRadius: 15 }}
      underlayColor={defaultStyles.colors.light}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: `${baseURL}\\${item.picture.src}` }}
        />
        <View style={styles.textContainer}>
          <AppText numberOfLines={1} style={styles.title}>
            {item.name}
          </AppText>
          <AppText numberOfLines={3} style={styles.subTitle}>
            {item.introduction}
          </AppText>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    alignItems: "center",
    width: "98%",
    marginVertical: 5,
    borderRadius: 15,
    backgroundColor: defaultStyles.colors.white,
    elevation: 2,
    flexDirection: "row",
  },
  image: {
    width: 100,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    height: "100%",
  },
  textContainer: {
    padding: 10,
    width: "98%",
  },
  title: { fontSize: 18, width: "75%", fontWeight: "bold" },
  subTitle: { width: "75%" },
});

export default RecommendedItem;
