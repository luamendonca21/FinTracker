import React from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
const WavyFooter = ({
  color,
  customWavePattern,
  customHeight,
  customButtom,
  style,
}) => {
  return (
    <View style={style}>
      <View style={{ backgroundColor: color, height: customHeight }}>
        <Svg
          height="160%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: "absolute", bottom: customButtom }}
        >
          <Path fill={color} d={customWavePattern} />
        </Svg>
      </View>
    </View>
  );
};
export default WavyFooter;