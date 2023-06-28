import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { animateScale } from "../../assets/animations/AnimateScale";
const IconButton = ({
  onPress,
  style,
  animate,
  animateOnRender,
  family = MaterialIcons,
  ...props
}) => {
  const Component = family;
  const [animation] = useState(new Animated.Value(1));

  const handlePress = () => {
    if (animate) {
      animateScale(animation, 1.2);
    }

    animate && !animateOnRender ? setTimeout(onPress, 100) : onPress();
  };

  const animatedStyle = {
    transform: [{ scale: animation }],
  };

  useEffect(() => {
    if (animate && animateOnRender) {
      animateScale(animation, 1.2);
    }
  }, []);

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
      {...props}
    >
      <Animated.View style={animatedStyle}>
        <Component {...props} />
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
