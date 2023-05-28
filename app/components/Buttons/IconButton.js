import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { animateScale } from "../../assets/animations/AnimateScale";
const IconButton = ({ onPress, style, animate, ...props }) => {
  const [animation] = useState(new Animated.Value(1));

  const handlePress = () => {
    if (animate) {
      animateScale(animation, 1.2);
    }
    onPress();
  };
  useEffect(() => {
    if (animate) {
      animateScale(animation, 1.2);
    }
  }, []);
  const animatedStyle = {
    transform: [{ scale: animation }],
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <MaterialIcons {...props} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default IconButton;
