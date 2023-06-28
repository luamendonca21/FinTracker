import React from "react";
import { View, StyleSheet } from "react-native";

import { AppText } from "../Text";
import Stars from "../Stars";
import ProfileImage from "../ProfileImage";

import defaultStyles from "../../config/styles";

const PICTURE_SIZE = 100;

const RankItem = ({ item, index }) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.number}>{index + 1}</AppText>
      <View style={{ alignItems: "flex-start" }}>
        <AppText style={styles.title}>{item.username}</AppText>
        <Stars points={item.points} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AppText style={styles.subtitle}>{item.points} pontos</AppText>
        <ProfileImage
          userId={item._id}
          size={{ width: PICTURE_SIZE, height: PICTURE_SIZE }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    alignSelf: "center",
    alignItems: "center",
    width: "98%",
    height: 90,
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: defaultStyles.colors.white,
    elevation: 2,
    flexDirection: "row",
  },
  title: { fontWeight: "bold", fontSize: 18 },
  subtitle: { fontWeight: "bold", fontSize: 15 },
  number: {
    color: defaultStyles.colors.primary,
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 40,
  },
});

export default RankItem;
