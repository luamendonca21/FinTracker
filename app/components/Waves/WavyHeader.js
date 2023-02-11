import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { StyleSheet } from "react-native";

const WavyHeader = ({ color, customWavePattern, customHeight, style }) => {
  return (
    <View style={styles.top}>
      <View style={{ backgroundColor: color, height: customHeight }}>
        <Svg
          height="130%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: "absolute", top: customHeight / 1.7 }}
        >
          <Path fill={color} d={customWavePattern} />
        </Svg>
      </View>
    </View>
  );
};
export default WavyHeader;

const styles = StyleSheet.create({
  top: { position: "absolute", width: "100%" },
});
