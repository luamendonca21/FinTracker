import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import MapView from "react-native-maps";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Constants from "expo-constants";

import AppText from "../components/AppText";
import Icon from "../components/Icon";
import MapMarker from "../components/MapMarker";
import Fade from "../assets/animations/Fade";
import BottomSheet from "../components/BottomSheet";
import { ListOptions } from "../components/Lists";
import { ActivityIndicator } from "../components/Loaders";

import eventsApi from "../api/events";
import cetaceansApi from "../api/cetaceans";

import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import useLocation from "../hooks/useLocation";

import defaultStyles from "../config/styles";

const windowHeight = Dimensions.get("window").height;

const MapScreen = ({ navigation, route }) => {
  const cetaceanLocation = route?.params?.cetaceanLocation;
  // -------- STATE MANAGEMENT -------------
  const [isBottomSheetActive, setBottomSheetActive] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ids, setIds] = useState([]);

  const [inputs, setInputs] = useState([]);
  const [filtersActive, setFiltersActive] = useState([]);
  const [cetaceans, setCetaceans] = useState([]);
  const [events, setEvents] = useState([]);
  const filters = [
    { id: 0, title: "Golfinho", category: "Categoria" },
    { id: 1, title: "Baleia", category: "Categoria" },
    { id: 2, title: "Orca", category: "Categoria" },
    { id: 3, title: "Menos de 1 ano", category: "Longevidade" },
    { id: 4, title: "1 - 5 anos", category: "Longevidade" },
    { id: 5, title: "6 - 10 anos", category: "Longevidade" },
    { id: 6, title: "11 - 20 anos", category: "Longevidade" },
    { id: 7, title: "21 - 30 anos", category: "Longevidade" },
    { id: 8, title: "31 - 40 anos", category: "Longevidade" },
    { id: 9, title: "41 - 50 anos", category: "Longevidade" },
    { id: 10, title: "Mais de 50 anos", category: "Longevidade" },
    { id: 11, title: "Preocupação menor", category: "Estado de conservação" },
    { id: 12, title: "Vulnerável", category: "Estado de conservação" },
    { id: 13, title: "Dados insuficientes", category: "Estado de conservação" },
    { id: 14, title: "Menos de 0,1 m", category: "Comprimento máximo" },
    { id: 15, title: "0,1 - 0,3 m", category: "Comprimento máximo" },
    { id: 16, title: "0,31 - 0,50 m", category: "Comprimento máximo" },
    { id: 17, title: "0,51 - 1 m", category: "Comprimento máximo" },
    { id: 18, title: "1,01 - 2 m", category: "Comprimento máximo" },
    { id: 19, title: "2,01 - 5 m", category: "Comprimento máximo" },
    { id: 20, title: "Mais de 5 m", category: "Comprimento máximo" },
    { id: 21, title: "Peixes", category: "Alimentação" },
    { id: 22, title: "Peixes de grande porte", category: "Alimentação" },
    { id: 23, title: "Polvos", category: "Alimentação" },
    { id: 24, title: "Crustáceos", category: "Alimentação" },
    { id: 25, title: "Lulas", category: "Alimentação" },
    { id: 26, title: "Tubarões", category: "Alimentação" },
  ];

  // -------- APIS --------
  const [getAllCetaceansApi, isLoadingCetaceans, errorGetAllCetaceans] = useApi(
    cetaceansApi.getAllCetaceans
  );
  const [getAllEventsApi, isLoadingEvents, errorGetAllEvents] = useApi(
    eventsApi.getAllEvents
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
    setFiltersActive(inputs);
    setIsAnimating(false);
    setTimeout(() => {
      setBottomSheetActive(false);
    }, 460);
  };

  const findCetacean = (individualId) => {
    const item = cetaceans.find(
      (value, index) => value.individualId == individualId
    );
    return item;
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
              /* console.log("DETAIL: ", detail, " true or not: ", value < 0.1); */
              return detail && value < 0.1;
            case "0,1 - 0,3 m":
              /* console.log(
                "DETAIL: ",
                detail,
                " true or not: ",
                value >= 0.1 && value <= 0.3
              ); */
              return detail && value >= 0.1 && value <= 0.3;
            case "0,31 - 0,50 m":
              /* console.log(
                "DETAIL: ",
                detail,
                " true or not: ",
                value >= 0.31 && value <= 0.5
              ); */
              return detail && value >= 0.31 && value <= 0.5;
            case "0,51 - 1 m":
              /* console.log(
                "DETAIL: ",
                detail,
                " true or not: ",
                value >= 0.51 && value <= 1
              ); */
              return detail && value >= 0.51 && value <= 1;
            case "1,01 - 2 m":
              /* console.log(
                "DETAIL: ",
                detail,
                " true or not: ",
                value >= 1.01 && value <= 2
              ); */
              return detail && value >= 1.01 && value <= 2;
            case "2,01 - 5 m":
              /* console.log(
                "DETAIL: ",
                detail,
                " true or not: ",
                value >= 2.01 && value <= 5
              ); */
              return detail && value >= 2.01 && value <= 5;
            case "Mais de 5 m":
              /* console.log("DETAIL: ", detail, " true or not: ", value > 5); */
              return detail && value > 5;
            default:
              return false;
          }
        } else if (filter.category === "Alimentação") {
          const value = detail.value
            .split(", ")
            .map((item) => item.toLowerCase());
          /* console.log(
            "DETAIL: ",
            detail,
            " true or not: ",
            value.includes(filter.title.toLowerCase())
          ); */
          return detail && value.includes(filter.title.toLowerCase());
        } else if (filter.category === "Longevidade") {
          const value = parseInt(
            detail.value.replace(/\s/g, "").replace(/anos/g, "")
          );
          switch (filter.title) {
            case "Menos de 1 ano":
              /* console.log("DETAIL: ", detail, " true or not: ", value < 1); */
              return detail && value < 1;
            case "1 - 5 anos":
              /* console.log(
                "DETAIL: ",
                detail,
                " true or not: ",
                value >= 1 && value <= 5
              ); */
              return detail && value >= 1 && value <= 5;
            case "6 - 10 anos":
              /* console.log(
                "DETAIL: ",
                detail,
                " true or not: ",
                value >= 6 && value <= 10
              ); */
              return detail && value >= 6 && value <= 10;
            case "11 - 20 anos":
              /* console.log(
                "DETAIL: ",
                detail,
                " true or not: ",
                value >= 11 && value <= 20
              ); */
              return detail && value >= 11 && value <= 20;
            case "21 - 30 anos":
              /* console.log(
                "DETAIL: ",
                detail,
                " true or not: ",
                value >= 21 && value <= 30
              ); */
              return detail && value >= 21 && value <= 30;
            case "31 - 40 anos":
              /* console.log(
                "DETAIL: ",
                detail,
                " true or not: ",
                value >= 31 && value <= 40
              ); */
              return detail && value >= 31 && value <= 40;
            case "41 - 50 anos":
              /* console.log(
                "DETAIL: ",
                detail,
                " true or not: ",
                value >= 41 && value <= 51
              ); */
              return detail && value >= 41 && value <= 51;
            case "Mais de 50 anos":
              /* console.log("DETAIL: ", detail, " true or not: ", value > 50); */
              return detail && value > 50;
            default:
              return false;
          }
        } else {
          /* console.log(
            "DETAIL: ",
            detail,
            " true or not: ",
            detail.value === filter.title
          ); */
          return detail && detail.value === filter.title;
        }
      });
    }
    return filteredCetaceans;
  };

  const filterEvents = () => {
    //if user didnt apply any filter there are no filters to apply
    if (filtersActive.length === 0) {
      console.log("AQUI");
      fetchEvents();
      return;
    }

    const filteredCetaceans = filterCetaceans();

    /* console.log(
      "!!!! Cetáceos filtrados:",
      filteredCetaceans.length,
      ": ",
      filteredCetaceans
    ); */
    //correspondend event in events array (with individualIds)
    const filteredCetaceanIds = new Set(
      filteredCetaceans.map((cetacean) => cetacean.individualId)
    );
    const eventsFiltered = events.filter((event) =>
      filteredCetaceanIds.has(event.individualId)
    );
    /* console.log(
      "!!!! Eventos filtrados:",
      eventsFiltered.length,
      ": ",
      eventsFiltered
    ); */
    //set the events to the events state
    setEvents(eventsFiltered);
  };
  const onCalloutPress = (individualId) => {
    const item = findCetacean(individualId);
    navigation.navigate(routes.CETACEAN_PROFILE, { item });
  };

  const fetchIndividuals = async () => {
    try {
      // get cetaceans from backend
      getAllCetaceansApi()
        .then((response) => {
          console.log(response);
          setCetaceans(response.cetaceans);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEvents = async () => {
    // get cetaceans from backend
    getAllEventsApi()
      .then((response) => {
        //console.log("Eventos fetched: ", response);
        setEvents(response.events);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ---------- LIFECYCLE HOOKS ---------
  const { location, errorMsg } = useLocation();

  useEffect(() => {
    fetchIndividuals();
    fetchEvents();
  }, []);

  useEffect(() => {
    // get the cetaceans filtered from backend and setCetaceans to the response array
    console.log("Filtros ativos: ", filtersActive);

    filterEvents();
  }, [filtersActive]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ActivityIndicator
        visible={isLoadingCetaceans || isLoadingEvents || isFiltering}
      />
      <View style={styles.container}>
        <MapView
          mapType="satellite"
          showsUserLocation
          showsCompass={false}
          style={styles.map}
          mapPadding={{
            top: 5 + Constants.statusBarHeight,
            left: 5,
            right: 5,
            bottom: 50,
          }}
          initialRegion={{
            latitude: location
              ? location.coords.latitude
              : cetaceanLocation != null
              ? cetaceanLocation[1]
              : 32.37166518,
            longitude: location
              ? location.coords.longitude
              : cetaceanLocation != null
              ? cetaceanLocation[0]
              : -16.2749989,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}
        >
          {events.map((event, index) => (
            <MapMarker
              key={index}
              onCalloutPress={() => onCalloutPress(event.individualId)}
              coords={{
                long: event.location.coordinates[0],
                lat: event.location.coordinates[1],
              }}
              name={
                cetaceans.length != 0
                  ? findCetacean(event.individualId).details[1].value
                  : ""
              }
              description="Ver perfil"
              img={require("../assets/icon-sbg.png")}
            />
          ))}
        </MapView>
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
          >{`${events.length} resultados`}</AppText>
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
