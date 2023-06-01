import React, { useState } from "react";
import { View, StyleSheet, TouchableHighlight } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { AppText } from "../Text";

import defaultStyles from "../../config/styles";

const BoxItem = ({ item, onPress }) => {
  const [pressed, setPressed] = useState(false);
  return (
    <TouchableHighlight
      onHideUnderlay={() => {
        setPressed(false);
      }}
      onShowUnderlay={() => {
        setPressed(true);
      }}
      onPress={() => {
        onPress();
      }}
      underlayColor={defaultStyles.colors.white}
      style={[
        styles.container,
        pressed && {
          borderColor: defaultStyles.colors.secondary,
          borderWidth: 1,
        },
      ]}
    >
      <>
        <MaterialIcons
          name={item.icon}
          size={50}
          color={defaultStyles.colors.thirdly}
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
    height: 200,
    marginHorizontal: 6,
    marginVertical: 6,
    backgroundColor: defaultStyles.colors.white,
    alignItems: "center",
    paddingVertical: 15,
    justifyContent: "flex-start",
    borderRadius: 20,
    elevation: 2,
    paddingHorizontal: 2,
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
