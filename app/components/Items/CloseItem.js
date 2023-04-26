import React from "react";
import { View, StyleSheet, Image } from "react-native";

import AppText from "../AppText";

import defaultStyles from "../../config/styles";

const CloseItem = ({ event, name, url }) => {
  // ------ UTILITIES ---------

  const metersToKilometers = (meter) => {
    return meter / 1000;
  };

  const getTimeDifference = (dateTime) => {
    const currentDate = new Date();
    const dateToCompare = new Date(dateTime);
    const isFuture = dateToCompare.getTime() > currentDate.getTime();

    const diff = isFuture
      ? dateToCompare.getTime() - currentDate.getTime()
      : currentDate.getTime() - dateToCompare.getTime();
    const diffInMinutes = Math.floor(diff / (1000 * 60));
    const diffInHours = Math.floor(diff / (1000 * 60 * 60));
    const diffInDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffInWeeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));

    const timeDirection = isFuture ? "Daqui a" : "Há";

    if (diffInWeeks > 0) {
      if (diffInWeeks === 1) {
        return `${timeDirection} 1 semana`;
      } else {
        return `${timeDirection} ${diffInWeeks} semanas`;
      }
    } else if (diffInDays > 0) {
      if (diffInDays === 1) {
        return `${timeDirection} 1 dia`;
      } else {
        const remainingHours = diffInHours % 24;
        if (remainingHours === 0) {
          return `${timeDirection} ${diffInDays} dias`;
        } else {
          const remainingMinutes = diffInMinutes % 60;
          if (remainingMinutes === 0) {
            return `${timeDirection} ${diffInDays} dias e ${remainingHours} horas`;
          } else {
            return `${timeDirection} ${diffInDays} dias, ${remainingHours} horas e ${remainingMinutes} minutos`;
          }
        }
      }
    } else if (diffInHours > 0) {
      if (diffInHours === 1) {
        return `${timeDirection} 1 hora`;
      } else {
        const remainingMinutes = diffInMinutes % 60;
        if (remainingMinutes === 0) {
          return `${timeDirection} ${diffInHours} horas`;
        } else {
          return `${timeDirection} ${diffInHours} horas e ${remainingMinutes} minutos`;
        }
      }
    } else {
      return `${timeDirection} alguns minutos`;
    }
  };

  return (
    <View style={styles.container}>
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
    </View>
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
  title: { fontWeight: "700" },
});

export default CloseItem;
