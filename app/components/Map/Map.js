import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import Constants from "expo-constants";

const Map = ({ style, children, mini, ...otherProps }) => {
  return (
    <MapView
      mapType="satellite"
      showsUserLocation
      showsCompass={false}
      style={[styles.map, style]}
      mapPadding={{
        top: mini ? 5 : 5 + Constants.statusBarHeight,
        left: 5,
        right: 5,
        bottom: 50,
      }}
      {...otherProps}
    >
      {children}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: { width: "100%", flex: 1 },
});

export default Map;
