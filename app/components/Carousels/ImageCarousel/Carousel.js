import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Skeleton } from "../../Loaders";
import CarouselItem from "./CarouselItem";

function Carousel({ data, style }) {
  const navigation = useNavigation();
  return data.length !== 0 ? (
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
  ) : (
    <Skeleton style={styles.skeleton} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  skeleton: {
    height: 180,
    width: "100%",
  },
});

export default Carousel;
