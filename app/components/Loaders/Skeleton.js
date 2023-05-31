import React, { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import defaultStyles from "../../config/styles";
const { width } = Dimensions.get("window");
const Skeleton = ({ style }) => {
  const x = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(x, { toValue: 1, useNativeDriver: true, duration: 1000 })
    ).start();
  }, []);
  return (
    <View style={styles.container}>
      <View style={[styles.box, style]}>
        <Animated.View
          style={[
            styles.line,
            {
              transform: [
                {
                  translateX: x.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-width, width],
                  }),
                },
              ],
            },
          ]}
        >
          <LinearGradient
            colors={[
              defaultStyles.colors.light,
              defaultStyles.colors.white,
              defaultStyles.colors.light,
            ]}
            style={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  box: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    backgroundColor: defaultStyles.colors.light,
    overflow: "hidden",
  },
  line: {
    height: "100%",
    width: "50%",
    backgroundColor: defaultStyles.colors.white,
  },
});

export default Skeleton;
