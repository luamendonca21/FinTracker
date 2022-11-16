import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import AppText from "./AppText";
import defaultStyles from "../config/colors";
import { MaterialIcons } from "@expo/vector-icons";

const BoxItem = ({ item }) => {
  return (
    <TouchableHighlight
      onPress={() => console.log("Pressed")}
      underlayColor={defaultStyles.light}
      style={styles.container}
    >
      <>
        <MaterialIcons
          name={item.icon}
          size={50}
          color={defaultStyles.primary}
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
    backgroundColor: defaultStyles.white,
    alignItems: "center",
    paddingVertical: 15,
    justifyContent: "space-between",
    borderRadius: 20,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  subTitle: { lineHeight: 22, textAlign: "center", paddingHorizontal: 16 },
});

export default BoxItem;
