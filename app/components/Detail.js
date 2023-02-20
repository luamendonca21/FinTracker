import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "./AppText";

import defaultStyles from "../config/styles";

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
      <AppText style={styles.title}>{title}</AppText>
      <AppText
        style={{
          color: subTitle
            ? defaultStyles.colors.black
            : defaultStyles.colors.medium,
        }}
      >
        {subTitle ? subTitle : `Adicionar ${title.toLowerCase()}`}
      </AppText>
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
  title: { fontWeight: "bold", color: defaultStyles.colors.primary },
});

export default Detail;
