import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import defaultStyles from "../config/styles";

const SIZE = 60;

const GLOW_INITIAL_SCALE = 1.7; //Scale of the glow
const GLOW_MINIMUM_SCALE = 1.4;
const GLOW_DURATION = 2000;

const GlowingSun = ({ onPress }) => {
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
          source={require("../assets/animations/glow.png")}
          style={styles.image}
        />
      </Animated.View>
      <TouchableHighlight
        underlayColor={defaultStyles.colors.light}
        onPress={onPress}
        style={{
          width: SIZE,
          height: SIZE,
          elevation: 2,
          backgroundColor: "white",
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons
          name="leaderboard"
          size={32}
          color={defaultStyles.colors.secondary}
        />
      </TouchableHighlight>
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
  glowContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 8, //Top offset to align glow to image
    bottom: 0,
    left: 0,
    right: 4, // Right offset to align glow to image
  },
});

export default GlowingSun;
