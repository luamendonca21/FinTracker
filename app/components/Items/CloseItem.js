import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppText from "../AppText";

import routes from "../../navigation/routes";

import defaultStyles from "../../config/styles";
import timediff from "timediff";

const CloseItem = ({ event, name, url }) => {
  // ------ UTILITIES ---------

  const navigation = useNavigation();

  const metersToKilometers = (meter) => {
    return meter / 1000;
  };

  const getTimeDifference = (dateTime) => {
    const currentDate = new Date();
    const dateToCompare = new Date(dateTime);
    const result = timediff(currentDate, dateToCompare, "YMWDHmS");
    const timeDirection = Object.values(result).some((value) => value < 0)
      ? "Há "
      : "Daqui a ";

    const formatTimeUnit = (value, unit) => {
      if (value === 1) {
        return `${value} ${unit}, `;
      } else if (value > 1) {
        return `${value} ${unit == "mês" ? "meses" : `${unit}s`}, `;
      }
      return "";
    };

    const years = formatTimeUnit(Math.abs(result.years), "ano");
    const months = formatTimeUnit(Math.abs(result.months), "mês");
    const weeks = formatTimeUnit(Math.abs(result.weeks), "semana");
    const days = formatTimeUnit(Math.abs(result.days), "dia");
    const hours = formatTimeUnit(Math.abs(result.hours), "hora");
    const minutes = formatTimeUnit(Math.abs(result.minutes), "minuto");

    return `${timeDirection}${years}${months}${weeks}${days}${hours}${minutes}`.slice(
      0,
      -2
    );
  };

  const navigateToMap = () => {
    navigation.navigate(routes.MAP, {
      cetaceanLocation: event.location.coordinates,
      delta: 0.01,
    });
  };

  return (
    <TouchableHighlight
      underlayColor={defaultStyles.colors.light}
      onPress={navigateToMap}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: url,
              }}
            />
          </View>
          <View style={styles.details}>
            <View style={styles.subTitleContainer}>
              <AppText style={styles.subTitle}>
                {metersToKilometers(event.dist.calculated).toFixed(2)} km
              </AppText>
            </View>
            <AppText>{getTimeDifference(event.timestamp)}</AppText>
          </View>
        </View>
        <AppText style={styles.title} numberOfLines={1}>
          {name}
        </AppText>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.white,
    elevation: 2,
    flex: 1,
    height: 170,
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 12,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: { elevation: 2, borderRadius: 15 },
  image: {
    width: 90,
    borderRadius: 15,
    height: 120,
  },
  details: {
    marginLeft: 10,
    height: 60,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  subTitleContainer: {
    backgroundColor: defaultStyles.colors.thirdlyLight,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    height: 28,
    borderRadius: 50,
  },
  subTitle: {
    color: defaultStyles.colors.thirdly,
    fontWeight: "bold",
    fontSize: 18,
  },
  title: { fontWeight: "700", width: 200 },
});

export default CloseItem;
