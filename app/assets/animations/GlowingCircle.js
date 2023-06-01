import * as React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Animated as NativeAnimated } from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { animateScale } from "./AnimateScale";
import { AppText } from "../../components/Text";

import defaultStyles from "../../config/styles";

const SIZE = 70;

const GLOW_INITIAL_SCALE = 1.9; //Scale of the glow
const GLOW_MINIMUM_SCALE = 1.4;
const GLOW_DURATION = 2000;

const GlowingSun = ({ onPress, ...otherProps }) => {
  const [animation] = React.useState(new NativeAnimated.Value(1));

  const animatedStyle = {
    transform: [{ scale: animation }],
  };

  const handlePress = () => {
    animateScale(animation, 1.1);
    setTimeout(() => {
      onPress();
    }, 250);
  };

  const useGlowAnimation = () => {
    return useAnimatedStyle(() => ({
      transform: [
        {
          scale: withRepeat(
            withSequence(
              // Go to minimal value on half scaling duration
              withTiming(GLOW_MINIMUM_SCALE, { duration: GLOW_DURATION / 2 }),
              //and go to initial value during other half
              withTiming(GLOW_INITIAL_SCALE, { duration: GLOW_DURATION / 2 })
            ),
            // Loop the animation
            -1,
            // Loop in both direction (small=> big, big => small)
            true
          ),
        },
      ],
    }));
  };

  const glowAnimation = useGlowAnimation();

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.glowContainer, glowAnimation]}>
        <Image
          source={require("../animations/glow.png")}
          style={styles.image}
        />
      </Animated.View>
      <NativeAnimated.View style={animatedStyle}>
        <TouchableHighlight
          onPress={handlePress}
          {...otherProps}
          style={styles.circleContainer}
          underlayColor={defaultStyles.colors.light}
        >
          <View
            underlayColor={defaultStyles.colors.light}
            style={styles.circleContainer}
          >
            <MaterialIcons
              name="leaderboard"
              size={42}
              color={defaultStyles.colors.yellow}
            />
            <AppText style={styles.text}>Ranking</AppText>
          </View>
        </TouchableHighlight>
      </NativeAnimated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: SIZE,
    height: SIZE,
  },
  container: {
    alignItems: "center",
    overflow: "visible",
  },
  circleContainer: {
    width: SIZE,
    height: SIZE,
    elevation: 0.5,
    backgroundColor: "white",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  glowContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 8, //Top offset to align glow to image
    bottom: 0,
    left: 0,
    right: 4, // Right offset to align glow to image
  },
  text: { fontSize: 9, fontWeight: "bold" },
});

export default GlowingSun;
