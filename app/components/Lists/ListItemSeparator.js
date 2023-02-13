import React from "react";
import { View, StyleSheet } from "react-native";
import defaultStyles from "../../config/styles";

const ListItemSeparator = ({
  color = defaultStyles.colors.transparent,
  width = "100%",
}) => {
  return (
    <View
      style={[styles.container, { backgroundColor: color, width: width }]}
    ></View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    height: 1,
  },
});

export default ListItemSeparator;
