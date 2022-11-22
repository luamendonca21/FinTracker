import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import defaultStyles from "../config/styles";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const windowHeight = Dimensions.get("window").height;

const BottomSheet = ({ props }) => {
  const translationY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translationY.value };
    })
    .onUpdate((event) => {
      translationY.value = event.translationY + context.value.y;
      translationY.value = Math.max(translationY.value, -windowHeight / 3);
      console.log(translationY.value);
    })
    .onEnd(() => {
      if (translationY.value > -windowHeight / 3) {
        translationY.value = withSpring(0, { damping: 50 });
      } else if (translationY.value < -windowHeight / 1.5) {
        translationY.value = withSpring(-windowHeight / 3, { damping: 50 });
      }
    });

  useEffect(() => {
    translationY.value = withSpring(-windowHeight / 3, { damping: 50 });
  }, []);
  const rBottomSheetStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: translationY.value }] };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line}></View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
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
    height: 4,
    backgroundColor: defaultStyles.colors.black,
    alignSelf: "center",
    marginVertical: 15,
    borderRadius: 2,
  },
});

export default BottomSheet;
