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

const MapScreen = ({ navigation }) => {
  // -------- STATE MANAGEMENT -------------
  const [isBottomSheetActive, setBottomSheetActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ids, setIds] = useState([]);

  const [inputs, setInputs] = useState([]);
  const [filtersActive, setFiltersActive] = useState([]);
  const [cetaceans, setCetaceans] = useState([]);
  const [events, setEvents] = useState([]);
  const filters = [
    { id: 0, title: "Golfinhos", category: "Categoria" },
    { id: 1, title: "Baleias", category: "Categoria" },
    { id: 2, title: "Orcas", category: "Categoria" },
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
    { id: 17, title: "0,51 - 2 m", category: "Comprimento máximo" },
    { id: 18, title: "1,01 - 2 m", category: "Comprimento máximo" },
    { id: 19, title: "Mais de 2 m", category: "Comprimento máximo" },
    { id: 20, title: "Peixes", category: "Alimentação" },
    { id: 21, title: "Peixes de grande porte", category: "Alimentação" },
    { id: 22, title: "Polvos", category: "Alimentação" },
    { id: 23, title: "Crustáceos", category: "Alimentação" },
    { id: 24, title: "Lulas", category: "Alimentação" },
    { id: 25, title: "Tubarões", category: "Alimentação" },
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
        console.log(response);
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
    console.log(filtersActive);
  }, [filtersActive]);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ActivityIndicator visible={isLoadingCetaceans || isLoadingEvents} />
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
            latitude: location ? location.coords.latitude : 32.37166518,
            longitude: location ? location.coords.longitude : -16.2749989,
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
});

export default MapScreen;
