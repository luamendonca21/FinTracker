import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import {
  GestureDetector,
  Gesture,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import AppText from "./AppText";

import defaultStyles from "../config/styles";

const windowHeight = Dimensions.get("window").height;

const BottomSheet = ({
  children,
  scroll,
  maxValue,
  minValue,
  initialValue,
  title,
}) => {
  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, maxValue);
      translateY.value = Math.min(translateY.value, minValue);
    })
    .onEnd(() => {
      translateY.value = withSpring(initialValue, { damping: 15 });
    });

  useEffect(() => {
    translateY.value = withSpring(initialValue, { damping: 15 });
  }, []);
  const rBottomSheetStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: translateY.value }] };
  });
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
        <View style={styles.line} />
        <AppText style={styles.title}>{title}</AppText>
        {scroll ? (
          <View
            style={{
              padding: "2%",
              borderRadius: 15,
              borderWidth: 1,
              borderColor: defaultStyles.colors.transparent,
              height: "45%",
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
              {children}
            </ScrollView>
          </View>
        ) : (
          children
        )}
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
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
  line: {
    width: 75,
    height: 3,
    backgroundColor: defaultStyles.colors.black,
    alignSelf: "center",
    marginVertical: 2,
    marginBottom: 10,
    borderRadius: 2,
  },
});

export default BottomSheet;
