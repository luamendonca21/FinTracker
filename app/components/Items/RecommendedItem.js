import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "72%",
            }}
          >
            <AppText numberOfLines={1} style={styles.title}>
              {item.name}
            </AppText>
            <View style={styles.countsContainer}>
              <AppText style={styles.counts}>{item.counts}</AppText>
              <MaterialIcons name="favorite" size={18} color="red" />
            </View>
          </View>
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
    width: "100%",
  },
  title: {
    width: "70%",
    fontSize: 18,
    fontWeight: "bold",
  },
  counts: {
    fontSize: 15,
    fontWeight: "bold",
  },
  countsContainer: {
    flexDirection: "row",
    width: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  subTitle: { width: "70%" },
});

export default RecommendedItem;
