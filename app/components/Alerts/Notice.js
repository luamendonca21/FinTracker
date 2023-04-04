import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import Constants from "expo-constants";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";

import AppText from "../AppText";

import defaultStyles from "../../config/styles";

const Notice = ({ msg }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  const netInfo = useNetInfo();
  if (netInfo.type !== "unknown" && !netInfo.isInternetReachable)
    return (
      <Animated.View
        style={[
          {
            opacity,
            transform: [
              {
                translateY: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-20, 0],
                }),
              },
            ],
          },
          styles.container,
        ]}
      >
        <AppText style={styles.text}>{msg}</AppText>
      </Animated.View>
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
