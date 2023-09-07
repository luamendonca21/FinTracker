import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppText } from "../components/Text";
import Icon from "../components/Icon";
import { MapMarker, Map } from "../components/Map";
import Fade from "../assets/animations/Fade";
import BottomSheet from "../components/BottomSheet";
import { ListOptions } from "../components/Lists";
import { ActivityIndicator } from "../components/Loaders";
import { RewardAlert } from "../components/Alerts";

import usersApi from "../api/user";
import eventsApi from "../api/events";
import cetaceansApi from "../api/cetaceans";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";

import { mapScreenFilters as filters } from "../info/data";
import routes from "../navigation/routes";
import { findObjectInArrayById as isFilterActive } from "../utils/utils";
import LocationContext from "../providers/LocationProvider";

import defaultStyles from "../config/styles";

const windowHeight = Dimensions.get("window").height;

const MapScreen = ({ navigation, route }) => {
  const { user } = useAuth();
  const { location } = useContext(LocationContext);
  const cetaceanLocation = route?.params?.cetaceanLocation;
  const delta = route?.params?.delta;

  // -------- STATE MANAGEMENT -------------
  const [isBottomSheetActive, setBottomSheetActive] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(false);

  const [inputs, setInputs] = useState([]);
  const [cetaceans, setCetaceans] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventsFiltered, setEventsFiltered] = useState([]);
  const [filtersActive, setFiltersActive] = useState([]);

  // ---------- APIS -----------
  const [getAllCetaceansApi, isLoadingCetaceans] = useApi(
    cetaceansApi.getAllCetaceans
  );
  const [getEventsNearApi, isLoadingEventsNear] = useApi(eventsApi.getNear);
  const [getAllEventsApi] = useApi(eventsApi.getAllEvents);
  const [updateUserPointsApi, , , points] = useApi(usersApi.updatePoints);

  const [updateUserVisitedApi] = useApi(usersApi.updateVisited);

  // ------- UTILITIES -------

  const handleFilterOptionPress = (id, title, category) => {
    let newfilter = { id: id, title: title, category: category };
    if (!isFilterActive(inputs, id)) {
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
    setTimeout(() => setBottomSheetActive(false), 200);
  };

  const handleApplyChanges = () => {
    if (inputs.length === 0) {
      fetchEvents();
    }
    setFiltersActive(inputs);
    setIsAnimating(false);
    setTimeout(() => setBottomSheetActive(false), 460);
  };

  const findCetacean = (individualId) => {
    const item = cetaceans.find(
      (value, index) => value.individualId == individualId
    );
    return item;
  };

  const checkVisitedCetaceans = () => {
    const eventsWithin2km = events.filter(
      (event) => event.dist.calculated / 1000 < 4000
    );

    if (eventsWithin2km.length === 0) {
      return;
    }
    const uniqueIndividualIds = [];

    eventsWithin2km.forEach((event) => {
      if (!uniqueIndividualIds.includes(event.individualId)) {
        uniqueIndividualIds.push(event.individualId);
      }
    });

    visitCetacean(uniqueIndividualIds);
  };

  const visitCetacean = (cetaceansIds) => {
    updateUserVisitedApi(user.id, { cetaceansIds })
      .then((response) => {
        updateUserPointsApi(user.id, { points: response.pointsReceived })
          .then((response) => setEarnedPoints(true))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const filterCetaceans = () => {
    let filteredCetaceans = [...cetaceans];

    // iterate the filters array to perform an action for each filter
    for (const filter of filtersActive) {
      filteredCetaceans = filteredCetaceans.filter((cetacean) => {
        let detail = cetacean.details.find(
          (detail) => detail.title === filter.category
        );

        if (filter.category === "Comprimento máximo") {
          const value = parseFloat(
            detail.value
              .replace(/\s/g, "")
              .replace(/metros/g, "")
              .replace(",", ".")
          );
          switch (filter.title) {
            case "Menos de 0,1 m":
              return detail && value < 0.1;
            case "0,1 - 0,3 m":
              return detail && value >= 0.1 && value <= 0.3;
            case "0,31 - 0,50 m":
              return detail && value >= 0.31 && value <= 0.5;
            case "0,51 - 1 m":
              return detail && value >= 0.51 && value <= 1;
            case "1,01 - 2 m":
              return detail && value >= 1.01 && value <= 2;
            case "2,01 - 5 m":
              return detail && value >= 2.01 && value <= 5;
            case "Mais de 5 m":
              return detail && value > 5;
            default:
              return false;
          }
        } else if (filter.category === "Alimentação") {
          const value = detail.value
            .split(", ")
            .map((item) => item.toLowerCase());
          return detail && value.includes(filter.title.toLowerCase());
        } else if (filter.category === "Longevidade") {
          const value = parseInt(
            detail.value.replace(/\s/g, "").replace(/anos/g, "")
          );
          switch (filter.title) {
            case "Menos de 1 ano":
              return detail && value < 1;
            case "1 - 5 anos":
              return detail && value >= 1 && value <= 5;
            case "6 - 10 anos":
              return detail && value >= 6 && value <= 10;
            case "11 - 20 anos":
              return detail && value >= 11 && value <= 20;
            case "21 - 30 anos":
              return detail && value >= 21 && value <= 30;
            case "31 - 40 anos":
              return detail && value >= 31 && value <= 40;
            case "41 - 50 anos":
              return detail && value >= 41 && value <= 51;
            case "Mais de 50 anos":
              return detail && value > 50;
            default:
              return false;
          }
        } else {
          return detail && detail.value === filter.title;
        }
      });
    }
    return filteredCetaceans;
  };

  const filterEvents = () => {
    const filteredCetaceans = filterCetaceans();

    const filteredCetaceanIds = new Set(
      filteredCetaceans.map((cetacean) => cetacean.individualId)
    );
    const eventsFiltered = events.filter((event) =>
      filteredCetaceanIds.has(event.individualId)
    );
    setEventsFiltered(eventsFiltered);
  };
  const onCalloutPress = (individualId) => {
    const item = findCetacean(individualId);
    navigation.navigate(routes.CETACEAN_PROFILE, { item });
  };

  const fetchIndividuals = async () => {
    try {
      getAllCetaceansApi()
        .then((response) => {
          setCetaceans(response.cetaceans);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEvents = () => {
    location != null
      ? getEventsNearApi({
          long: location.coords.longitude,
          lat: location.coords.latitude,
        })
          .then((response) => {
            setEvents(response.events);
            setEventsFiltered(response.events);
          })
          .catch((error) => console.log(error))
      : getAllEventsApi()
          .then((response) => {
            setEvents(response.events);
            setEventsFiltered(response.events);
          })
          .catch((error) => {
            console.log(error);
          });
  };

  // ---------- LIFECYCLE HOOKS ---------------

  useEffect(() => {
    fetchIndividuals();
  }, []);

  useEffect(() => {
    console.log("Map, User Location: ", location);
    fetchEvents();
  }, [location]);

  useEffect(() => {
    location !== null && events.length !== 0 && checkVisitedCetaceans();
  }, [events, eventsFiltered]);

  useEffect(() => {
    console.log("Filtros ativos: ", filtersActive);

    filtersActive.length !== 0 && filterEvents();
  }, [filtersActive]);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ActivityIndicator
          visible={isLoadingCetaceans || isLoadingEventsNear || isFiltering}
        />
        {earnedPoints && (
          <RewardAlert
            isVisible={earnedPoints}
            points={points}
            onPress={() => {
              setEarnedPoints(false);
              navigation.navigate("Profile");
            }}
            onContinue={() => setEarnedPoints(false)}
          />
        )}
        <View style={styles.container}>
          <Map
            style={styles.map}
            initialRegion={{
              latitude:
                cetaceanLocation != null
                  ? cetaceanLocation[1]
                  : location
                  ? location.coords.latitude
                  : -13.687117,
              longitude:
                cetaceanLocation != null
                  ? cetaceanLocation[0]
                  : location
                  ? location.coords.longitude
                  : -15.590558,
              latitudeDelta: delta ? delta : 1,
              longitudeDelta: delta ? delta : 1,
            }}
          >
            {eventsFiltered.map((event, index) => (
              <MapMarker
                key={index}
                onCalloutPress={() => onCalloutPress(event.individualId)}
                coords={{
                  long: event.location.coordinates[0],
                  lat: event.location.coordinates[1],
                }}
                timestamp={event.timestamp}
                name={
                  cetaceans.length != 0
                    ? findCetacean(event.individualId).name
                    : ""
                }
                description={`Ver perfil`}
                img={require("../assets/mapMarker.png")}
              />
            ))}
          </Map>
          <Icon
            onPress={handleFilterPress}
            style={styles.icon}
            icon="filter"
            size={22}
            iconColor={defaultStyles.colors.black}
            backgroundColor={defaultStyles.colors.white}
          />
          <View style={styles.resultsContainer}>
            <AppText
              style={styles.resultsText}
            >{`${eventsFiltered.length} resultados`}</AppText>
          </View>
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
  resultsContainer: {
    position: "absolute",
    backgroundColor: defaultStyles.colors.white,
    top: 50,
    justifyContent: "center",
    alignItems: "center",
    left: 15,
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 20,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MapScreen;
