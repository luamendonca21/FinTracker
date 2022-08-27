import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import defaultStyles from "../config/styles";
import AppText from "./AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const ListItem = ({ title, onPress, icon, chevrons }) => {
  return (
    <TouchableHighlight
      underlayColor={defaultStyles.colors.light}
      onPress={onPress}
    >
      <View style={styles.container}>
        {icon && (
          <MaterialCommunityIcons
            style={styles.icon}
            name={icon}
            size={30}
            color={defaultStyles.colors.black}
          />
        )}
        <AppText style={styles.text}>{title}</AppText>
        {chevrons && (
          <MaterialCommunityIcons
            name="chevron-right"
            size={30}
            color={defaultStyles.colors.black}
          />
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    width: "100%",
    padding: 12,
    shadowColor: defaultStyles.colors.black,
  },
  text: { flex: 1 },
  icon: {
    marginRight: 10,
  },
});

export default ListItem;
