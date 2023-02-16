import React from "react";
import { View, StyleSheet } from "react-native";
import defaultStyles from "../../config/styles";

const ListItemSeparator = ({
  color = defaultStyles.colors.transparent,
  width = "95%",
  style,
}) => {
  return (
    <View
      style={[
        styles.container,
        style,
        { backgroundColor: color, width: width },
      ]}
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
