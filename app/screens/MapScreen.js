import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import Notice from "../components/Notice";

import AppText from "../components/AppText";

const MapScreen = ({ props }) => {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const mapRef = useRef(MapView);

  const requestLocationPermissions = async () => {
    const { granted } = await requestForegroundPermissionsAsync();
    if (!granted) {
      setErrorMessage("Permissão para aceder à localização recusada.");
      return;
    }
    const currentPosition = await getCurrentPositionAsync();
    setLocation(currentPosition);
    console.log("Localização atual=>", currentPosition);
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
    <>
      <Notice text={errorMessage} />
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location ? location.coords.latitude : 37.78825,
            longitude: location ? location.coords.longitude : -122.4324,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {location && (
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
          )}
        </MapView>
      </View>
    </>
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
