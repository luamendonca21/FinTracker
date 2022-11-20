import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import AppText from "./AppText";
import { MaterialIcons } from "@expo/vector-icons";
import defaultStyles from "../config/styles";

const BoxItem = ({ item }) => {
  return (
    <TouchableHighlight
      onPress={() => console.log("Pressed")}
      underlayColor={defaultStyles.colors.light}
      style={styles.container}
    >
      <>
        <MaterialIcons
          name={item.icon}
          size={50}
          color={defaultStyles.colors.primary}
        />
        <View style={styles.itemDescription}>
          <AppText style={styles.title}>{item.title}</AppText>
          <AppText style={styles.subTitle}>{item.subTitle}</AppText>
        </View>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "47%",
    height: 180,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: defaultStyles.colors.white,
    alignItems: "center",
    paddingVertical: 15,
    justifyContent: "flex-start",
    borderRadius: 20,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  subTitle: {
    lineHeight: 22,
    textAlign: "center",
    paddingHorizontal: 4,
  },
});

export default BoxItem;
