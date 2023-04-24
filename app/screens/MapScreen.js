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
import movebankApi from "../api/movebankApi";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import useLocation from "../hooks/useLocation";

import defaultStyles from "../config/styles";

const windowHeight = Dimensions.get("window").height;

const MapScreen = ({ navigation }) => {
  // -------- APIS --------
  const [storeEventApi, errorStoreEvent] = useApi(eventsApi.storeEvent);
  const [deleteAllEventsApi, errorDeleteAllEvents] = useApi(
    eventsApi.deleteAllEvents
  );
  const [getAllEventsApi, errorGetAllEvents] = useApi(eventsApi.getAllEvents);

  // -------- STATE MANAGEMENT -------------
  const [isBottomSheetActive, setBottomSheetActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [ids, setIds] = useState([]);

  const [inputs, setInputs] = useState([]);
  const [filtersActive, setFiltersActive] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const [events, setEvents] = useState([]);
  const filters = [
    { id: 0, title: "Golfinhos", category: "Categoria" },
    { id: 1, title: "Baleias", category: "Categoria" },
    { id: 2, title: "Juvenil", category: "Fase da vida" },
    { id: 3, title: "Adulta", category: "Fase da vida" },
    { id: 4, title: " Idosa", category: "Fase da vida" },
    { id: 5, title: " Orcas", category: "Categoria" },
  ];
  const [markers, setMarkers] = useState([
    {
      lat: 0.0000128000001,
      long: 0.0000128000001,
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
      lat: 30.2095737,
      long: 61.3191795,
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
    console.log("AQUII", events.length);
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

  const fetchEvents = async () => {
    setIsFetching(true);

    // delete from backend
    await deleteAllEventsApi()
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    // get the cetaceans from movebank
    const events = await movebankApi.getIndividualEvents(886013997);
    console.log(JSON.stringify(events, null, "\t"));

    await Promise.all(
      events
        .filter((event) => {
          const currentYear = new Date().getFullYear(); // Get current year

          const eventYear = parseInt(event.timestamp.substring(0, 4)); // Get event year as integer
          return (
            event.individual_id !== "" &&
            (eventYear === currentYear ||
              eventYear === currentYear - 1 ||
              eventYear === currentYear + 1) // Check for current year or last year
          );
        })
        .map(async (value, index) => {
          const event = {
            ...value,
          };
          await storeEventApi(event)
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
        })
    );

    // get cetaceans from backend
    getAllEventsApi()
      .then((response) => {
        console.log(response);
        setEvents(response.events);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsFetching(false));
  };

  // ---------- LIFECYCLE HOOKS ---------
  const { location, errorMsg } = useLocation();

  useEffect(() => {
    // get animals events
    fetchEvents();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ActivityIndicator visible={isFetching} />
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
              /* onCalloutPress={() =>
                navigation.navigate(routes.CETACEAN_PROFILE, { item })
              } */
              coords={{
                long: event.location.coordinates[0],
                lat: event.location.coordinates[1],
              }}
              //name={item.name}
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
