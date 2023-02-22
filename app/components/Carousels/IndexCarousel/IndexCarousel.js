import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";

import Index from "./Index";

import defaultStyles from "../../../config/styles";

const windowWidth = Dimensions.get("window").width;

const IndexCarousel = ({
  children,
  color = defaultStyles.colors.primary,
  ...otherProps
}) => {
  const [itemActive, setItemActive] = useState(0);

  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != itemActive) {
        setItemActive(slide);
      }
    }
  };
  return (
    <View style={[styles.items, { backgroundColor: color }]}>
      <View style={styles.itemsContainer}>
        <ScrollView
          style={styles.itemsContainer}
          onScroll={({ nativeEvent }) => onchange(nativeEvent)}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
      <View style={styles.index}>
        <Index {...otherProps} indexSelected={itemActive} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  items: {
    backgroundColor: defaultStyles.colors.primary,
    width: windowWidth * 0.92,
    alignSelf: "center",
    alignItems: "center",
    height: 215,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 5,
  },
  itemsContainer: {
    width: "100%",
    height: "85%",
  },
});

export default IndexCarousel;
