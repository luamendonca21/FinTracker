import React from "react";
import { View, StyleSheet } from "react-native";
import Detail from "../Detail";

const ListDetails = ({ details }) => {
  return (
    <View style={styles.detailsContainer}>
      {Object.keys(details).map((item, index) => (
        <Detail key={index} title={item} subTitle={details[item]} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flexDirection: "row",
    width: "100%",
    height: 80,
    padding: 1,
  },
});

export default ListDetails;
