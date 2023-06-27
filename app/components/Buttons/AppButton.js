import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import AppText from "../Text/AppText";

import { animateScale } from "../../assets/animations/AnimateScale";

import defaultStyles from "../../config/styles";

const AppButton = ({
  title,
  color = "primary",
  style,
  onPress,
  ...otherProps
}) => {
  const [animation] = useState(new Animated.Value(1));

  const handlePress = () => {
    // animation
    animateScale(animation, 1.04);
    setTimeout(() => {
      onPress();
    }, 300);
  };

  const animatedStyle = {
    transform: [{ scale: animation }],
  };
  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity onPress={handlePress} {...otherProps}>
        <LinearGradient
          colors={[
            defaultStyles.colors[color],
            color === "primary"
              ? defaultStyles.colors.secondary
              : color === "danger"
              ? defaultStyles.colors.dangerLight
              : color === "secondary"
              ? defaultStyles.colors.primary
              : defaultStyles.colors.white,
          ]}
          start={[0, 0]}
          end={[1, 1]}
          style={[styles.container, style]}
        >
          <AppText style={styles.text}>{title}</AppText>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    padding: 12,
    elevation: 2,
  },
  gradient: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  text: { fontSize: 18, fontWeight: "bold", color: defaultStyles.colors.white },
});

export default AppButton;
