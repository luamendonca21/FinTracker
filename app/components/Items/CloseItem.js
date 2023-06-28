import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppText } from "../Text";

import routes from "../../navigation/routes";
import { getTimeDifference } from "../../utils/utils";

import defaultStyles from "../../config/styles";

const CloseItem = ({ event, name, url }) => {
  // ------ UTILITIES ---------

  const navigation = useNavigation();

  const metersToKilometers = (meter) => meter / 1000;

  const navigateToMap = () => {
    navigation.navigate(routes.MAP, {
      cetaceanLocation: event.location.coordinates,
      delta: 0.04,
    });
  };

  return (
    <TouchableHighlight
      underlayColor={defaultStyles.colors.white}
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
            <AppText style={{ maxWidth: 180 }}>
              {getTimeDifference(event.timestamp)}
            </AppText>
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
    height: 70,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  subTitleContainer: {
    backgroundColor: defaultStyles.colors.thirdlyLight,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
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
