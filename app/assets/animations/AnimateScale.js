import { Animated } from "react-native";

export const animateScale = (animation, value) => {
  Animated.sequence([
    Animated.timing(animation, {
      toValue: value,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.spring(animation, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }),
  ]).start();
};
