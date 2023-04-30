import { Animated } from "react-native";

export const animateScale = (animation) => {
  Animated.sequence([
    Animated.timing(animation, {
      toValue: 1.2,
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
