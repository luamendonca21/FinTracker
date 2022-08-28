import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
const WavyHeader = ({
  color,
  customWavePattern,
  customHeight,
  customTop,
  style,
}) => {
  return (
    <View style={style}>
      <View style={{ backgroundColor: color, height: customHeight }}>
        <Svg
          height="130%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: "absolute", top: customTop }}
        >
          <Path fill={color} d={customWavePattern} />
        </Svg>
      </View>
    </View>
  );
};
export default WavyHeader;
