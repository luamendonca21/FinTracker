import React from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import CarouselItem from "./CarouselItem";

function Carousel({ data }) {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {data.map((item, index) => (
          <CarouselItem
            onPress={() => console.log("Tapped")}
            key={index}
            item={item}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
});

export default Carousel;
