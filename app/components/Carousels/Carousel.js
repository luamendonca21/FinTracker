import React from "react";
import { View, ScrollView, StyleSheet, FlatList } from "react-native";
import CarouselItem from "../Carousels/CarouselItem";
import { useNavigation } from "@react-navigation/native";

function Carousel({ data }) {
  const navigation = useNavigation();
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {data.map((item, index) => (
          <CarouselItem
            onPress={() => navigation.navigate("CetaceansProfile", { item })}
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
