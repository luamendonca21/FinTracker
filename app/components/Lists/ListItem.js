import React from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../AppText";

import defaultStyles from "../../config/styles";

const ListItem = ({
  underlayColor = defaultStyles.colors.light,
  title,
  style,
  onPress,
  IconComponent,
  chevrons,
}) => {
  return (
    <TouchableHighlight underlayColor={underlayColor} onPress={onPress}>
      <View style={[styles.container, style]}>
        {IconComponent}
        <AppText style={[styles.text, style]}>{title}</AppText>
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
  },
  text: { flex: 1 },
});

export default ListItem;
