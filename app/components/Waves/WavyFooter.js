import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const WavyFooter = ({ color, customWavePattern, customHeight, style }) => {
  return (
    <View style={styles.bottom}>
      <View style={{ backgroundColor: color, height: customHeight }}>
        <Svg
          height="160%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: "absolute", bottom: customHeight / 3.2 }}
        >
          <Path fill={color} d={customWavePattern} />
        </Svg>
      </View>
    </View>
  );
};
export default WavyFooter;

const styles = StyleSheet.create({
  bottom: { position: "absolute", bottom: 0, width: "100%" },
});
