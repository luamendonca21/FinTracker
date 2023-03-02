import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import defaultStyles from "../../config/styles";

const Fade = ({ isVisible }) => {
  const opacityValue = useRef(new Animated.Value(0)).current;

  const fadeInAnimation = useRef(
    Animated.timing(opacityValue, {
      toValue: 0.4,
      duration: 500,
      useNativeDriver: true,
    })
  ).current;
  const fadeOutAnimation = useRef(
    Animated.timing(opacityValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    })
  ).current;
  useEffect(() => {
    if (isVisible) {
      fadeInAnimation.start();
    } else {
      fadeOutAnimation.start();
    }
  }, [isVisible]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: defaultStyles.colors.black,
        opacity: opacityValue,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Fade;
