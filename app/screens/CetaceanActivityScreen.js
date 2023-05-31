import React, { useEffect, useContext, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { Map } from "../components/Map";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import AppText from "../components/AppText";
import Icon from "../components/Icon";
import Fade from "../assets/animations/Fade";
import BottomSheet from "../components/BottomSheet";
import { ListOptions } from "../components/Lists";
import { ActivityIndicator } from "../components/Loaders";

import LocationContext from "../providers/LocationProvider";

import { activityFilters as filters } from "../info/mapFilters";
import defaultStyles from "../config/styles";

const windowHeight = Dimensions.get("window").height;

const CetaceanActivityScreen = ({ navigation, route }) => {
  const { location } = useContext(LocationContext);

  // -------- STATE MANAGEMENT -------------
  const [isBottomSheetActive, setBottomSheetActive] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);

  const [inputs, setInputs] = useState([]);
  const [filtersActive, setFiltersActive] = useState([]);

  // ---------- APIS -----------

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
    /* if (inputs.length === 0) {
      fetchEvents();
    } */
    setFiltersActive(inputs);
    setIsAnimating(false);
    setTimeout(() => {
      setBottomSheetActive(false);
    }, 460);
  };

  useEffect(() => {
    console.log(filtersActive);
  }, [filtersActive]);
  // ---------- LIFECYCLE HOOKS ---------------

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ActivityIndicator visible={false} />
        <View style={styles.container}>
          <Map
            style={styles.map}
            initialRegion={{
              latitude: location ? location.coords.latitude : 25.2646,
              longitude: location ? location.coords.longitude : 55.3077,
              latitudeDelta: 1,
              longitudeDelta: 1,
            }}
          ></Map>
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
