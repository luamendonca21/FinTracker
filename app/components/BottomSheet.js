import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import AppText from "./AppText";
import IconButton from "./Buttons/IconButton";
import defaultStyles from "../config/styles";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const windowHeight = Dimensions.get("window").height;

const BottomSheet = ({ children }) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -windowHeight / 3);
    })
    .onEnd(() => {
      if (translateY.value > -windowHeight / 4) {
        translateY.value = withSpring(0, {
          damping: 15,
        });
      } else if (translateY.value < -windowHeight / 3.5) {
        translateY.value = withSpring(-windowHeight / 3, { damping: 15 });
      }
    });

  useEffect(() => {
    translateY.value = withSpring(-windowHeight / 3, { damping: 15 });
  }, []);
  const rBottomSheetStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: translateY.value }] };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    padding: 15,
    height: windowHeight,
    width: "100%",
    backgroundColor: defaultStyles.colors.white,
    position: "absolute",
    top: windowHeight,
    borderRadius: 25,
    elevation: 5,
  },
  line: {
    width: 75,
    height: 3,
    backgroundColor: defaultStyles.colors.black,
    alignSelf: "center",
    marginVertical: 5,
    marginBottom: 15,
    borderRadius: 2,
  },
});

export default BottomSheet;
