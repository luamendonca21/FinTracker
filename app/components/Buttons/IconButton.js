import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const IconButton = ({ onPress, style, animate, ...props }) => {
  const [animation] = useState(new Animated.Value(1));

  const handlePress = () => {
    if (animate) {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.5,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(animation, {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        }),
      ]).start();
    }
    onPress();
  };

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
