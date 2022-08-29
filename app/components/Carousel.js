import React from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import CarouselItem from "./CarouselItem";

function Carousel({ data }) {
  return (
    <View style={styles.sliderContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {data.map((item, index) => (
            <CarouselItem
              onPress={() => console.log("Tapped")}
              key={index}
              title={item.details.scientificName}
              imageUrl={item.imageUrl}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    height: 350,
    width: "100%",
  },
  container: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});

export default Carousel;
