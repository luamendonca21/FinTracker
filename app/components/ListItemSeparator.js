import React from "react";
import { View, StyleSheet } from "react-native";
import defaultStyles from "../config/styles";
const ListItemSeparator = (props) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    height: 1,
    backgroundColor: defaultStyles.colors.light,
  },
});

export default ListItemSeparator;
