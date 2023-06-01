import React from "react";
import { Marker } from "react-native-maps";

const MapMarker = ({ onCalloutPress, name, coords, img, description }) => {
  return (
    <Marker
      onCalloutPress={onCalloutPress}
      coordinate={{ latitude: coords.lat, longitude: coords.long }}
      title={name}
      description={description}
      icon={img}
    ></Marker>
  );
};

export default MapMarker;
