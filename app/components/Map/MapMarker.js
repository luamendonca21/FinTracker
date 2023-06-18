import React from "react";
import { StyleSheet } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { AppText } from "../Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };
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
