import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import AppText from "../components/AppText";

const MapScreen = ({ props }) => {
  const [location, setLocation] = useState(null);

  const mapRef = useRef(MapView);

  const requestLocationPermissions = async () => {
    const { granted } = await requestForegroundPermissionsAsync();
    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      console.log("Localização atual=>", currentPosition);
    }
  };
  useEffect(() => {
    requestLocationPermissions();
  }, []);
  useEffect(() => {
    watchPositionAsync(
      {
        accuracy: LocationAccuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
      },
      (response) => {
        console.log("Nova Localização", response);
        setLocation(response);
        mapRef.current?.animateCamera({ pitch: 70, center: response.coords });
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          >
            <Callout>
              <AppText>Estou aqui</AppText>
            </Callout>
          </Marker>
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: { flex: 1, width: "100%" },
});

export default MapScreen;
