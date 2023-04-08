import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CarouselItem from "./CarouselItem";
import ActivityIndicator from "../../ActivityIndicator";

function Carousel({ data, style }) {
  const navigation = useNavigation();
  return (
    <>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={[styles.container, style]}>
          {data.map((item, index) => (
            <CarouselItem
              onPress={() => navigation.navigate("CetaceansProfile", { item })}
              key={index}
              item={item}
            />
          ))}
        </View>
      </ScrollView>
      {data.length == 0 && (
        <ActivityIndicator style={styles.activityIndicator} visible={true} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  activityIndicator: {
    height: 180,
    width: "100%",
    position: "relative",
  },
});

export default Carousel;
