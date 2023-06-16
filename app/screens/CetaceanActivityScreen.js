import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Polyline } from "react-native-maps";
import timediff from "timediff";

import { AppText } from "../components/Text";
import Icon from "../components/Icon";
import Fade from "../assets/animations/Fade";
import BottomSheet from "../components/BottomSheet";
import { ListOptions } from "../components/Lists";
import { ActivityIndicator } from "../components/Loaders";
import { Map, MapMarker } from "../components/Map";

import useApi from "../hooks/useApi";
import eventsApi from "../api/events";
import { activityFilters as filters } from "../info/mapFilters";

import defaultStyles from "../config/styles";

const windowHeight = Dimensions.get("window").height;

const CetaceanActivityScreen = ({ navigation, route }) => {
  const { individualId } = route.params;

  // -------- STATE MANAGEMENT -------------
  const [isBottomSheetActive, setBottomSheetActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [inputs, setInputs] = useState([]);
  const [filtersActive, setFiltersActive] = useState([]);
  const [events, setEvents] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  // ---------- APIS -----------
  const [getEventsById, isLoadingEventsById, errorGetEventsById] = useApi(
    eventsApi.getEventsById
  );
  // ------- UTILITIES -------

  const isFilterActive = (id) => {
    return inputs.find((item) => item.id === id);
  };
  const handleFilterOptionPress = (id, title, category) => {
    if (isFilterActive(id)) {
      setInputs([]);
    } else {
      const newFilter = { id, title, category };
      setInputs([newFilter]);
    }
    // Substitui a opção anterior pelo novo filtro selecionado
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

  const filterEvents = () => {
    const currentDate = new Date();
    console.log("HOJE É DIA -----> ", currentDate);
    let filteredEvents = [...events];
    const activeFilter = filtersActive[0];

    switch (activeFilter.title) {
      case "Últimos 7 dias":
        const oneWeekAgo = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - 7
        );
        console.log("1 SEMANA ATRAS ----> ", oneWeekAgo);

        filteredEvents = filteredEvents.filter((event) => {
          const diff = timediff(event.timestamp, oneWeekAgo);
          return (
            diff.months == 0 &&
            diff.years == 0 &&
            (diff.weeks == -1 || diff.weeks == 0)
          );
        });
        break;

      case "Últimas 4 semanas":
        const oneMonthAgo = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate()
        );
        console.log("1 MÊS ATRAS ----> ", oneMonthAgo);

        filteredEvents = filteredEvents.filter((event) => {
          const diff = timediff(event.timestamp, oneMonthAgo);
          return (diff.months == -1 || diff.months == 0) && diff.years == 0;
        });
        break;
      case "Últimos 12 meses":
        const oneYearAgo = new Date(
          currentDate.getFullYear() - 1,
          currentDate.getMonth(),
          currentDate.getDate()
        );
        console.log("1 ANO ATRAS ----> ", oneYearAgo);
        filteredEvents = filteredEvents.filter((event) => {
          const diff = timediff(new Date(event.timestamp), oneYearAgo);
          return diff.years == -1 || diff.years == 0;
        });
        break;

      case "Últimas 24 horas":
        const twentyFourHoursAgo = new Date(
          currentDate.getTime() - 24 * 60 * 60 * 1000
        );
        console.log("24 HORAS ATRAS ----> ", twentyFourHoursAgo);

        filteredEvents = filteredEvents.filter((event) => {
          const diff = timediff(event.timestamp, twentyFourHoursAgo);
          return (
            (diff.days == -1 || diff.days == 0) &&
            diff.weeks == 0 &&
            diff.months == 0 &&
            diff.years == 0
          );
        });
        break;

      default:
        break;
    }
    setEvents(filteredEvents);
  };
  const extractCoordinates = () => {
    const orderedEvents = events.sort((a, b) => a.timestamp - b.timestamp);

    const extractedCoordinates = orderedEvents.map((event) => ({
      latitude: event.location.coordinates[1],
      longitude: event.location.coordinates[0],
      latitudeDelta: 180,
      longitudeDelta: 180,
    }));
    setCoordinates(extractedCoordinates);
  };

  // ---------- LIFECYCLE HOOKS ---------------

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    extractCoordinates();
  }, [events]);

  useEffect(() => {
    filtersActive.length != 0 && filterEvents();
  }, [filtersActive]);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ActivityIndicator visible={isLoadingEventsById} />
        <View style={styles.container}>
          <Map
            style={styles.map}
            initialRegion={{
              latitude: -13.687117,
              longitude: -15.590558,
              latitudeDelta: 180,
              longitudeDelta: 180,
            }}
          >
            {coordinates.length > 0 && (
              <Polyline
                coordinates={coordinates}
                strokeColor={defaultStyles.colors.thirdly}
                strokeWidth={4}
                lineDashPattern={[10, 20]}
              />
            )}
            {coordinates.length > 0 && (
              <MapMarker
                name="Ponto inicial"
                img={require("../assets/mapMarker.png")}
                coords={{
                  lat: coordinates[0].latitude,
                  long: coordinates[0].longitude,
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
