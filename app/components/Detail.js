import React from "react";
import { StyleSheet, View } from "react-native";
import defaultStyles from "../config/styles";
import AppText from "./AppText";

const Detail = ({ title, subTitle }) => {
  const transform = (string) => {
    const toUpperCase = string.charAt(0).toUpperCase() + string.substring(1);
    const splitOnCapitalLetters = toUpperCase.split(/(?=[A-Z])/);
    let result = "";
    splitOnCapitalLetters.forEach((element) => {
      result += ` ` + element;
    });
    return result;
  };
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{transform(title)}</AppText>
      <AppText style={styles.subTitle}>{subTitle}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultStyles.colors.white,
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    elevation: 2,
    paddingVertical: 8,
    paddingHorizontal: 35,
    marginRight: 10,
  },
  title: { fontWeight: "bold", color: defaultStyles.colors.tertiary },
  subTitle: { color: defaultStyles.colors.black },
});

export default Detail;
