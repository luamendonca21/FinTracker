import React from "react";
import { StyleSheet, Image } from "react-native";
import { Marker } from "react-native-maps";

const MapMarker = ({ onCalloutPress, name, coords, img, description }) => {
  return (
    <Marker
      onCalloutPress={onCalloutPress}
      coordinate={{ latitude: coords.lat, longitude: coords.long }}
      title={name}
      description={description}
    >
      <Image source={img} style={styles.image} />
    </Marker>
  );
};

const styles = StyleSheet.create({
  image: { height: 40, width: 30 },
});

export default MapMarker;
