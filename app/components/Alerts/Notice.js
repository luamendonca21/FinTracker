import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";
import Fade from "../../assets/animations/Fade";
import AppText from "../AppText";

import defaultStyles from "../../config/styles";

const Notice = ({ isVisible, msg }) => {
  return (
    <Fade
      value={1}
      duration={300}
      toast
      isVisible={isVisible}
      style={styles.container}
    >
      <AppText style={styles.text}>{msg}</AppText>
    </Fade>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.danger,
    width: "95%",
    height: 50,
    position: "absolute",
    zIndex: 1,
    borderRadius: 15,
    alignSelf: "center",
    top: 10 + Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  text: {
    color: defaultStyles.colors.white,
  },
});

export default Notice;
