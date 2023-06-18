import React from "react";
import { StyleSheet } from "react-native";
import { Marker, Callout } from "react-native-maps";

import { AppText } from "../Text";

import { formatDate } from "../../utils/dateUtils";

import defaultStyles from "../../config/styles";

const MapMarker = ({
  onCalloutPress,
  name,
  coords,
  index,
  img,
  timestamp,
  description,
}) => {
  return (
    <Marker
      onCalloutPress={onCalloutPress}
      coordinate={{ latitude: coords.lat, longitude: coords.long }}
      icon={
        onCalloutPress
          ? img
          : index != null && index == 0
          ? require("../../assets/start-point.png")
          : index != null && index != 0
          ? require("../../assets/mapMarker.png")
          : null
      }
    >
      {onCalloutPress && (
        <Callout>
          <AppText style={styles.title}>{name}</AppText>
          <AppText>{formatDate(timestamp)}</AppText>
          <AppText style={styles.description}>{description}</AppText>
        </Callout>
      )}
      {index != null && index == 0 && (
        <Callout>
          <AppText style={styles.title}>Ponto inicial</AppText>
        </Callout>
      )}
    </Marker>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
  },
  description: {
    color: defaultStyles.colors.secondary,
    fontWeight: "bold",
  },
});
export default MapMarker;
