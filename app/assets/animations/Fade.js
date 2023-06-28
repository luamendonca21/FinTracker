import React, { useRef, useEffect } from "react";
import { StyleSheet, Animated } from "react-native";
import defaultStyles from "../../config/styles";

const Fade = ({ isVisible, style, toast, children, value, duration }) => {
  const opacityValue = useRef(new Animated.Value(0)).current;

  const fadeInAnimation = useRef(
    Animated.timing(opacityValue, {
      toValue: value,
      duration: duration,
      useNativeDriver: true,
    })
  ).current;
  const fadeOutAnimation = useRef(
    Animated.timing(opacityValue, {
      toValue: 0,
      duration: duration,
      useNativeDriver: true,
    })
  ).current;
  useEffect(() => {
    if (isVisible) {
      fadeInAnimation.start();
    } else {
      if (toast) {
        setTimeout(() => fadeOutAnimation.start(), 1200);
      } else {
        fadeOutAnimation.start();
      }
    }
  }, [isVisible]);

  return (
    <Animated.View
      style={[
        {
          transform: toast && [
            {
              translateY: opacityValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-20, 0],
              }),
            },
          ],
          position: "absolute",
          width: "100%",
          height: "100%",
          flex: 1,
          backgroundColor: defaultStyles.colors.black,
          opacity: opacityValue,
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Fade;
