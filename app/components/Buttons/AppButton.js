import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";

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
      <TouchableOpacity
        onPress={handlePress}
        {...otherProps}
        style={[
          styles.container,
          style,
          { backgroundColor: defaultStyles.colors[color] },
        ]}
      >
        <AppText style={styles.text}>{title}</AppText>
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
  text: { fontSize: 18, fontWeight: "bold", color: defaultStyles.colors.white },
});

export default AppButton;
