import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { Map, MapMarker } from "../components/Map";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppText } from "../components/Text";
import Icon from "../components/Icon";
import Fade from "../assets/animations/Fade";
import BottomSheet from "../components/BottomSheet";
import { ListOptions } from "../components/Lists";
import { ActivityIndicator } from "../components/Loaders";

import LocationContext from "../providers/LocationProvider";

import useApi from "../hooks/useApi";
import eventsApi from "../api/events";

import { activityFilters as filters } from "../info/mapFilters";
import defaultStyles from "../config/styles";
import { Polyline } from "react-native-maps";

const windowHeight = Dimensions.get("window").height;

const CetaceanActivityScreen = ({ navigation, route }) => {
  const { individualId } = route.params;

  // -------- STATE MANAGEMENT -------------
  const [isBottomSheetActive, setBottomSheetActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [inputs, setInputs] = useState([]);
  const [filtersActive, setFiltersActive] = useState([]);
  const [events, setEvents] = useState([]);

  // ---------- APIS -----------
  const [getEventsById, isLoadingEventsById, errorGetEventsById] = useApi(
    eventsApi.getEventsById
  );
  // ------- UTILITIES -------
  const isFilterActive = (id) => {
    return inputs.find((item) => item.id === id);
  };

  const handleFilterOptionPress = (id, title, category) => {
    let newfilter = { id: id, title: title, category: category };
    if (!isFilterActive(id)) {
      setInputs([...inputs, newfilter]);
    } else {
      setInputs(inputs.filter((elemento) => elemento.id !== id));
    }
  };

  const handleFilterPress = () => {
    setBottomSheetActive(!isBottomSheetActive);
    setIsAnimating(true);
  };

  const handleCloseBottomSheet = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setBottomSheetActive(false);
    }, 460);
  };

  const handleApplyChanges = () => {
    if (inputs.length === 0) {
      fetchEvents();
    }
    setFiltersActive(inputs);
    setIsAnimating(false);
    setTimeout(() => {
      setBottomSheetActive(false);
    }, 460);
  };

  const fetchEvents = async () => {
    // get cetaceans from backend
    getEventsById(individualId)
      .then((response) => {
        setEvents(response.events);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const extractCoordinates = () => {
    const orderedEvents = events.sort((a, b) => a.timestamp - b.timestamp);

    const extractedCoordinates = orderedEvents.map((event) => ({
      latitude: event.location.coordinates[1],
      longitude: event.location.coordinates[0],
      latitudeDelta: 180,
      longitudeDelta: 180,
    }));
    console.log(extractedCoordinates);
    return extractedCoordinates;
  };

  // ---------- LIFECYCLE HOOKS ---------------

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    events.forEach((event) => console.log(event.location));
  }, [events]);

  useEffect(() => {
    console.log(filtersActive);
  }, [filtersActive]);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ActivityIndicator visible={isLoadingEventsById} />
        <View style={styles.container}>
          <Map
            style={styles.map}
            initialRegion={{
              latitude: 35.6074,
              longitude: 140.1065,
              latitudeDelta: 180,
              longitudeDelta: 180,
            }}
          >
            <Polyline
              coordinates={extractCoordinates()}
              strokeColor={defaultStyles.colors.thirdly}
              strokeWidth={4}
              lineDashPattern={[10, 20]}
            />
            {extractCoordinates().length > 0 && (
              <MapMarker
                name="Ponto inicial"
                img={require("../assets/mapMarker.png")}
                coords={{
                  lat: extractCoordinates()[0].latitude,
                  long: extractCoordinates()[0].longitude,
                }}
                /* description="Ver perfil" */
              />
            )}
          </Map>
          <Icon
            onPress={handleFilterPress}
            style={styles.icon}
            icon="filter"
            size={22}
            iconColor={defaultStyles.colors.black}
            backgroundColor={defaultStyles.colors.white}
          />

          {isBottomSheetActive && (
            <>
              <Fade duration={500} value={0.4} isVisible={isAnimating} />
              <BottomSheet
                scroll
                closeBottomSheet={handleCloseBottomSheet}
                onPress={handleApplyChanges}
                maxValue={-windowHeight / 1.5}
                minValue={-windowHeight / 1.6}
                initialValue={-windowHeight / 1.5}
                title="Filtros"
              >
                {Array.from(
                  new Set(filters.map((filter) => filter.category))
                ).map((category) => (
                  <View key={category} style={styles.categoryTitle}>
                    <AppText style={styles.categoryTitle}>{category}</AppText>
                    <ListOptions
                      options={filters.filter(
                        (filter) => filter.category === category
                      )}
                      optionsActive={inputs}
                      onPress={(itemId, itemTitle, itemCategory) =>
                        handleFilterOptionPress(itemId, itemTitle, itemCategory)
                      }
                    />
                  </View>
                ))}
              </BottomSheet>
            </>
          )}
        </View>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: { width: "100%", flex: 1 },
  icon: { position: "absolute", top: 100, right: 15 },
  categoryTitle: {
    fontWeight: "700",
    marginVertical: 5,
    marginTop: 10,
  },
});

export default CetaceanActivityScreen;
