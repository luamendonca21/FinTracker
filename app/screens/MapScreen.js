import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Image } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import Constants from "expo-constants";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  watchPositionAsync,
  LocationAccuracy,
} from "expo-location";
import Notice from "../components/Notice";

import AppText from "../components/AppText";

const MapScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const mapRef = useRef(MapView);
  const [markers, setMarkers] = useState([
    {
      lat: 33.049125,
      long: -16.3193884,
      title: "Cetáceo 1",
      description: "Este cetáceo...",
      id: 1,
      name: "Atlantic spotted Dolphin",
      details: [
        {
          id: 1,
          title: "Nome Científico",
          value: "Stenella frontalis",
        },
        {
          id: 2,
          title: "Idade",
          value: "1",
        },
        {
          id: 3,
          title: "Comprimento",
          value: "3m",
        },
        {
          id: 4,
          title: "Peso",
          value: "650kg",
        },
        {
          id: 5,
          title: "Localização",
          value: "Camâra de Lobos",
        },
      ],
      imageUrl: require("../assets/dolphins/Atlantic_spotted_dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
    {
      lat: 33.043059,
      long: -16.3369978,
      title: "Cetáceo 2",
      description: "Este cetáceo...",
      id: 2,
      name: "Bottlenose Dolphin",
      details: [
        {
          id: 1,
          title: "Nome Científico",
          value: "Tursiops",
        },
        {
          id: 2,
          title: "Idade",
          value: "1",
        },
        {
          id: 3,
          title: "Comprimento",
          value: "3m",
        },
        {
          id: 4,
          title: "Peso",
          value: "650kg",
        },
        {
          id: 5,
          title: "Localização",
          value: "Camâra de Lobos",
        },
      ],
      imageUrl: require("../assets/dolphins/Bottlenose_dolphin.jpg"),
      introduction:
        "They occur in Madeira all year around. Very active and playful at the surface. They often curiously approach boats and leap, bowride and stick their heads out of the water. The population of this species in Madeira consists of two ecotypes; the larger, pelagic offshore type and the smaller, coastal type with the latter community even containing resident groups.",
      history:
        "Common bottlenose dolphins get their name from their short, thick snout (or rostrum). They are generally gray in color. They can range from light gray to almost black on top near their dorsal fin and light gray to almost white on their belly.",
      migration:
        "Bottlenose dolphins of the United States migrate up and down the Atlantic coast, heading north in the spring, and south again in the autumn.",
    },
  ]);

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
    location &&
      watchPositionAsync(
        {
          accuracy: LocationAccuracy.Highest,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (response) => {
          console.log("Nova Localização", response);
          setLocation(response);
          mapRef.current?.animateCamera({ pitch: 60, center: response.coords });
        }
      );
  }, []);

  return (
    <>
      {!location && errorMessage && <Notice text={errorMessage} />}
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          showsUserLocation
          showsCompass={false}
          style={styles.map}
          mapPadding={{
            top: 5 + Constants.statusBarHeight,
            left: 5,
            right: 5,
            bottom: 5,
          }}
          initialRegion={{
            latitude: location ? location.coords.latitude : 32.37166518,
            longitude: location ? location.coords.longitude : -16.2749989,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {markers.map((item, index) => (
            <Marker
              onPress={() => navigation.navigate("CetaceanProfile", { item })}
              key={index}
              coordinate={{ latitude: item.lat, longitude: item.long }}
              title={item.title}
              description={item.description}
            >
              <Image
                source={require("../icon-sbg.png")}
                style={{ height: 40, width: 30 }}
              />
            </Marker>
          ))}
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
  map: { width: "100%", height: "95%", position: "absolute", top: 0 },
});

export default MapScreen;
